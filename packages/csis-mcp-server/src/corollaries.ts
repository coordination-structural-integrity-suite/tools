/**
 * The twelve corollaries of the Precision-First Design Standard, plus analogous
 * structural conditions from other CSIS standards where applicable.
 *
 * Sourced from PFDS v2.5.0 Section 2. Each corollary specifies its precision
 * condition in two directions: what under-specification fails to prevent, and
 * what over-specification produces. The full text of each corollary lives in
 * the PFDS standard itself; this data structure provides the structural form
 * and a brief summary for tool access.
 *
 * Per the substrate discipline: when doing PFDS work, read the full standard
 * directly, not derivatives. This data is structural metadata meant for tool
 * lookups and orientation, not for substitution of the source.
 */

export interface PfdsCorollary {
  /** Corollary number 1 through 12. */
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
  {
    number: 10,
    name: 'Claim-object grounding',
    requirement:
      'An evaluation claim is grounded only when the type of object the claim is about has been declared: either a criterion (a directly observable property, or a property with an established external validation standard) or a construct (an abstract property not directly observable, requiring systematization and proxy specification before measurement can proceed). For construct claims, operational grounding requires a nomological network declaration naming the sub-constructs, the observable criteria that proxy for each, and the expected relationships between them. Coverage adequacy applies to both claim types: the evidence must address the case space the claim requires, not merely declare the evaluation\'s scope limits.',
    underSpecificationFailure:
      'An evaluation claim without a declared claim-object type cannot be assessed for whether the evidence supports it: the evidence standard for criterion claims and construct claims differs structurally. A construct claim without a nomological network declaration has no declared basis for determining whether the measurement is measuring the intended construct or a correlated surface property or a subset of it.',
    overSpecificationFailure:
      'A nomological network requirement that demands complete documentation of all construct relationships before any construct-based evaluation can proceed blocks construct-based assessment entirely. A declared-partial nomological network naming what is established and explicitly identifying the gaps is in a better precision state than an undeclared or absent one, and is the correct operating state when the network is under development.',
    exampleFromPfds: null,
  },
  {
    number: 11,
    name: 'Structural solution over taxonomy',
    requirement:
      'A classification is structurally precise if and only if every category whose membership an independent observer cannot determine from its label and its stated definition alone is rendered as a typed structure carrying the criteria that individuate it, such that membership becomes determinable from structure and observable evidence.',
    underSpecificationFailure:
      'A set of such categories presented as a flat list of labels conceals the individuating criteria; the omission produces no internal signal, because every label remains internally consistent, and a case that matches no category is forced into the nearest one rather than recorded as outside the set. Forcing a case into a category it does not fit is itself a harm.',
    overSpecificationFailure:
      'Imposing typed structure on a set whose categories are exhausted by their labels, a closed set with a reliable negative test where an independent observer can determine membership and non-membership from the label and its stated definition alone, adds apparatus without adding precision.',
    exampleFromPfds:
      'The design principles of Ostrom replace the holistic label "well-governed" with a partial order of independently checkable structural conditions.',
  },
  {
    number: 12,
    name: 'Evolutionary precision (stated revision procedure)',
    requirement:
      'A specification is evolutionarily precise if and only if it states a procedure for its own revision that an independent observer can determine exists: what triggers a revision, who holds standing to initiate one, and how a proposed change is evaluated against the precision criterion.',
    underSpecificationFailure:
      'A specification that assumes it will be maintained but states no revision procedure has left the maintenance obligation implicit and unfalsifiable; an observer cannot determine whether drift is being corrected or silently accumulating, and by the time a deficit forces attention the proportional correction window has closed.',
    overSpecificationFailure:
      'A revision procedure so rigid or costly that proportional change is foreclosed and the only correction left is disruptive replacement: the specification ossifies, and the mechanism meant to maintain its precision becomes the obstacle to maintaining it.',
    exampleFromPfds:
      'PFDS Sections 6.3 and 6.5 convert elapsed time and proposed changes into procedurally consequential, precision-evaluated steps.',
  },
] as const

/**
 * The number of corollaries PFDS defines. Derived from the table above rather
 * than written as a literal: the argument bounds had been left at 9 after a
 * tenth corollary was added, so the tenth was encoded but unreachable.
 */
export const PFDS_COROLLARY_COUNT = PFDS_COROLLARIES.length

/** Return a corollary by its number (1 through 12). */
export function getPfdsCorollary(number: number): PfdsCorollary | undefined {
  return PFDS_COROLLARIES.find((c) => c.number === number)
}
