/**
 * Data integrity tests.
 *
 * The servers are metadata surfaces over hand-maintained records. These tests
 * assert the invariants those records must hold: no duplicate identifiers,
 * every lookup resolves, counts match what the documentation claims, and no
 * field that callers depend on is silently empty.
 */

import { describe, it, expect } from 'vitest'
import {
  STANDARDS,
  getStandardById,
  getStandardsByFamily,
  getStandardGithubUrl,
} from '../packages/csis-mcp-server/src/standards.js'
import {
  PFDS_COROLLARIES,
  PFDS_COROLLARY_COUNT,
  getPfdsCorollary,
} from '../packages/csis-mcp-server/src/corollaries.js'
import {
  STRUCTURAL_PATTERNS,
  getStructuralPattern,
} from '../packages/csis-mcp-server/src/structural-patterns.js'
import {
  DESCRIPTIVE_CLASSES,
  getDescriptiveClass,
  getAllDescriptiveClassIds,
} from '../packages/csis-mcp-server/src/descriptive-classes.js'
import {
  WATCHLIST,
  REGISTRY_VERSION,
  getWatchlistEntry,
  getAllWatchlistTerms,
  scanTextForWatchlist,
} from '../packages/frame-language-mcp-server/src/watchlist.js'
import {
  ADMISSIBILITY_CASES,
  getAdmissibilityCase,
} from '../packages/frame-language-mcp-server/src/admissibility.js'
import {
  FUNCTIONING_CHECK_MODES,
  getFunctioningCheckMode,
} from '../packages/frame-language-mcp-server/src/functioning-check.js'
import {
  REGEN_CHECKS,
  getRegenCheck,
} from '../packages/frame-language-mcp-server/src/regen-check.js'

function expectNoDuplicates(values: readonly string[], what: string): void {
  const seen = new Set<string>()
  const dupes: string[] = []
  for (const v of values) {
    if (seen.has(v)) dupes.push(v)
    seen.add(v)
  }
  expect(dupes, `duplicate ${what}`).toEqual([])
}

describe('CSIS standards', () => {
  it('holds ten standards, the suite roster', () => {
    expect(STANDARDS.length).toBe(10)
  })

  it('splits into compressive and generative with nothing left over', () => {
    const compressive = getStandardsByFamily('compressive')
    const generative = getStandardsByFamily('generative')
    expect(compressive.length + generative.length).toBe(STANDARDS.length)
    expect(compressive.length).toBeGreaterThan(0)
    expect(generative.length).toBeGreaterThan(0)
  })

  it('has no duplicate ids and every id resolves', () => {
    expectNoDuplicates(STANDARDS.map((s) => s.id), 'standard id')
    for (const s of STANDARDS) {
      expect(getStandardById(s.id), `${s.id} should resolve`).toBeDefined()
    }
  })

  it('gives every standard a version and a resolvable GitHub url', () => {
    for (const s of STANDARDS) {
      expect(s.version, `${s.id} needs a version`).toBeTruthy()
      const url = getStandardGithubUrl(s)
      expect(url, `${s.id} url`).toMatch(/^https:\/\/github\.com\//)
    }
  })

  it('returns undefined rather than throwing for an unknown id', () => {
    expect(getStandardById('no-such-standard')).toBeUndefined()
  })
})

describe('PFDS corollaries', () => {
  it('numbers them contiguously from one', () => {
    const numbers = PFDS_COROLLARIES.map((c) => c.number).sort((a, b) => a - b)
    expect(numbers).toEqual(numbers.map((_, i) => i + 1))
  })

  it('resolves every declared number and refuses those outside the range', () => {
    for (const c of PFDS_COROLLARIES) {
      expect(getPfdsCorollary(c.number)).toBeDefined()
    }
    expect(getPfdsCorollary(0)).toBeUndefined()
    expect(getPfdsCorollary(PFDS_COROLLARIES.length + 1)).toBeUndefined()
  })

  // The two tests above compare the table to itself, which is why a tenth
  // corollary sat in the table for a release while the argument bounds still
  // said nine. This one compares it to the bound callers are held to.
  it('advertises a bound that matches the table', () => {
    expect(PFDS_COROLLARY_COUNT).toBe(PFDS_COROLLARIES.length)
  })
})

describe('structural patterns and descriptive classes', () => {
  it('has no duplicate pattern ids and every one resolves', () => {
    expectNoDuplicates(STRUCTURAL_PATTERNS.map((p) => p.id), 'pattern id')
    for (const p of STRUCTURAL_PATTERNS) {
      expect(getStructuralPattern(p.id), `${p.id} should resolve`).toBeDefined()
    }
  })

  it('keeps the descriptive class id list in step with the records', () => {
    const ids = getAllDescriptiveClassIds()
    expect(ids.length).toBe(DESCRIPTIVE_CLASSES.length)
    expectNoDuplicates(ids, 'descriptive class id')
    for (const id of ids) {
      expect(getDescriptiveClass(id), `${id} should resolve`).toBeDefined()
    }
  })
})

describe('Frame Language term registry', () => {
  it('exposes a registry version, which the compiled output once returned as undefined', () => {
    expect(REGISTRY_VERSION).toBeTruthy()
    expect(typeof REGISTRY_VERSION).toBe('string')
  })

  it('loads every term from the registry rather than a stale subset', () => {
    expect(WATCHLIST.length).toBeGreaterThanOrEqual(33)
  })

  it('has no duplicate terms and resolves each one case-insensitively', () => {
    expectNoDuplicates(getAllWatchlistTerms().map((t) => t.toLowerCase()), 'watchlist term')
    for (const term of getAllWatchlistTerms()) {
      expect(getWatchlistEntry(term.toUpperCase()), `${term} should resolve`).toBeDefined()
    }
  })

  it('gives every term a Frame 2 replacement, since a flag with no alternative is not actionable', () => {
    for (const entry of WATCHLIST) {
      expect(
        entry.frame_2_replacement.length,
        `${entry.term} needs at least one replacement`,
      ).toBeGreaterThan(0)
    }
  })

  it('finds a term in running prose and counts repeats', () => {
    const hits = scanTextForWatchlist('Governance requires governance, plainly.')
    const governance = hits.find((h) => h.term === 'governance')
    expect(governance).toBeDefined()
    expect(governance!.occurrences).toBe(2)
  })

  it('does not match a term inside a longer word', () => {
    const hits = scanTextForWatchlist('The governator arrived.')
    expect(hits.find((h) => h.term === 'governance')).toBeUndefined()
  })

  it('documents the known limit: inflected forms are not matched', () => {
    // "empowerment" is on the watchlist; "empowering" is the same vocabulary
    // move and is not caught. Recorded as a test so the behaviour is a decision
    // rather than a surprise. If stemming is added, this test should flip.
    const hits = scanTextForWatchlist('We are empowering the community.')
    expect(hits.find((h) => h.term === 'empowerment')).toBeUndefined()
  })
})

describe('Frame Language reference sets', () => {
  it('resolves every admissibility case and rejects an unknown id', () => {
    expectNoDuplicates(ADMISSIBILITY_CASES.map((c) => c.id), 'admissibility case id')
    for (const c of ADMISSIBILITY_CASES) {
      expect(getAdmissibilityCase(c.id)).toBeDefined()
    }
    expect(getAdmissibilityCase('no-such-case')).toBeUndefined()
  })

  it('resolves every functioning-check mode and rejects an unknown id', () => {
    expectNoDuplicates(FUNCTIONING_CHECK_MODES.map((m) => m.id), 'functioning check mode id')
    for (const m of FUNCTIONING_CHECK_MODES) {
      expect(getFunctioningCheckMode(m.id)).toBeDefined()
    }
    expect(getFunctioningCheckMode('no-such-mode')).toBeUndefined()
  })

  it('resolves every regen check and rejects an unknown id', () => {
    expectNoDuplicates(REGEN_CHECKS.map((r) => r.id), 'regen check id')
    for (const r of REGEN_CHECKS) {
      expect(getRegenCheck(r.id)).toBeDefined()
    }
    expect(getRegenCheck('no-such-check')).toBeUndefined()
  })
})
