#!/usr/bin/env node
/**
 * CSIS MCP server.
 *
 * @module
 *
 * Exposes the Coordination Structural Integrity Suite as MCP tools that
 * Claude Code, Cursor, and other MCP-compatible clients can invoke.
 *
 * v0.3.0 tools:
 * - list_standards: enumerate the ten CSIS standards
 * - get_foundational_commitments: unified precision/non-harming principle and inheritance hierarchy (context-dependent activity)
 * - lookup_corollary: return one of the ten PFDS corollaries
 * - lookup_structural_pattern: return one of the ten named structural patterns
 * - lookup_descriptive_class: return one of the six descriptive classes (PFDS Corollary 8)
 * - get_inheritance_graph_with_specialty: content-inheritance structure (PFDS root, two families, FOCAL domains) with named FOCAL domain placed
 * - audit_against_corollary: apply a corollary's precision-first invariant as a structural test on text
 *
 * The substrate discipline requires that PFDS and other substrate work read
 * the full standard directly rather than substituting derivatives. This server
 * provides pointers and structural metadata; the full source remains canonical
 * at github.com/coordination-structural-integrity-suite/suite.
 *
 * License: Apache-2.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import {
  toolError,
  stampProvenance,
  withOutputSchemas,
  type Provenance,
} from './tool-errors.js'

import {
  STANDARDS,
  getStandardsByFamily,
  getStandardGithubUrl,
  type StandardFamily,
} from './standards.js'
import { FOUNDATIONAL_COMMITMENTS } from './foundational-commitments.js'
import {
  PFDS_COROLLARIES,
  PFDS_COROLLARY_COUNT,
  getPfdsCorollary,
} from './corollaries.js'

// Derived from the standards table rather than typed as a literal. Two
// hardcoded copies of this URL had drifted two minor releases behind the
// published file, so both links returned 404 while the table beside them was
// correct. A version bump now moves these with it.
const PFDS_STANDARD_URL = getStandardGithubUrl(
  STANDARDS.find((s) => s.id === 'pfds')!,
)
import { STRUCTURAL_PATTERNS, getStructuralPattern } from './structural-patterns.js'
import { DESCRIPTIVE_CLASSES, getDescriptiveClass } from './descriptive-classes.js'

// ---------------------------------------------------------------------------
// Tool input schemas
// ---------------------------------------------------------------------------

const ListStandardsInputSchema = z.object({
  family: z
    .enum(['compressive', 'generative', 'all'])
    .optional()
    .default('all')
    .describe('Filter standards by family. Default: all ten.'),
})

const GetFoundationalCommitmentsInputSchema = z.object({}).strict()

const LookupCorollaryInputSchema = z.object({
  number: z
    .number()
    .int()
    .min(1)
    .max(PFDS_COROLLARY_COUNT)
    .describe('Corollary number 1 through 9.'),
})

const LookupStructuralPatternInputSchema = z.object({
  id: z
    .string()
    .describe(
      'Pattern id. One of: transition-narrative, hidden-factory-collapse, termination-reflex, specialist-concentration, reframing-loop, drift-pattern, mission-justified-hidden-factory, document-without-process, jurisdictional-capture, hidden-factory-self-extraction.',
    ),
})

const LookupDescriptiveClassInputSchema = z.object({
  id: z
    .string()
    .describe(
      'Class id. One of: structural-mechanical, temporal-dynamic, epistemic-perceptual, relational-topological, felt-experience, action-structural.',
    ),
})

const GetInheritanceGraphInputSchema = z.object({
  specialty: z
    .string()
    .optional()
    .describe(
      'Optional: a FOCAL domain (Form Of Coordination Activity Locus) to place in the inheritance graph (e.g., "AI evaluation", "ESG reporting", "scientific research integrity", "policy evaluation"). A FOCAL domain rests on the coordination floors and is held to the precision instruments. If not provided, returns the canonical structure with only the established FOCAL domains (PoC, CROSS+WALKRI).',
    ),
})

const AuditAgainstCorollaryInputSchema = z.object({
  corollary_number: z
    .number()
    .int()
    .min(1)
    .max(PFDS_COROLLARY_COUNT)
    .describe('Corollary number 1 through 9 to apply as a structural test.'),
  text: z
    .string()
    .optional()
    .describe(
      'Optional: the specification text, claim, or document to audit. If omitted, the tool returns the corollary structural test framework without applying it.',
    ),
})

// ---------------------------------------------------------------------------
// Server setup
// ---------------------------------------------------------------------------

/** Response keys per tool, derived by calling each one and recording what came back. */
const OUTPUT_SCHEMAS: Record<string, readonly string[]> = {
  list_standards: ['total', 'family_filter', 'standards', 'note'],
  get_foundational_commitments: [
    'unifiedPrinciple',
    'unityExplanation',
    'precisionWithoutNonHarming',
    'nonHarmingWithoutPrecision',
    'outcome',
    'inheritanceHierarchy',
  ],
  lookup_corollary: ['corollary', 'note'],
  lookup_structural_pattern: ['pattern', 'note'],
  lookup_descriptive_class: ['descriptive_class', 'all_six_classes', 'corollary_8_reference'],
  audit_against_corollary: [
    'corollary',
    'structural_test',
    'source_reference',
    'audit_input_text_provided',
    'note',
  ],
  get_inheritance_graph_with_specialty: [
    'root',
    'precision_instruments',
    'coordination_floors',
    'meta_standard',
    'frame_language',
    'suite',
    'applied_specialties',
    'inheritance_order_rule',
  ],
}

export const SERVER_VERSION = '0.3.0'
export const SERVER_NAME = 'csis'

const PROVENANCE: Provenance = {
  server: 'csis',
  serverVersion: SERVER_VERSION,
  encodes: {
    'csis-suite': STANDARDS.map((s) => `${s.id}@${s.version}`).join(', '),
  },
}

export function createMcpServer() {
  const server = new Server(
  {
    name: 'csis',
    version: SERVER_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: withOutputSchemas([
      {
        name: 'list_standards',
        description:
          'List the ten standards of the Coordination Structural Integrity Suite (CSIS). Returns canonical names, short ids, family (compressive or generative), current version, GitHub paths, GitHub URLs, and brief descriptions sourced from the suite README. Use this to discover what standards exist, then fetch full standard text from the GitHub URL when substantive work requires the source.',
        inputSchema: {
          type: 'object',
          properties: {
            family: {
              type: 'string',
              enum: ['compressive', 'generative', 'all'],
              description: 'Filter by family. Default: all ten standards.',
            },
          },
        },
      },
      {
        name: 'get_foundational_commitments',
        description:
          'Return the foundational commitments of CSIS: the unified principle of precision and non-harming (held together via transclusion as PFDS specifies, not as two principles held externally); why holding either alone fails; and the content-inheritance structure rooted at PFDS (the root commitment; two cross-domain families under it, the precision instruments of CRAFT and WALKRI and the coordination floors of the nine other CSIS standards, siblings to each other, with Frame Language as the root\'s twin articulation rather than an instrument; FOCAL domains such as PoC and CROSS+WALKRI resting on the coordination floors and held to the precision instruments). The normative force of CSIS on derived work is context-dependent: actively constraining during specification design and revision; receding to background during routine operation. Includes the general principle that inheritance order is independent of chronological order.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'lookup_corollary',
        description:
          'Return one of the nine corollaries of the Precision-First Design Standard. Each corollary specifies its precision condition in two directions: under-specification failure mode and over-specification failure mode. Includes worked examples from PFDS Section 4 where applicable.',
        inputSchema: {
          type: 'object',
          properties: {
            number: {
              type: 'integer',
              minimum: 1,
              maximum: PFDS_COROLLARY_COUNT,
              description: 'Corollary number 1 through 9.',
            },
          },
          required: ['number'],
        },
      },
      {
        name: 'lookup_structural_pattern',
        description:
          'Return one of the ten named structural patterns from the Suite Structural Patterns Primer. A structural pattern is a recurring arrangement across multiple standards that produces a recognizable failure signature. Returns the structural arrangement, which standards are involved, the observable signature, and the maturity status (original-six derived from cross-context analysis, or working-hypothesis from specific evaluations).',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'Pattern id. Available: transition-narrative, hidden-factory-collapse, termination-reflex, specialist-concentration, reframing-loop, drift-pattern, mission-justified-hidden-factory, document-without-process, jurisdictional-capture, hidden-factory-self-extraction.',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'lookup_descriptive_class',
        description:
          'Return one of the six descriptive classes from the Descriptive Typology Map (referenced by PFDS Corollary 8). Each class characterizes a structurally distinct dimension along which a phenomenon can be described. Use to audit a specification\'s operative and boundary classes per Corollary 8.',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description:
                'Class id. Available: structural-mechanical, temporal-dynamic, epistemic-perceptual, relational-topological, felt-experience, action-structural.',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'audit_against_corollary',
        description:
          'Apply a PFDS corollary as a structural test on a specification, claim, or document. Returns the corollary\'s precision-first invariant (under-specification failure mode and over-specification failure mode), the structural test framework, and a prompt template for applying the test to provided text. Use this to audit whether a specification satisfies a specific corollary, or to diagnose which precision failure mode a problematic specification is exhibiting. Per the substrate discipline: this tool surfaces the structural framework; substantive PFDS work still requires reading the full standard.',
        inputSchema: {
          type: 'object',
          properties: {
            corollary_number: {
              type: 'integer',
              minimum: 1,
              maximum: PFDS_COROLLARY_COUNT,
              description: 'Corollary number 1 through 9 to apply.',
            },
            text: {
              type: 'string',
              description:
                'Optional: the specification text, claim, or document to audit. If omitted, returns the structural test framework alone.',
            },
          },
          required: ['corollary_number'],
        },
      },
      {
        name: 'get_inheritance_graph_with_specialty',
        description:
          'Return the content-inheritance structure with an optional named FOCAL domain placed correctly. Without an argument: returns the root (the PFDS commitment), the two cross-domain families under it (the precision instruments of CRAFT and WALKRI, with Frame Language as the root\'s twin articulation rather than an instrument; the coordination floors of the nine other CSIS standards), CRAFT as the one meta-standard and sibling of the floors, and PoC and CROSS+WALKRI as established FOCAL domains resting on the floors and held to the instruments. With a specialty argument: places the named FOCAL domain as a sibling of PoC and CROSS+WALKRI. Note: this is the content-inheritance graph (a tree), not the constitutive interaction (a mesh, described in the interaction-architecture document); the normative force of CSIS on derived work is context-dependent, active during design and revision and background during routine operation.',
        inputSchema: {
          type: 'object',
          properties: {
            specialty: {
              type: 'string',
              description:
                'Optional. A FOCAL domain to place in the graph. Examples: "AI evaluation", "ESG reporting", "scientific research integrity", "policy evaluation".',
            },
          },
        },
      },
    ], OUTPUT_SCHEMAS),
  }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    const __result = await (async () => {

  if (name === 'list_standards') {
    const input = ListStandardsInputSchema.parse(args ?? {})
    const filtered =
      input.family === 'all'
        ? STANDARDS
        : getStandardsByFamily(input.family as StandardFamily)

    const standardsWithUrls = filtered.map((s) => ({
      name: s.name,
      id: s.id,
      family: s.family,
      version: s.version,
      githubPath: s.githubPath,
      githubUrl: getStandardGithubUrl(s),
      description: s.description,
    }))

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total: standardsWithUrls.length,
              family_filter: input.family,
              standards: standardsWithUrls,
              note:
                'Metadata pointers. The substrate discipline requires that full standards be read directly when substantive PFDS, ASEP, or other corollary work is performed; fetch source content from githubUrl in those cases.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'get_foundational_commitments') {
    GetFoundationalCommitmentsInputSchema.parse(args ?? {})
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(FOUNDATIONAL_COMMITMENTS, null, 2),
        },
      ],
    }
  }

  if (name === 'lookup_corollary') {
    const input = LookupCorollaryInputSchema.parse(args ?? {})
    const corollary = getPfdsCorollary(input.number)
    if (!corollary) {
      throw new Error(`Corollary ${input.number} not found. Available: 1 through 9.`)
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              corollary,
              note:
                `PFDS structural data. Full corollary text and surrounding context are at the PFDS standard: ${PFDS_STANDARD_URL}`,
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'lookup_structural_pattern') {
    const input = LookupStructuralPatternInputSchema.parse(args ?? {})
    const pattern = getStructuralPattern(input.id)
    if (!pattern) {
      const availableIds = STRUCTURAL_PATTERNS.map((p) => p.id).join(', ')
      throw new Error(`Structural pattern "${input.id}" not found. Available: ${availableIds}.`)
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              pattern,
              note:
                'Full pattern details with worked examples are in the Suite Structural Patterns Primer: https://github.com/coordination-structural-integrity-suite/suite/blob/main/tensegrity-suite/overview/suite-structural-patterns-primer-0_1_2.md',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'lookup_descriptive_class') {
    const input = LookupDescriptiveClassInputSchema.parse(args ?? {})
    const dclass = getDescriptiveClass(input.id)
    if (!dclass) {
      const availableIds = DESCRIPTIVE_CLASSES.map((c) => c.id).join(', ')
      throw new Error(`Descriptive class "${input.id}" not found. Available: ${availableIds}.`)
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              descriptive_class: dclass,
              all_six_classes: DESCRIPTIVE_CLASSES.map((c) => c.id),
              corollary_8_reference:
                'PFDS Corollary 8 (Descriptive completeness): a specification declares which classes it draws from (operative) and at least one class where its vocabulary ends (boundary). Use these six classes to apply the typological declaration.',
            },
            null,
            2,
          ),
        },
      ],
    }
  }

  if (name === 'audit_against_corollary') {
    const input = AuditAgainstCorollaryInputSchema.parse(args ?? {})
    const corollary = getPfdsCorollary(input.corollary_number)
    if (!corollary) {
      throw new Error(`Corollary ${input.corollary_number} not found. Available: 1 through 9.`)
    }
    const structuralTest = {
      apply_in_two_directions:
        'A precision-first audit checks both directions. (1) Under-specification: does the text fail to prevent the under-specification failure mode named below? (2) Over-specification: does the text exhibit the over-specification failure mode named below? A specification can fail in either direction independently.',
      under_specification_check: corollary.underSpecificationFailure,
      over_specification_check: corollary.overSpecificationFailure,
      requirement_to_satisfy: corollary.requirement,
      worked_example_from_pfds: corollary.exampleFromPfds,
    }

    const payload: Record<string, unknown> = {
      corollary: {
        number: corollary.number,
        name: corollary.name,
      },
      structural_test: structuralTest,
      source_reference:
        `PFDS Section 2 (Corollaries) and Section 4 (Worked Examples). Full standard: ${PFDS_STANDARD_URL}`,
    }

    if (input.text) {
      const promptTemplate =
        `Apply PFDS Corollary ${corollary.number} (${corollary.name}) as a structural test on the following text.\n\n` +
        `REQUIREMENT (what the corollary mandates):\n${corollary.requirement}\n\n` +
        `UNDER-SPECIFICATION FAILURE MODE (one direction of imprecision):\n${corollary.underSpecificationFailure}\n\n` +
        `OVER-SPECIFICATION FAILURE MODE (the other direction of imprecision):\n${corollary.overSpecificationFailure}\n\n` +
        (corollary.exampleFromPfds
          ? `WORKED EXAMPLE FROM PFDS:\n${corollary.exampleFromPfds}\n\n`
          : '') +
        `TEXT TO AUDIT:\n${input.text}\n\n` +
        `Return a structured audit:\n` +
        `{\n` +
        `  "verdict": "satisfies" | "fails-under" | "fails-over" | "fails-both" | "indeterminate",\n` +
        `  "under_specification_finding": string,\n` +
        `  "over_specification_finding": string,\n` +
        `  "specific_passages": [{ "passage": string, "issue": string, "direction": "under" | "over" }],\n` +
        `  "remediation": string\n` +
        `}\n\n` +
        `Apply the corollary as a precision-first invariant: both failure directions must be checked independently. The substrate discipline requires that the verdict be defensible by reference to specific passages, not impressionistic.`

      payload['audit_input_text_provided'] = true
      payload['prompt_template'] = promptTemplate
      payload['note'] =
        'Send the prompt_template to a language model to perform the corollary audit. The tool itself surfaces the structural test; the LLM applies it.'
    } else {
      payload['audit_input_text_provided'] = false
      payload['note'] =
        'No text provided. Returned the structural test framework. Call again with the text argument to receive a prompt template for applying the audit.'
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    }
  }

  if (name === 'get_inheritance_graph_with_specialty') {
    const input = GetInheritanceGraphInputSchema.parse(args ?? {})
    const baseHierarchy = FOUNDATIONAL_COMMITMENTS.inheritanceHierarchy
    const graph = {
      root: baseHierarchy.root,
      precision_instruments: baseHierarchy.precisionInstruments,
      coordination_floors: baseHierarchy.coordinationFloors,
      meta_standard: baseHierarchy.craft,
      frame_language: baseHierarchy.frameLanguage,
      suite: baseHierarchy.csis,
      applied_specialties: [
        {
          name: 'Proof of Coordination (PoC)',
          description: baseHierarchy.poc,
          established: true,
          focal: true,
        },
        {
          name: 'CROSS+WALKRI',
          description: baseHierarchy.crossWalkri,
          established: true,
          domain: 'grants',
          focal: true,
        },
      ] as Array<{
        name: string
        description: string
        established: boolean
        domain?: string
        focal?: boolean
        prospective?: boolean
        note?: string
      }>,
      inheritance_order_rule: baseHierarchy.inheritanceOrderRule,
    }

    if (input.specialty) {
      graph.applied_specialties.push({
        name: input.specialty,
        description: `${input.specialty} placed as a prospective FOCAL domain: if its defining activity is multiple parties brought into coordination, it rests on the coordination floors and is held to the precision instruments (CRAFT and WALKRI), inheriting from the root commitment, as a sibling of PoC and CROSS+WALKRI. If the named work is instead a precision instrument or a meta-standard (for example CRAFT), it belongs in the precision-instrument family as a sibling of the coordination floors, not as a FOCAL domain; CRAFT is already built at specification v0.4.0.`,
        established: false,
        prospective: true,
        focal: true,
        note:
          'Placement is prospective. Apply the FOCAL test first: can an independent observer name the parties whose activity must be brought into coordination as the defining feature. A new FOCAL domain would require its own primitives, schemas, and compatibility statements, all inheriting the coordination floors and held to the precision instruments. See the Cross-Domain Applicability Analysis (held in reserve at CROSS+WALKRI corpus).',
      })
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(graph, null, 2),
        },
      ],
    }
  }

    throw new Error(`Unknown tool: ${name}`)
    })()
    return stampProvenance(__result, PROVENANCE)
  } catch (err) {
    return toolError(err, name)
  }
})

  return server
}
