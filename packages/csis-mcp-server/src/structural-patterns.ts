/**
 * The ten named structural patterns from the Suite Structural Patterns Primer.
 *
 * A structural pattern is a recurring structural arrangement across multiple
 * standards that produces a recognizable failure signature. Practitioners
 * encounter patterns; the suite is deployed strategically by recognizing
 * which standards are load-bearing for a given pattern.
 *
 * Sourced from suite-structural-patterns-primer-0_1_2.md (March 2026).
 */

export interface StructuralPattern {
  /** Short identifier for tool calls. */
  id: string
  /** Canonical name of the pattern. */
  name: string
  /** Brief description of the structural arrangement. */
  arrangement: string
  /** Which CSIS standards are involved when this pattern occurs. */
  standardsInvolved: string[]
  /** The observable signature: what to look for. */
  observableSignature: string
  /** Maturity status: original-six derived from cross-context analysis, or four-added working hypotheses from specific evaluations. */
  maturityStatus: 'original-six' | 'working-hypothesis-from-specific-evaluation'
}

export const STRUCTURAL_PATTERNS: readonly StructuralPattern[] = [
  {
    id: 'transition-narrative',
    name: 'Transition Narrative',
    arrangement:
      'A leadership or control change is framed through narrative before sensemaking can open on what the change means structurally. The framing forecloses the questions that would surface capability gaps and obligation directions.',
    standardsInvolved: ['Sensemaking', 'Precision-First Design', 'Adverse-Signal Engagement Principle'],
    observableSignature:
      'Participants cannot describe what structural capacity changed during the transition, or why the previous structural arrangement failed and what the new one was designed to address differently.',
    maturityStatus: 'original-six',
  },
  {
    id: 'hidden-factory-collapse',
    name: 'Hidden Factory Collapse',
    arrangement:
      'Coordination work is sustained by invisible capacity (most often Mission battery) that does not appear in coordinating records or compensation structures. The coordination system runs on this work without measuring it. When the person or group carrying it depletes or exits, the system cannot diagnose what was lost because it never registered what was present.',
    standardsInvolved: ['Four Batteries Capacity', 'Sensemaking', 'Adverse-Signal Engagement Principle'],
    observableSignature:
      'Capacity loss registers as coordinating failure; the system produces explanations for what went wrong that do not include the invisible work that was sustaining it.',
    maturityStatus: 'original-six',
  },
  {
    id: 'termination-reflex',
    name: 'Termination Reflex',
    arrangement:
      'Absent conflict transformation infrastructure, conflicts resolve through termination (departure, fork, dissolution, vote to exclude) rather than transformation. The system reads conflict as a system error requiring removal rather than structural information requiring processing.',
    standardsInvolved: ['Conflict Transformation', 'Adverse-Signal Engagement Principle'],
    observableSignature:
      'The coordinating record shows conflict events followed by termination votes, departures, or structural splits without evidence that the conflict was opened as a question the system needed to answer.',
    maturityStatus: 'original-six',
  },
  {
    id: 'specialist-concentration',
    name: 'Specialist Concentration',
    arrangement:
      'One person or team holds coordination-dimension and specialization-dimension power simultaneously, without the distinction visible in coordinating records. The system cannot distinguish contribution from concentration because both look identical from outside.',
    standardsInvolved: ['Structural Power Obligation', 'Information Asymmetry Classification', 'Adverse-Signal Engagement Principle'],
    observableSignature:
      'Removal or departure of one actor produces cascading structural failure disproportionate to any single contributor, revealing that the coordination system was structurally dependent in ways it had not acknowledged.',
    maturityStatus: 'original-six',
  },
  {
    id: 'reframing-loop',
    name: 'Reframing Loop',
    arrangement:
      'Adverse signals are reprocessed as less threatening interpretations (natural evolution, transitional difficulty, temporary friction, misunderstanding) rather than structurally engaged. Each reframe completes the adverse signal processing cycle without producing a structural response.',
    standardsInvolved: ['Adverse-Signal Engagement Principle', 'Precision-First Design', 'Sensemaking'],
    observableSignature:
      'Looking back at a series of exchanges, each adverse signal has a documented response that terminates the signal without altering the structural condition that generated it.',
    maturityStatus: 'original-six',
  },
  {
    id: 'drift-pattern',
    name: 'Drift Pattern',
    arrangement:
      'Power, consent, or capacity erodes gradually through accumulation of small adjustments, each individually defensible, that collectively produce structural gaps visible only when the system encounters external pressure. The standards that would detect drift are not in place, so the system has confidence it is healthy while the erosion proceeds.',
    standardsInvolved: ['Structural Power Obligation', 'Structural Consent Legibility', 'Information Asymmetry Classification'],
    observableSignature:
      'A system that was functioning within its founding conditions encounters a novel pressure and cannot account for why its coordination capacity is lower than expected. The coordinating record shows incremental changes, each uncontroversial at the time, that together altered the structural conditions without any single decision being identifiable as the cause.',
    maturityStatus: 'original-six',
  },
  {
    id: 'mission-justified-hidden-factory',
    name: 'Mission-Justified Hidden Factory',
    arrangement:
      'An organization\'s stated mission actively frames its coordination work as not-coordination, making the Hidden Factory philosophically mandated rather than accidentally produced. The mission vocabulary justifies why the coordination work being done cannot be measured or compensated as coordination work.',
    standardsInvolved: ['Four Batteries Capacity', 'Sensemaking', 'Precision-First Design'],
    observableSignature:
      'An organization whose stated mission requires reducing its own coordination footprint is simultaneously doing significant coordination work that does not appear in any coordinating record. When challenged on this, the organization invokes the mission vocabulary as the explanation for why the work is not coordination.',
    maturityStatus: 'working-hypothesis-from-specific-evaluation',
  },
  {
    id: 'document-without-process',
    name: 'Document Without Process',
    arrangement:
      'Structural decisions are conveyed through policy documents produced without a visible sensemaking process. Future participants receive the resolution frame without the reasoning that produced it: no named initiating disruption, no documented liminal phase, no evidence basis for the resolution, no stated revision conditions.',
    standardsInvolved: ['Sensemaking', 'Precision-First Design', 'Adverse-Signal Engagement Principle'],
    observableSignature:
      'The document generates sustained debate about what it means and what it commits the issuing party to, because participants disagree about the underlying question the document was answering. That disagreement cannot be resolved by reading the document more carefully; it requires the sensemaking process that was absent.',
    maturityStatus: 'working-hypothesis-from-specific-evaluation',
  },
  {
    id: 'jurisdictional-capture',
    name: 'Jurisdictional Capture',
    arrangement:
      'An entity with development or operational responsibility informally claims a domain boundary ("product decisions are ours," "technical choices are ours"). Over time this claimed boundary is treated as formal by both parties. When an action within the claimed domain has material financial consequences for the coordinating body, the body discovers it has no structural mechanism to contest the action before it occurs.',
    standardsInvolved: ['Precision-First Design', 'Information Asymmetry Classification', 'Structural Power Obligation', 'Structural Consent Legibility'],
    observableSignature:
      'The coordinating body discovers a materially consequential action by a related entity through external investigation rather than disclosure. The related entity\'s justification invokes a domain boundary that was never formally specified. Available response options are limited to: accept the action, conduct an adversarial coordinating process, or threaten exit.',
    maturityStatus: 'working-hypothesis-from-specific-evaluation',
  },
  {
    id: 'hidden-factory-self-extraction',
    name: 'Hidden Factory Self-Extraction',
    arrangement:
      'An entity doing significant invisible coordination work that the system depends on, finding no structural path to recognition and legitimate compensation, extracts value unilaterally from within its operational domain. Distinct from Hidden Factory Collapse where invisible workers deplete and exit; this is the resolution path when the invisible worker holds operational control and the system provides no legitimate compensation mechanism.',
    standardsInvolved: ['Four Batteries Capacity', 'Information Asymmetry Classification', 'Adverse-Signal Engagement Principle', 'Structural Consent Legibility'],
    observableSignature:
      'An entity that has been providing significant operational capacity to a system takes a unilateral action that redirects value from the system to itself. When confronted, the entity invokes its past contributions and risk absorption as justification. The system cannot evaluate this justification because the invisible work was never measured.',
    maturityStatus: 'working-hypothesis-from-specific-evaluation',
  },
] as const

/** Return a structural pattern by its id. */
export function getStructuralPattern(id: string): StructuralPattern | undefined {
  return STRUCTURAL_PATTERNS.find((p) => p.id === id)
}
