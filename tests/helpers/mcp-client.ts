/**
 * Minimal MCP stdio client for tests.
 *
 * Speaks JSON-RPC over a spawned process so tests exercise the servers the way
 * a real client does, rather than importing handlers directly. This is what
 * catches failures that only appear at module load or transport time.
 */

import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'

export interface ToolCallResult {
  isError: boolean
  text: string
  json: unknown
  rpcError: { code: number; message: string } | null
}

export class McpTestClient {
  private proc: ChildProcessWithoutNullStreams
  private buffer = ''
  private pending = new Map<number, (msg: any) => void>()
  private nextId = 1
  public stderr = ''

  constructor(entry: string, cwd?: string) {
    this.proc = spawn('node', [entry], {
      stdio: ['pipe', 'pipe', 'pipe'],
      ...(cwd ? { cwd } : {}),
    })
    this.proc.stdout.on('data', (d) => this.onData(String(d)))
    this.proc.stderr.on('data', (d) => {
      this.stderr += String(d)
    })
  }

  private onData(chunk: string): void {
    this.buffer += chunk
    let i: number
    while ((i = this.buffer.indexOf('\n')) >= 0) {
      const line = this.buffer.slice(0, i).trim()
      this.buffer = this.buffer.slice(i + 1)
      if (!line) continue
      try {
        const msg = JSON.parse(line)
        if (msg.id != null && this.pending.has(msg.id)) {
          this.pending.get(msg.id)!(msg)
          this.pending.delete(msg.id)
        }
      } catch {
        // Non-JSON output on stdout would itself be a defect, but the
        // transport tests assert on behaviour rather than on this line.
      }
    }
  }

  private send(method: string, params: unknown, timeoutMs = 10_000): Promise<any> {
    const id = this.nextId++
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`timeout waiting for ${method}`)),
        timeoutMs,
      )
      this.pending.set(id, (msg) => {
        clearTimeout(timer)
        resolve(msg)
      })
      this.proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n')
    })
  }

  async initialize(): Promise<{ name: string; version: string }> {
    const res = await this.send('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'vitest', version: '1.0.0' },
    })
    this.proc.stdin.write(
      JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n',
    )
    return res.result.serverInfo
  }

  async listTools(): Promise<Array<{ name: string; description?: string; outputSchema?: unknown }>> {
    const res = await this.send('tools/list', {})
    return res.result.tools
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<ToolCallResult> {
    const res = await this.send('tools/call', { name, arguments: args })
    if (res.error) {
      return { isError: true, text: '', json: null, rpcError: res.error }
    }
    const text: string = res.result?.content?.[0]?.text ?? ''
    let json: unknown = null
    try {
      json = JSON.parse(text)
    } catch {
      json = null
    }
    return { isError: res.result?.isError === true, text, json, rpcError: null }
  }

  /**
   * The unwrapped tool result, for assertions about fields the convenience
   * wrapper flattens away, such as structuredContent.
   */
  async callToolRaw(
    name: string,
    args: Record<string, unknown>,
  ): Promise<{
    content: Array<{ type: string; text: string }>
    structuredContent?: unknown
    isError?: boolean
  }> {
    const res = await this.send('tools/call', { name, arguments: args })
    if (res.error) {
      throw new Error(`protocol error calling ${name}: ${res.error.message}`)
    }
    return res.result
  }

  close(): void {
    this.proc.kill()
  }
}

/** Start a server, run a body against it, and always clean up. */
export async function withServer<T>(
  entry: string,
  body: (client: McpTestClient) => Promise<T>,
): Promise<T> {
  const client = new McpTestClient(entry)
  try {
    await client.initialize()
    return await body(client)
  } finally {
    client.close()
  }
}
