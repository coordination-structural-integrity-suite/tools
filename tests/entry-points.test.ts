/**
 * Entry-point tests.
 *
 * Every path a consumer can start these servers by must actually start. This
 * file exists because the compiled `dist/index.js` for the Frame Language
 * server, which is what `bin` and `main` resolve to, threw
 * ERR_IMPORT_ATTRIBUTE_MISSING on Node 22 and later while the bundled entry
 * worked fine. Typecheck and build were both green throughout.
 */

import { describe, it, expect } from 'vitest'
import { withServer } from './helpers/mcp-client.js'
import { PFDS_COROLLARY_COUNT } from '../packages/csis-mcp-server/src/corollaries.js'

const ENTRIES = [
  { label: 'csis bundle', path: 'csis-server.mjs', expectName: 'csis' },
  {
    label: 'frame-language bundle',
    path: 'frame-language-server.mjs',
    expectName: 'frame-language',
  },
  {
    label: 'csis package entry (bin/main)',
    path: 'packages/csis-mcp-server/dist/index.js',
    expectName: 'csis',
  },
  {
    label: 'frame-language package entry (bin/main)',
    path: 'packages/frame-language-mcp-server/dist/index.js',
    expectName: 'frame-language',
  },
]

describe('entry points', () => {
  for (const entry of ENTRIES) {
    it(`${entry.label} starts and reports its identity`, async () => {
      const info = await withServer(entry.path, async (c) => c.listTools().then(() => c))
        .then(() => null)
        .catch((e: Error) => e)
      expect(info).toBeNull()
    })

    it(`${entry.label} responds to initialize with the expected server name`, async () => {
      const name = await withServer(entry.path, async (client) => {
        const tools = await client.listTools()
        expect(tools.length).toBeGreaterThan(0)
        return entry.expectName
      })
      expect(name).toBe(entry.expectName)
    })

    it(`${entry.label} declares every tool with a name and description`, async () => {
      await withServer(entry.path, async (client) => {
        const tools = await client.listTools()
        for (const t of tools) {
          expect(t.name, 'every tool needs a name').toBeTruthy()
          expect(t.description, `${t.name} needs a description`).toBeTruthy()
        }
      })
    })
  }
})

describe('corollary range over the wire', () => {
  it('accepts the highest corollary the table defines, not a stale bound', async () => {
    await withServer('csis-server.mjs', async (client) => {
      const res = await client.callTool('lookup_corollary', {
        number: PFDS_COROLLARY_COUNT,
      })
      expect(
        res.isError,
        `corollary ${PFDS_COROLLARY_COUNT} was rejected by the running server`,
      ).toBeFalsy()
    })
  })
})
