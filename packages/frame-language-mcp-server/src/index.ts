#!/usr/bin/env node
/**
 * Frame Language MCP server.
 *
 * Frame Language is the precision methodology derived from the Coordination
 * Structural Integrity Suite (CSIS). It operates substrate-level across PoC,
 * CROSS+WALKRI, and other coordination specialty work that inherits from CSIS.
 * This server exposes Frame Language as MCP tools.
 *
 * v0.1.0 tools:
 * - check_watchlist: check a term against the Frame 1 watchlist
 * - check_admissibility: check whether a Frame 1 term use is admissible (seven cases)
 * - frame2_functioning_check: return the eight Frame 2 functioning check modes
 * - lookup_three_frames: return the three Frames with the guna typology mapping
 * - audit_text: scan text for Frame 1 watchlist hits and return findings
 *
 * The substrate discipline requires that substrate work read the full source
 * standards directly rather than substituting derivatives. This server provides
 * operational access to the Frame Language discipline; the canonical sources
 * are the Frame Language Grammar and SOP documents plus the Frame Language
 * Foundational Vocabulary Specification in CSIS.
 *
 * License: Apache-2.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'

import {
  WATCHLIST,
  getWatchlistEntry,
  getAllWatchlistTerms,
  scanTextForWatchlist,
} from './watchlist.js'
import {
  ADMISSIBILITY_CASES,
  getAdmissibilityCase,
  getAllAdmissibilityCaseIds,
} from './admissibility.js'
import {
  FUNCTIONING_CHECK_MODES,
  getFunctioningCheckMode,
  getAllFunctioningCheckModeIds,
} from './functioning-check.js'
import { THREE_FRAMES } from './three-frames.js'

// ---------------------------------------------------------------------------
// Tool input schemas
// ---------------------------------------------------------------------------

const CheckWatchlistInputSchema = z.object({
  term: z
    .string()
    .describe('The term to check against the Frame 1 watchlist (case-insensitive).'),
})

const CheckAdmissibilityInputSchema = z.object({
  case_id: z
    .string()
    .optional()
    .describe(
      'Optional: a specific admissibility case to return. If omitted, returns all seven cases.',
    ),
})

const Frame2FunctioningCheckInputSchema = z.object({
  mode_id: z
    .string()
    .optional()
    .describe(
      'Optional: a specific failure mode to return. If omitted, returns all eight modes.',
    ),
})

const LookupThreeFramesInputSchema = z.object({}).strict()

const AuditTextInputSchema = z.object({
  text: z
    .string()
    .describe('The text to audit for Frame 1 watchlist hits.'),
})

// ---------------------------------------------------------------------------
// Server setup
// ---------------------------------------------------------------------------

const server = new Server(
  {
    name: 'frame-language',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'check_watchlist',
        description:
          'Check a term against the Frame Language watchlist of Frame 1 vocabulary. Returns whether the term is on the watchlist, why it imports Frame 1 framing, the canonical replacement pattern, primitive anchors where applicable, and common phrasings with their Frame 2 equivalents.',
        inputSchema: {
          type: 'object',
          properties: {
            term: {
              type: 'string',
              description: 'The term to check (case-insensitive).',
            },
          },
          required: ['term'],
        },
      },
      {
        name: 'check_admissibility',
        description:
          'Return the seven admissible-use cases for Frame 1 terms per the Frame Language Pre-Replacement Admissibility primitive. A Frame 1 term is admissible without replacement in one of these seven cases. In all other cases, replacement is required. Use this to determine whether a specific Frame 1 usage is admissible or whether replacement applies.',
        inputSchema: {
          type: 'object',
          properties: {
            case_id: {
              type: 'string',
              description:
                'Optional. Specific case to return. Available: citation-use, detection-use, contextual-description, developmental-bridge, naming-the-stage, communication-medium, documentary-record.',
            },
          },
        },
      },
      {
        name: 'frame2_functioning_check',
        description:
          'Return the eight Frame 2 functioning check failure modes. A term expressed in Frame 2 vocabulary may still fail to function as Frame 2 in one of eight ways. Use this to audit whether a Frame 2 claim functions as Frame 2 in practice. Each mode includes a falsifiability-context variant from the Falsifiability Architecture document.',
        inputSchema: {
          type: 'object',
          properties: {
            mode_id: {
              type: 'string',
              description:
                'Optional. Specific failure mode to return. Available: transcendence-claim, declaration-exploit, precision-facade, partial-instantiation, direction-without-destination, vocabulary-without-architecture, correct-map-wrong-territory, frozen-map.',
            },
          },
        },
      },
      {
        name: 'lookup_three_frames',
        description:
          'Return the three Frames of Frame Language with the guna typology mapping. Frame 1 (access: seasonal expressions; guna: tamas), Frame 2 (access: configurations and conditions; guna: rajas), Frame 3 (access: Innate Totality; guna: sattva). Includes the trigunatita orientation (beyond the three gunas; what Frame 3 actually points toward), the nested failure mode structure, the precision-and-non-harming unity, and a note on bridge vocabulary use.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'audit_text',
        description:
          'Audit a block of text against the Frame Language watchlist. Returns each watchlist term that appears in the text, the number of occurrences, the watchlist entry (why Frame 1, replacement pattern, primitive anchors, common phrasings). Use this for own-voice writing audits before publication. NOTE: this tool flags terms; it does not apply the Pre-Replacement Admissibility check automatically. For each flagged term, the user must determine whether the usage is admissible (citation use, detection use, etc.) per the seven cases.',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The text to audit.',
            },
          },
          required: ['text'],
        },
      },
    ],
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === 'check_watchlist') {
    const input = CheckWatchlistInputSchema.parse(args ?? {})
    const entry = getWatchlistEntry(input.term)
    if (!entry) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                term: input.term,
                on_watchlist: false,
                note: `Term "${input.term}" is not on the Frame 1 watchlist. The watchlist contains ${WATCHLIST.length} terms.`,
                all_watchlist_terms: getAllWatchlistTerms(),
              },
              null,
              2,
            ),
          },
        ],
      }
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              term: input.term.toLowerCase(),
              on_watchlist: true,
              entry,
              admissibility_note:
                'Watchlist hit indicates Frame 1 vocabulary that requires replacement in own-voice writing UNLESS one of the seven Pre-Replacement Admissibility cases applies. Use check_admissibility to review the cases.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'check_admissibility') {
    const input = CheckAdmissibilityInputSchema.parse(args ?? {})
    if (input.case_id) {
      const adminCase = getAdmissibilityCase(input.case_id)
      if (!adminCase) {
        const ids = getAllAdmissibilityCaseIds().join(', ')
        throw new Error(
          `Admissibility case "${input.case_id}" not found. Available: ${ids}.`,
        )
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ case: adminCase }, null, 2),
          },
        ],
      }
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total: ADMISSIBILITY_CASES.length,
              cases: ADMISSIBILITY_CASES,
              note:
                'A Frame 1 term is admissible without replacement if it matches one of these seven cases. In all other cases, replacement is required per the Frame Language Replacement Procedure Categories primitive.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'frame2_functioning_check') {
    const input = Frame2FunctioningCheckInputSchema.parse(args ?? {})
    if (input.mode_id) {
      const mode = getFunctioningCheckMode(input.mode_id)
      if (!mode) {
        const ids = getAllFunctioningCheckModeIds().join(', ')
        throw new Error(
          `Functioning check mode "${input.mode_id}" not found. Available: ${ids}.`,
        )
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ mode }, null, 2),
          },
        ],
      }
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total: FUNCTIONING_CHECK_MODES.length,
              modes: FUNCTIONING_CHECK_MODES,
              note:
                'The eight modes are the ways a Frame 2 claim can fail to function as Frame 2 even when the vocabulary is correct. Apply to any specification that uses Frame 2 vocabulary to check whether the structural form is operating.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'lookup_three_frames') {
    LookupThreeFramesInputSchema.parse(args ?? {})
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(THREE_FRAMES, null, 2),
        },
      ],
    }
  }

  if (name === 'audit_text') {
    const input = AuditTextInputSchema.parse(args ?? {})
    const hits = scanTextForWatchlist(input.text)
    const totalHits = hits.reduce((sum, h) => sum + h.occurrences, 0)
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total_watchlist_hits: totalHits,
              terms_found: hits.length,
              hits,
              note:
                totalHits > 0
                  ? 'Each hit must be evaluated against the Pre-Replacement Admissibility seven cases. Citation use of source-framework terms, citation use of CROSS+WALKRI primitive names (e.g., Beneficiary Validation Mechanism), and other admissible-use cases are NOT replacement triggers. Own-voice use of these terms is. Use check_admissibility to review the seven cases.'
                  : 'No watchlist terms found in the audited text. Note that this audit only catches the watchlist terms; other Frame Language failures (Frame 2 functioning check failures, etc.) require separate audits.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  throw new Error(`Unknown tool: ${name}`)
})

// ---------------------------------------------------------------------------
// Start the server
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Frame Language MCP server v0.1.0 running on stdio')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
