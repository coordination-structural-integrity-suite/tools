/**
 * Output contract tests.
 *
 * A declared outputSchema is a promise to the caller. These tests check that
 * the promise is kept: every tool that declares a schema returns the keys it
 * declared, and returns them as structuredContent as well as text, so a client
 * that validates has something to validate against.
 *
 * The schemas were derived by calling the tools rather than by reading the
 * handlers. These tests are what stop that derivation going stale.
 */

import { describe, it, expect } from 'vitest'
import { withServer, type McpTestClient } from './helpers/mcp-client.js'

const CSIS = 'csis-server.mjs'
const FRAME_LANGUAGE = 'frame-language-server.mjs'

/** Minimal valid arguments per tool, so each one can be exercised for real. */
const VALID_ARGS: Record<string, Record<string, unknown>> = {
  list_standards: { family: 'all' },
  get_foundational_commitments: {},
  lookup_corollary: { number: 1 },
  lookup_structural_pattern: { id: 'transition-narrative' },
  lookup_descriptive_class: { id: 'structural-mechanical' },
  audit_against_corollary: { corollary_number: 1 },
  get_inheritance_graph_with_specialty: {},
  check_watchlist: { term: 'governance' },
  check_admissibility: {},
  frame2_functioning_check: {},
  lookup_three_frames: {},
  audit_text: { text: 'Our governance model ensures accountability.' },
  regen_reality_check: {},
}

interface DeclaredSchema {
  type: string
  required?: string[]
  properties?: Record<string, unknown>
  additionalProperties?: boolean
}

async function checkContract(client: McpTestClient, entryLabel: string): Promise<number> {
  const tools = await client.listTools()
  let checked = 0

  for (const tool of tools) {
    const schema = tool.outputSchema as DeclaredSchema | undefined
    expect(schema, `${entryLabel}: ${tool.name} should declare an outputSchema`).toBeDefined()
    expect(schema!.type).toBe('object')
    expect(schema!.required, `${tool.name} schema needs required keys`).toBeTruthy()
    expect(
      schema!.required,
      `${tool.name} must declare _provenance as required`,
    ).toContain('_provenance')
    expect(
      schema!.additionalProperties,
      `${tool.name} should stay open to added explanatory fields`,
    ).toBe(true)

    const args = VALID_ARGS[tool.name]
    expect(args, `no valid arguments recorded for ${tool.name}`).toBeDefined()

    const res = await client.callTool(tool.name, args!)
    expect(res.rpcError, `${tool.name} returned a protocol error`).toBeNull()
    expect(res.isError, `${tool.name} failed on valid arguments`).toBe(false)

    const payload = res.json as Record<string, unknown> | null
    expect(payload, `${tool.name} should return JSON`).not.toBeNull()

    for (const key of schema!.required!) {
      expect(payload, `${tool.name} declared "${key}" but did not return it`).toHaveProperty(key)
    }
    checked += 1
  }
  return checked
}

describe('declared output schemas match what the tools return', () => {
  it('holds for every CSIS tool', async () => {
    const n = await withServer(CSIS, (c) => checkContract(c, 'csis'))
    expect(n).toBe(7)
  })

  it('holds for every Frame Language tool', async () => {
    const n = await withServer(FRAME_LANGUAGE, (c) => checkContract(c, 'frame-language'))
    expect(n).toBe(6)
  })
})

describe('structuredContent accompanies the text payload', () => {
  for (const [label, entry, tool, args] of [
    ['csis', CSIS, 'lookup_corollary', { number: 2 }],
    ['frame-language', FRAME_LANGUAGE, 'check_watchlist', { term: 'oversight' }],
  ] as const) {
    it(`${label} returns structuredContent equal to the parsed text`, async () => {
      await withServer(entry, async (client) => {
        const raw = await client.callToolRaw(tool, args as Record<string, unknown>)
        expect(raw.structuredContent, 'a declared schema needs structuredContent').toBeDefined()
        const fromText = JSON.parse(raw.content[0]!.text)
        expect(raw.structuredContent).toEqual(fromText)
      })
    })
  }
})
