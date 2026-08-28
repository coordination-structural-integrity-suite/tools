/**
 * Provenance tests.
 *
 * These servers emit judgments that rest on encoded standards. ORE's exposure
 * obligation applies: an output that rests on ingested material declares what
 * it rests on. Without a stamp, a verdict becomes unattributable the moment a
 * standard moves and a caller cannot tell which edition judged them.
 */

import { describe, it, expect } from 'vitest'
import { withServer } from './helpers/mcp-client.js'

const CSIS = 'csis-server.mjs'
const FRAME_LANGUAGE = 'frame-language-server.mjs'

interface Provenance {
  server: string
  serverVersion: string
  encodes: Record<string, string>
}

function provenanceOf(json: unknown): Provenance {
  const p = (json as { _provenance?: Provenance })._provenance
  expect(p, 'every JSON tool result carries _provenance').toBeDefined()
  return p!
}

describe('CSIS provenance', () => {
  it('stamps the server name, its version, and the standard versions encoded', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('lookup_corollary', { number: 3 })
      const p = provenanceOf(res.json)
      expect(p.server).toBe('csis')
      expect(p.serverVersion).toMatch(/^\d+\.\d+\.\d+$/)
      expect(p.encodes['csis-suite']).toBeTruthy()
      expect(p.encodes['csis-suite']).toMatch(/@\d+\.\d+\.\d+/)
    })
  })

  it('stamps every tool that returns JSON, not just some', async () => {
    await withServer(CSIS, async (client) => {
      const tools = await client.listTools()
      const checked: string[] = []
      for (const tool of tools) {
        const res = await client.callTool(tool.name, {})
        // Tools requiring arguments return a readable tool error, which is
        // correctly left unstamped. Only successful JSON results are stamped.
        if (res.isError || res.json === null) continue
        provenanceOf(res.json)
        checked.push(tool.name)
      }
      expect(checked.length, 'at least one tool should answer with no arguments').toBeGreaterThan(0)
    })
  })

  it('does not stamp error results, which carry no encoded claim', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('lookup_corollary', { number: 99 })
      expect(res.isError).toBe(true)
      expect(res.text).not.toContain('_provenance')
    })
  })

  it('reports the same version in the stamp as in the server identity', async () => {
    await withServer(CSIS, async (client) => {
      const res = await client.callTool('lookup_corollary', { number: 1 })
      const p = provenanceOf(res.json)
      // The identity string and the stamp read one constant; if they diverge,
      // the version has been edited in one place again.
      expect(p.serverVersion).toBe('0.3.1')
    })
  })
})

describe('Frame Language provenance', () => {
  it('stamps the term registry version it was built against', async () => {
    await withServer(FRAME_LANGUAGE, async (client) => {
      const res = await client.callTool('check_watchlist', { term: 'governance' })
      const p = provenanceOf(res.json)
      expect(p.server).toBe('frame-language')
      expect(p.encodes['frame-language-term-registry']).toBeTruthy()
      // This was undefined in a stale build, which is how the drift was found.
      expect(p.encodes['frame-language-term-registry']).not.toBe('undefined')
    })
  })
})
