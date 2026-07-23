/**
 * Frame Language watchlist: terms that import Frame 1 vocabulary (control,
 * hierarchy, deference claims) and require replacement in own-voice writing
 * unless one of the seven admissible-use exceptions applies.
 *
 * This module derives the watchlist from the single canonical term registry
 * (src/term-registry.json), a verbatim copy of the Frame Language term
 * registry. The watchlist no longer maintains its own hand-edited list of
 * terms; the registry is the one source. Each entry carries the registry's
 * fields (why a term imports Frame 1, the Frame 2 replacement, strengthened
 * form, procedure, what it forecloses, the slippage note, primitive anchors,
 * common phrasings, and any admissibility note). A replacement_pattern
 * compatibility alias is derived from frame_2_replacement so downstream
 * consumers that read that field name continue to work.
 *
 * This file is ABOUT Frame 1 terms, so it names them, which is admissible.
 */

import registry from './term-registry.json'

/** One phrasing pair: a Frame 1 phrasing and its Frame 2 replacement. */
export interface PhrasingPair {
  frame_1: string
  frame_2: string
}

export interface WatchlistEntry {
  /** The Frame 1 term. */
  term: string
  /** Why this term is Frame 1 (what it imports; mapped from the registry "imports" field). */
  why_frame_1: string
  /** The Frame 2 replacement forms (registry array; may vary per specialty). */
  frame_2_replacement: string[]
  /** The strengthened own-voice form, where the registry provides one. */
  strengthened_form: string | null
  /** The replacement procedure category, where the registry provides one. */
  procedure: string | null
  /** What the Frame 1 term forecloses, where the registry provides it. */
  forecloses: string | null
  /** Note on how the term slips past a Frame 2 reading, where applicable. */
  slippage_note: string | null
  /** Primitives that anchor the replacement, where applicable. */
  primitive_anchors: string[]
  /** Common phrasings and their replacements. */
  common_phrasings: PhrasingPair[]
  /** Admissibility note for this term, where the registry provides one. */
  admissibility_note: string | null
  /**
   * Compatibility alias for the prior field name. Derived from
   * frame_2_replacement joined into a single string. Retained so any consumer
   * expecting replacement_pattern continues to receive a value.
   */
  replacement_pattern: string
}

/** Shape of a registry term as stored in term-registry.json. */
interface RegistryTerm {
  term: string
  frame: number
  imports: string
  frame_2_replacement: string[]
  strengthened_form: string | null
  procedure: string | null
  forecloses: string | null
  slippage_note: string | null
  primitive_anchors: string[]
  common_phrasings: PhrasingPair[]
  admissibility_note: string | null
  sources: string[]
}

interface Registry {
  version: string
  date: string
  description: string
  terms: RegistryTerm[]
}

const typedRegistry = registry as Registry

/** Registry version, exposed for tool output provenance. */
export const REGISTRY_VERSION = typedRegistry.version

function toWatchlistEntry(t: RegistryTerm): WatchlistEntry {
  return {
    term: t.term,
    why_frame_1: t.imports,
    frame_2_replacement: t.frame_2_replacement,
    strengthened_form: t.strengthened_form,
    procedure: t.procedure,
    forecloses: t.forecloses,
    slippage_note: t.slippage_note,
    primitive_anchors: t.primitive_anchors,
    common_phrasings: t.common_phrasings,
    admissibility_note: t.admissibility_note,
    replacement_pattern: t.frame_2_replacement.join('; '),
  }
}

export const WATCHLIST: readonly WatchlistEntry[] = typedRegistry.terms.map(
  toWatchlistEntry,
)

/** Return a watchlist entry by term (case-insensitive). */
export function getWatchlistEntry(term: string): WatchlistEntry | undefined {
  const lower = term.toLowerCase()
  return WATCHLIST.find((e) => e.term.toLowerCase() === lower)
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
    const escaped = entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi')
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
