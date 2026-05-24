/**
 * The nine corollaries of the Precision-First Design Standard, plus analogous
 * structural conditions from other CSIS standards where applicable.
 *
 * Sourced from PFDS v2.1.7 Section 2. Each corollary specifies its precision
 * condition in two directions: what under-specification fails to prevent, and
 * what over-specification produces. The full text of each corollary lives in
 * the PFDS standard itself; this data structure provides the structural form
 * and a brief summary for tool access.
 *
 * Per the explicit instruction from Durgadas: when doing PFDS work, read the
 * full standard directly, not derivatives. This data is structural metadata
 * meant for tool lookups and orientation, not for substitution of the source.
 */

export interface PfdsCorollary {
  /** Corollary number 1 through 9. */
  number: number
  /** Canonical name of the corollary. */
  name: string
  /** What the corollary requires structurally. */
  requirement: string
  /** The under-specification failure mode. */
  underSpecificationFailure: string
  /** The over-specification failure mode. */
  overSpecificationFailure: string
  /** Worked example from PFDS Section 4 where applicable. */
  exampleFromPfds: string | null
}

export const PFDS_COROLLARIES: readonly PfdsCorollary[] = [
  {
    number: 1,
    name: 'Operational definition',
    requirement:
      'A term is operationally defined if and only if its presence or absence can be determined by an independent observer using only the definition and observable evidence. Terms that require interpretation by a privileged party are not operationally defined.',
    underSpecificationFailure:
      'When a term is too vague, it cannot be applied consistently. The instrument cannot establish that a violation occurred.',
    overSpecificationFailure:
      'A definition can be too specific. When it excludes genuine cases because they do not match the prescribed form (rather than because they fail the purpose) it trades one precision problem for another. The instrument will miss real instances of what it was built to detect.',
    exampleFromPfds:
      'The Wheel of Consent illustrates the corrective: by decomposing "consent" into a two-axis structure, it makes presence or absence determinable by an independent observer without access to the parties\' intentions. OCAP and CARE apply the same move to "data sovereignty" and "ethical use" respectively.',
  },
  {
    number: 2,
    name: 'Complete taxonomy',
    requirement:
      'A taxonomy is complete if and only if it specifies what falls outside all of its categories. A taxonomy that classifies everything within its stated scope but provides no mechanism for handling edge cases has hidden a precision deficit.',
    underSpecificationFailure:
      'A taxonomy with no procedure for cases that fit no category has hidden a gap.',
    overSpecificationFailure:
      'A taxonomy can also create too many categories. When it imposes more distinctions than the phenomenon actually has, or demands a classification before the information to make it exists, real cases get forced into boxes that do not fit. The taxonomy stops being an instrument for understanding and becomes an obstacle to it.',
    exampleFromPfds:
      'Ostrom\'s eight design principles illustrate the corrective: they replace the holistic judgment "this is well-governed" with a partial order of independently checkable structural conditions, each of which specifies what satisfying and failing to satisfy it looks like.',
  },
  {
    number: 3,
    name: 'Precise detection instrument',
    requirement:
      'A detection instrument is precise if and only if it can distinguish its target state from the most likely false-positive states. An instrument that cannot explain what it would not detect is not precise.',
    underSpecificationFailure:
      'An instrument that cannot specify its false-negative boundary is not precise. It cannot establish what it would fail to detect.',
    overSpecificationFailure:
      'A detection instrument can eliminate every false positive by narrowing its target state; in doing so, it can systematically miss what it was designed to find. Zero false positives and a coordination purpose that goes unserved can coexist.',
    exampleFromPfds:
      'The Adverse-Signal Engagement Principle (ASEP) Core Standard illustrates the corrective: by defining what counts as an adverse signal and what does not, it establishes the false-negative boundary explicitly, making it possible to determine not only what the instrument detects but what it would fail to detect and why.',
  },
  {
    number: 4,
    name: 'Precise coordination process',
    requirement:
      'A coordination process is precise if and only if the conditions for initiating, continuing, and concluding the process are operationally defined. A process that depends on the good judgment of participants at critical junctures has substituted human discretion for structural precision.',
    underSpecificationFailure:
      'Discretion at critical junctures substitutes judgment for structure.',
    overSpecificationFailure:
      'A coordination process can also be too elaborate to use. When its conditions are more demanding than the need they address, parties who genuinely need it cannot get through it. The process is technically complete (every step defined, every condition specified) while the conflict or structural problem it was designed to address remains exactly where it was.',
    exampleFromPfds:
      'Ostrom\'s principles of monitored enforcement and graduated sanctions illustrate the corrective.',
  },
  {
    number: 5,
    name: 'Detection system completeness',
    requirement:
      'A detection system is complete if and only if the failure to respond to a detection output is itself detectable without requiring the cooperation of the party that failed to respond.',
    underSpecificationFailure:
      'A system that can observe a failure but cannot observe its own inaction in the presence of that observation has an undocumented false-negative class at the interface between detection and response.',
    overSpecificationFailure:
      'An escalation mechanism over-specifies when ordinary variation in timing triggers escalation. The result is escalation as background noise: a signal that fires so often it stops being informative.',
    exampleFromPfds:
      'A time-governed escalation mechanism: unacknowledged detection outputs transition through defined states that become progressively more visible and procedurally consequential.',
  },
  {
    number: 6,
    name: 'Specification precise about failure modes (defense in depth)',
    requirement:
      'A specification is precise about its failure modes if and only if no critical property depends on a single defensive mechanism whose failure would leave that property entirely undefended.',
    underSpecificationFailure:
      'A critical property protected by only one mechanism has an undocumented failure mode: the failure of the mechanism itself.',
    overSpecificationFailure:
      'Defensive mechanisms can also pile up past the point of usefulness. When too many overlapping mechanisms protect the same property, they start to contradict each other, generate false violation readings, or collectively impose a burden so heavy that operating the system becomes structurally unachievable. Defense in depth becomes defense through inaccessibility.',
    exampleFromPfds:
      'A layered detection architecture in which each tier operates with different trust assumptions and a different attack surface. The Adverse-Signal Engagement Principle illustrates this at the adverse signal processing layer.',
  },
  {
    number: 7,
    name: 'External falsifiability',
    requirement:
      'A specification is externally falsifiable if and only if its architecture contains no structural mechanism that prevents an independent observer\'s challenge from reaching the precision deficit record.',
    underSpecificationFailure:
      'Internal falsifiability, a claim that those who specified it can verify from within their own framework, does not satisfy the falsifiability requirement of this standard. A system whose precision claims are internally verifiable but structurally insulated from independent challenge has demonstrated self-consistency, not falsifiability.',
    overSpecificationFailure:
      'A challenge pathway can be over-specified too. When mounting a valid challenge requires so many procedural steps that no independent actor with legitimate standing can actually complete one, the pathway exists formally while remaining structurally inaccessible.',
    exampleFromPfds:
      'A specification architecture in which the precision deficit record is reachable by observers who did not produce the specification.',
  },
  {
    number: 8,
    name: 'Descriptive completeness (typological declaration)',
    requirement:
      'A specification is descriptively complete if and only if it declares the classes of description it draws from (operative classes) and names at least one class of description where its vocabulary ends (boundary classes), using a structured list with operative and boundary labels and naming the Descriptive Typology Map version referenced.',
    underSpecificationFailure:
      'A specification can pass all six preceding corollaries within the classes it uses while still containing a structural blind spot: the absence of entire descriptive classes produces no internal signal, because every term defined, every taxonomy bounded, and every detection instrument specified remains within the vocabulary the specification already has.',
    overSpecificationFailure:
      'A typological declaration over-specifies when it claims operative coverage of descriptive classes the specification\'s vocabulary cannot actually support. The scope claim generates expectations no document in that vocabulary can meet.',
    exampleFromPfds:
      'Scientific measurement instruments: an instrument specified with a declared measurement range and resolution limit states both what it measures precisely and the conditions under which its readings become invalid.',
  },
  {
    number: 9,
    name: 'Interpretive precision (contextual baseline)',
    requirement:
      'A detection system is interpretively precise if and only if its assessment architecture requires a contextual baseline statement before initial assessment when identical measurement outputs would indicate structurally distinct conditions requiring different responses.',
    underSpecificationFailure:
      'A system without this requirement has an undocumented false-negative class at the interpretation layer: correct readings for one condition produce incorrect response prescriptions for the other.',
    overSpecificationFailure:
      'A baseline requirement over-specifies when establishing it takes longer than the detection it is meant to enable, or when its conditions are so exact that no real organizational case can satisfy them. The requirement has become the obstacle to what it was supposed to make possible.',
    exampleFromPfds:
      'The structural inheritance statement: an organization\'s current coordination state cannot be accurately classified without knowing the structural conditions it was founded within or inherited.',
  },
] as const

/** Return a corollary by its number (1 through 9). */
export function getPfdsCorollary(number: number): PfdsCorollary | undefined {
  return PFDS_COROLLARIES.find((c) => c.number === number)
}
