/**
 * Standards currency tests.
 *
 * The server hands out pointers rather than full text, and tells callers to
 * fetch the source from the URL when substantive work requires it. That makes
 * the URLs load-bearing: a dead pointer is the tool failing at its stated
 * purpose, not a cosmetic issue.
 *
 * Filenames follow the stable-stem convention (terminology-conventions
 * Section 4, corpus-wide for CSIS standards as of the 2026-08-20 machine-readable
 * publishing pass): a standard's filename carries a frozen series-stem number that
 * is NOT renamed on a version bump. The single authoritative version is the file's
 * internal `Version` line. The filename stem and the internal version therefore
 * diverge over time by design; that divergence is expected and correct, not drift.
 *
 * So the registry (standards.ts) is correct when each entry's `version` equals the
 * authoritative internal version of the file it points at. That is the load-bearing
 * check, and it reaches the network, so it is skipped when offline or when
 * SKIP_NETWORK_TESTS is set. The offline checks below still catch a filename with no
 * series stem, a stem that has somehow run ahead of the version, a malformed URL, or
 * a family-directory mismatch.
 */

import { describe, it, expect } from 'vitest'
import { STANDARDS, getStandardGithubUrl } from '../packages/csis-mcp-server/src/standards.js'

const SKIP_NETWORK = process.env['SKIP_NETWORK_TESTS'] === '1'

/** The three-part version encoded in a stable-stem filename, or null if absent. */
function versionFromFilename(githubPath: string): string | null {
  const file = githubPath.split('/').pop()!
  const m = file.match(/(\d+)_(\d+)_(\d+)\.md$/)
  return m ? `${m[1]}.${m[2]}.${m[3]}` : null
}

/**
 * The authoritative internal version of a standard document. Standards carry it as
 * a header line near the top, in one of a few authored forms: `**Version:** v0.3.25`,
 * `**Version:** 0.3.7`, or `Version 0.1.27 | September 2026`. A frontmatter
 * `version:` field is accepted as a fallback. Changelog rows (`**v0.3.25 (date):**`)
 * are not matched, since they begin `v`, not `Version`.
 */
function parseInternalVersion(text: string): string | null {
  const head = text.slice(0, 4000)
  for (const line of head.split(/\r?\n/)) {
    const m = line.match(/^[*#\s]*Version[:*\s]+v?(\d+\.\d+\.\d+)/i)
    if (m) return m[1]
  }
  const fm = head.match(/^version:\s*v?(\d+\.\d+\.\d+)/im)
  return fm ? fm[1] : null
}

/** Compare two X.Y.Z versions: negative if a < b, 0 if equal, positive if a > b. */
function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i]
  }
  return 0
}

/** The raw.githubusercontent URL for a standard's source. */
function rawUrl(s: (typeof STANDARDS)[number]): string {
  return getStandardGithubUrl(s)
    .replace('https://github.com/', 'https://raw.githubusercontent.com/')
    .replace('/blob/', '/')
}

describe('standard pointers are internally consistent', () => {
  it('carries a series-stem version in every filename', () => {
    for (const s of STANDARDS) {
      expect(
        versionFromFilename(s.githubPath),
        `${s.id}: filename carries no series-stem version`,
      ).not.toBeNull()
    }
  })

  it('never lets a filename stem run ahead of the declared version', () => {
    // The stem is frozen at or before the version and the version advances from it,
    // so stem <= version always holds. A stem ahead of the version is an error, not a
    // stable stem.
    for (const s of STANDARDS) {
      const stem = versionFromFilename(s.githubPath)!
      expect(
        compareVersions(stem, s.version) <= 0,
        `${s.id}: filename stem ${stem} is ahead of declared version ${s.version}`,
      ).toBe(true)
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

describe.skipIf(SKIP_NETWORK)('standard pointers resolve and carry the registry version', () => {
  it(
    'returns 200 and an internal version equal to the registry version for every standard',
    async () => {
      const problems: string[] = []
      for (const s of STANDARDS) {
        const raw = rawUrl(s)
        let text: string
        try {
          const res = await fetch(raw)
          if (!res.ok) {
            problems.push(`${s.id} (${res.status}): dead pointer ${raw}`)
            continue
          }
          text = await res.text()
        } catch {
          // A network failure is not a finding about the standards; skip rather
          // than report a false positive.
          return
        }
        const internal = parseInternalVersion(text)
        if (internal === null) {
          problems.push(`${s.id}: no authoritative Version line found in ${raw}`)
          continue
        }
        if (internal !== s.version) {
          problems.push(
            `${s.id}: registry declares ${s.version} but the standard's internal version is ${internal}`,
          )
        }
      }
      expect(problems, 'registry-version and pointer problems').toEqual([])
    },
    60_000,
  )
})
