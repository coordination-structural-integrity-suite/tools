#!/usr/bin/env node
/**
 * @proof-of-coord/frame-language - HTTP transport entry point
 *
 * Stateless Streamable HTTP MCP server. Each request gets a fresh
 * server+transport pair. No session state is maintained.
 *
 * Deploy to Railway, Render, or any Node.js host. Set PORT env var if needed.
 */

import { createServer as createHttpServer } from 'node:http'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { createMcpServer, SERVER_NAME, SERVER_VERSION } from './create-server.js'

const PORT = Number(process.env['PORT'] ?? 3000)

// Loopback MCP handshake against our own /mcp endpoint: initialize, then a
// separate tools/list. This exercises the real public contract, transport
// configuration included, so the health check verifies the server can actually
// answer MCP rather than merely that the process is up.
type RpcResponse = { error?: { message?: string }; result?: { tools?: unknown[] } }

async function mcpProbe(body: unknown): Promise<RpcResponse> {
  const res = await fetch(`http://127.0.0.1:${PORT}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5000),
  })
  const text = (await res.text()).trim()
  if (text.startsWith('{')) return JSON.parse(text) as RpcResponse
  for (const line of text.split('\n')) {
    const m = line.match(/^data:\s*(\{.*\})\s*$/)
    if (m && m[1]) return JSON.parse(m[1]) as RpcResponse
  }
  throw new Error(`no JSON-RPC message (HTTP ${res.status})`)
}

async function mcpSelfCheck(): Promise<number> {
  const init = await mcpProbe({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'healthcheck', version: '0' } } })
  if (init.error) throw new Error(`initialize: ${init.error.message}`)
  const list = await mcpProbe({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} })
  if (list.error) throw new Error(`tools/list: ${list.error.message}`)
  const n = list.result?.tools?.length ?? 0
  if (n === 0) throw new Error('tools/list returned no tools')
  return n
}

const httpServer = createHttpServer(async (req, res) => {
  // Deep health check: verify the real /mcp contract via loopback so a broken
  // transport (not merely a live process) fails the check. Railway's
  // healthcheckPath points here, so a build that cannot answer the MCP
  // handshake fails its deploy and never replaces a working one.
  if (req.url === '/health' || req.url === '/') {
    try {
      const tools = await mcpSelfCheck()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok', server: SERVER_NAME, version: SERVER_VERSION, tools }))
    } catch (err) {
      console.error(`[health] MCP self-check failed: ${(err as Error).message}`)
      res.writeHead(503, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'unhealthy', server: SERVER_NAME, error: (err as Error).message }))
    }
    return
  }

  // MCP endpoint
  if (req.url === '/mcp') {
    if (req.method === 'GET') {
      res.writeHead(405, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Use POST for Streamable HTTP or see /health' }))
      return
    }

    if (req.method === 'POST') {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const body = Buffer.concat(chunks).toString('utf8')

      let parsedBody: unknown
      try {
        parsedBody = JSON.parse(body)
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
        return
      }

      try {
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => crypto.randomUUID(), // TEMP: deliberately broken to test the healthcheck gate
        })
        const server = createMcpServer()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await server.connect(transport as any)
        await transport.handleRequest(req, res, parsedBody)
      } catch (err) {
        console.error(`[mcp] request failed: ${(err as Error).stack ?? (err as Error).message}`)
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32603, message: 'Internal server error' } }))
        }
      }
      return
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found. MCP endpoint is POST /mcp' }))
})

httpServer.listen(PORT, () => {
  console.error(`${SERVER_NAME} MCP server v${SERVER_VERSION} listening on port ${PORT}`)
  console.error(`MCP endpoint: http://localhost:${PORT}/mcp`)
})
