/**
 * Frame Language watchlist: terms that import Frame 1 vocabulary (control,
 * hierarchy, deference claims) and require replacement in own-voice writing
 * unless one of the seven admissible-use exceptions applies.
 *
 * Each entry carries the canonical replacement pattern with primitive anchors
 * where applicable. The replacement may differ per coordination specialty;
 * the primitive anchor and the replacement pattern are the substrate-level
 * Frame Language discipline.
 */

export interface WatchlistEntry {
  /** The Frame 1 term. */
  term: string
  /** Why this term is Frame 1 (what it hides; what control-vocabulary it imports). */
  why_frame_1: string
  /** The canonical Frame 2 replacement pattern (substrate level; may vary per specialty). */
  replacement_pattern: string
  /** Primitives that anchor the replacement, where applicable. */
  primitive_anchors: string[]
  /** Common phrasings and their replacements. */
  common_phrasings: { frame_1: string; frame_2: string }[]
}

export const WATCHLIST: readonly WatchlistEntry[] = [
  {
    term: 'accountability',
    why_frame_1:
      'Abstracts the obligation direction, the verification procedure, and the response to non-conformance into a single noun that hides each.',
    replacement_pattern:
      'Obligation directions to [named parties] with [named verification procedure] and [named response to non-conformance].',
    primitive_anchors: [
      'Obligation Fulfillment Record (CROSS+WALKRI Layer 3)',
      'Gate Type and Gate Character (Layer 3)',
      'CROSS Part XI funder obligations',
    ],
    common_phrasings: [
      {
        frame_1: 'held accountable',
        frame_2: 'bound to obligation to [named parties] with named redress procedure under Part XI',
      },
      {
        frame_1: 'accountability mechanism',
        frame_2: 'obligation with redress under Part XI',
      },
      {
        frame_1: 'accountability runs from X to Y',
        frame_2:
          'obligation directions run from X to Y with [verification procedure] and [response to non-conformance]',
      },
    ],
  },
  {
    term: 'governance',
    why_frame_1:
      'Abstracts authority, control, decision rights, removal mechanisms, and disclosure into a single noun.',
    replacement_pattern:
      'Declared decision-standing rules, named maintainers, and named removal mechanism.',
    primitive_anchors: [
      'Disbursement Authority (CROSS+WALKRI Layer 2)',
      'Continuity Capacity (CROSS+WALKRI Layer 2; renamed from Governance Resilience at v0.1.7)',
      'Determination Body Separation (CROSS+WALKRI Layer 4)',
    ],
    common_phrasings: [
      {
        frame_1: 'governance document',
        frame_2: 'rules-of-evolution document or principles document',
      },
      {
        frame_1: 'governance process',
        frame_2: 'declared decision-standing rules and named maintainers',
      },
      {
        frame_1: 'governed by X',
        frame_2: 'under X, or subject to X\'s declared decision-standing rules',
      },
    ],
  },
  {
    term: 'transparency',
    why_frame_1:
      'Most common deference claim in grant-program vocabulary. The Frame 2 form names what is legible, to whom, and through what mechanism.',
    replacement_pattern:
      'Gate record legibility under [named publication mechanism] to [named recipients] of [named declared content].',
    primitive_anchors: [
      'Attestation Corpus (CROSS+WALKRI Layer 4)',
      'Gate Record Legibility (CROSS Part IV)',
      'WALKRI evidence access path requirement',
    ],
    common_phrasings: [
      {
        frame_1: 'transparency commitment',
        frame_2: 'named publication commitment or Attestation Corpus contribution commitment',
      },
      {
        frame_1: 'transparent process',
        frame_2: 'process legible to [named recipients] through [named publication mechanism]',
      },
    ],
  },
  {
    term: 'stakeholder',
    why_frame_1:
      'Collapses cost-bearing parties, beneficiaries, named-population members, funders, reviewers, observers into a single noun that hides each.',
    replacement_pattern:
      'Coordination actor, or more precisely one of: cost-bearing party, named-population member, funder, reviewer, observer, applicant, grantee, evaluator, affected-population member.',
    primitive_anchors: [
      'Cost-Bearing Party (CROSS Part II)',
      'Affected Population Verification Gate (CROSS+WALKRI Layer 4)',
    ],
    common_phrasings: [
      {
        frame_1: 'stakeholder engagement',
        frame_2:
          '[named role] engagement, or Affected Population Verification Gate participation, or cost-bearing party consultation',
      },
    ],
  },
  {
    term: 'oversight',
    why_frame_1:
      'Hides who watches, what they watch, what authority they have to act, and what mechanism enforces their findings.',
    replacement_pattern:
      'Body composition (who watches); scope of authority (what is watched); intervention powers (what authority to act); response mechanism (how findings are enforced).',
    primitive_anchors: [
      'Determination Body Separation (CROSS+WALKRI Layer 4)',
      'Portfolio-level Continuation Benchmark (Layer 7)',
      'Inter-cycle Reflection Stage (Layer 4)',
    ],
    common_phrasings: [
      {
        frame_1: 'independent oversight',
        frame_2:
          'named independent panel with published charter; appointment and removal mechanisms named; binding determinations subject to published redress procedure',
      },
    ],
  },
  {
    term: 'compliance',
    why_frame_1:
      'Frames the relationship as one-way: applicant complies with externally imposed standards. Frame 2 names bidirectional precision obligation.',
    replacement_pattern:
      'Conformance (in own voice); "compliance threshold" admissible as WALKRI canonical field name.',
    primitive_anchors: [
      'Criterion Specification Elements / Compliance Threshold (CROSS+WALKRI Layer 5; citation use admissible for the field name)',
      'Bidirectional Precision (CROSS+WALKRI Layer 1)',
    ],
    common_phrasings: [
      {
        frame_1: 'in compliance with',
        frame_2: 'conforming to',
      },
      {
        frame_1: 'compliance threshold',
        frame_2: 'compliance threshold (WALKRI canonical field name; citation use admissible)',
      },
    ],
  },
  {
    term: 'enforcement',
    why_frame_1: 'Frame 1 force vocabulary. Replace with named response to non-conformance.',
    replacement_pattern: 'Named response to non-conformance under [named procedure].',
    primitive_anchors: ['CROSS Part XI redress provisions'],
    common_phrasings: [
      {
        frame_1: 'enforcement mechanism',
        frame_2: 'named response procedure for non-conformance under Part XI',
      },
    ],
  },
  {
    term: 'legitimacy',
    why_frame_1:
      'One of the strongest Frame 1 deference claims. Asserts rightful authority without naming the source or the conditions.',
    replacement_pattern:
      'Named source of standing plus declared conditions of deference (statutory, regulatory, contractual, voluntary published, civil-society advisory, professional-society standard per Lenses Framework Lens 2).',
    primitive_anchors: [
      'Determination Body Separation (CROSS+WALKRI Layer 4)',
      'Authority Source lens (Lenses Framework Lens 2)',
    ],
    common_phrasings: [
      {
        frame_1: 'legitimate authority',
        frame_2: 'authority sourced in [named source] with [named removal mechanism]',
      },
    ],
  },
  {
    term: 'empowerment',
    why_frame_1: 'Frame 1 deference claim about transferred capacity. Replace with structural form.',
    replacement_pattern:
      'Demonstrated function to deliver [named obligation] in [named population] under [named conditions].',
    primitive_anchors: [
      'Beneficiary Validation Mechanism (Layer 3)',
      'Affected Population Verification Gate (Layer 4)',
    ],
    common_phrasings: [
      {
        frame_1: 'community empowerment',
        frame_2:
          'demonstrated community function under named structural conditions (validation at entry; verification at completion)',
      },
    ],
  },
  {
    term: 'fiduciary',
    why_frame_1:
      'Frame 1 deference claim about a special duty. Admissible in regulatory citation use.',
    replacement_pattern:
      'In citation: "fiduciary duty under [named statute]". In own voice: "obligation to [named party] under [named instrument]."',
    primitive_anchors: ['Position-derived obligation vs Consequence-arising obligation distinction'],
    common_phrasings: [
      {
        frame_1: 'fiduciary responsibility',
        frame_2:
          'obligation to [named party] under [named statute or instrument]; structural type: position-derived (Frame 1) or consequence-arising (Frame 2)',
      },
    ],
  },
  {
    term: 'credibility',
    why_frame_1:
      'Deference claim common in disclosure-and-rating-framework contexts; trustworthiness without naming what authority is being deferred to.',
    replacement_pattern:
      'Standing Evidence per named source (named source of standing; named scope; named currency window; public verification path).',
    primitive_anchors: [
      'Standing Evidence (CROSS+WALKRI Layer 4 Evidence Type)',
      'Independent Verifiability (Layer 1)',
      'Attestation Corpus (Layer 4)',
    ],
    common_phrasings: [
      {
        frame_1: 'highly credible',
        frame_2:
          'standing per [named attesting body] in [named scope] currently as of [named date], publicly verifiable at [named record]',
      },
    ],
  },
  {
    term: 'mandatory',
    why_frame_1: 'Force substitution term. Use declarative form.',
    replacement_pattern:
      '"Required" plus the structural reason, or "named obligation under [named source]".',
    primitive_anchors: ['Gate Type Entry Specification gate (Layer 3)'],
    common_phrasings: [
      {
        frame_1: 'mandatory requirement',
        frame_2: 'named obligation under [named source]',
      },
      {
        frame_1: 'mandatory disclosure',
        frame_2: 'required disclosure under [named rule]',
      },
    ],
  },
] as const

/** Return a watchlist entry by term (case-insensitive). */
export function getWatchlistEntry(term: string): WatchlistEntry | undefined {
  const lower = term.toLowerCase()
  return WATCHLIST.find((e) => e.term === lower)
}

/** Return all watchlist terms. */
export function getAllWatchlistTerms(): readonly string[] {
  return WATCHLIST.map((e) => e.term)
}

/** Scan text for watchlist terms; returns terms found and their positions. */
export function scanTextForWatchlist(text: string): Array<{
  term: string
  occurrences: number
  entry: WatchlistEntry
}> {
  const results: Array<{
    term: string
    occurrences: number
    entry: WatchlistEntry
  }> = []
  for (const entry of WATCHLIST) {
    const regex = new RegExp(`\\b${entry.term}\\b`, 'gi')
    const matches = text.match(regex)
    if (matches && matches.length > 0) {
      results.push({
        term: entry.term,
        occurrences: matches.length,
        entry,
      })
    }
  }
  return results
}
