/**
 * Standards currency tests.
 *
 * The server hands out pointers rather than full text, and tells callers to
 * fetch the source from the URL when substantive work requires it. That makes
 * the URLs load-bearing: a dead pointer is the tool failing at its stated
 * purpose, not a cosmetic issue.
 *
 * All ten were dead. Standard filenames carry their version, every standard had
 * moved, and nothing checked. The server declared versions between one patch
 * and two minor releases behind, and pointed at files that no longer existed.
 *
 * The liveness check reaches the network, so it is skipped when offline or when
 * SKIP_NETWORK_TESTS is set. The offline checks below still catch a stale
 * version whose path was updated without it, or the reverse.
 */

import { describe, it, expect } from 'vitest'
import {
  STANDARDS,
  getStandardGithubUrl,
} from '../packages/csis-mcp-server/src/standards.js'

const SKIP_NETWORK = process.env['SKIP_NETWORK_TESTS'] === '1'

describe('standard pointers are internally consistent', () => {
  it('encodes the declared version in the filename it points at', () => {
    for (const s of STANDARDS) {
      const file = s.githubPath.split('/').pop()!
      const inPath = file.match(/(\d+)_(\d+)_(\d+)\.md$/)
      expect(inPath, `${s.id}: filename carries no version`).not.toBeNull()
      const fromPath = `${inPath![1]}.${inPath![2]}.${inPath![3]}`
      expect(
        fromPath,
        `${s.id} declares ${s.version} but points at ${file}`,
      ).toBe(s.version)
    }
  })

  it('builds a well-formed URL for every standard', () => {
    for (const s of STANDARDS) {
      const url = getStandardGithubUrl(s)
      expect(url, `${s.id}`).toMatch(
        /^https:\/\/github\.com\/coordination-structural-integrity-suite\/suite\/blob\/main\/.+\.md$/,
      )
    }
  })

  it('files every standard under a family directory matching its family', () => {
    for (const s of STANDARDS) {
      const expected = s.family === 'compressive' ? '/compressive/' : '/generative/'
      expect(s.githubPath, `${s.id} is ${s.family}`).toContain(expected)
    }
  })
})

describe.skipIf(SKIP_NETWORK)('standard pointers resolve', () => {
  it(
    'returns 200 for every published standard URL',
    async () => {
      const dead: string[] = []
      for (const s of STANDARDS) {
        const raw = getStandardGithubUrl(s)
          .replace('https://github.com/', 'https://raw.githubusercontent.com/')
          .replace('/blob/', '/')
        try {
          const res = await fetch(raw, { method: 'HEAD' })
          if (!res.ok) dead.push(`${s.id} (${res.status}): ${raw}`)
        } catch (err) {
          // A network failure is not a finding about the standards; skip rather
          // than report a false positive.
          return
        }
      }
      expect(dead, 'these pointers do not resolve').toEqual([])
    },
    60_000,
  )
})
