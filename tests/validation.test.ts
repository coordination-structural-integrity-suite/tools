/**
 * Validation boundary tests.
 *
 * Both servers validate every tool argument with Zod. What these tests pin is
 * how a failure is reported: as a tool result the caller can read and correct,
 * not as a JSON-RPC protocol error carrying a raw issue array. A model that
 * receives a transport failure abandons the call; one that receives
 * `isError: true` with a named argument can retry.
 */

import { describe, it, expect } from 'vitest'
import { withServer, type ToolCallResult } from './helpers/mcp-client.js'

const CSIS = 'csis-server.mjs'
const FRAME_LANGUAGE = 'frame-language-server.mjs'

function expectReadableToolError(res: ToolCallResult, mustMention: string): void {
  expect(res.rpcError, 'a bad argument must not surface as a protocol error').toBeNull()
  expect(res.isError, 'a bad argument must set isError').toBe(true)
  expect(res.text).toContain('Invalid arguments')
  expect(res.text).toContain(mustMention)
  expect(res.text).toContain('call the tool again')
}

describe('CSIS argument validation', () => {
  it('accepts a valid call', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('list_standards', { family: 'all' })
      expect(res.isError).toBe(false)
      expect(res.rpcError).toBeNull()
      expect((res.json as { total: number }).total).toBe(10)
    })
  })

  it('rejects an invalid enum by naming the argument', async () => {
    await withServer(CSIS, async (client) => {
      expectReadableToolError(
        await client.callTool('list_standards', { family: 'banana' }),
        'family',
      )
    })
  })

  it('rejects an out-of-range number by naming the bound', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('lookup_corollary', { number: 99 })
      expectReadableToolError(res, 'number')
      expect(res.text).toMatch(/less than or equal to/)
    })
  })

  it('rejects a missing required argument', async () => {
    await withServer(CSIS, async (client) => {
      expectReadableToolError(await client.callTool('lookup_corollary', {}), 'number')
    })
  })

  it('reports an unknown tool as a tool error rather than a protocol error', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('no_such_tool', {})
      expect(res.rpcError).toBeNull()
      expect(res.isError).toBe(true)
      expect(res.text).toContain('no_such_tool')
    })
  })
})

describe('Frame Language argument validation', () => {
  it('accepts a valid call', async () => {
    await withServer(FRAME_LANGUAGE, async (client) => {
      const res = await client.callTool('check_watchlist', { term: 'governance' })
      expect(res.isError).toBe(false)
      expect(res.rpcError).toBeNull()
    })
  })

  it('rejects a missing required argument', async () => {
    await withServer(FRAME_LANGUAGE, async (client) => {
      expectReadableToolError(await client.callTool('check_watchlist', {}), 'term')
    })
  })

  it('rejects a wrong argument type by naming the expected type', async () => {
    await withServer(FRAME_LANGUAGE, async (client) => {
      const res = await client.callTool('audit_text', { text: 123 })
      expectReadableToolError(res, 'text')
      expect(res.text).toMatch(/Expected string/)
    })
  })
})

describe('every tool rejects empty arguments without crashing the server', () => {
  for (const entry of [CSIS, FRAME_LANGUAGE]) {
    it(`${entry} stays responsive after a bad call on every tool`, async () => {
      await withServer(entry, async (client) => {
        const tools = await client.listTools()
        for (const tool of tools) {
          const res = await client.callTool(tool.name, {})
          // Either it legitimately takes no arguments, or it reports a tool
          // error. Neither may be a protocol failure, and neither may hang.
          expect(res.rpcError, `${tool.name} surfaced a protocol error`).toBeNull()
        }
        // The server is still alive and answering after every tool was abused.
        const stillWorks = await client.listTools()
        expect(stillWorks.length).toBe(tools.length)
      })
    })
  }
})
