/**
 * The Regenerative Claim Audit (Regen Reality Check).
 *
 * A domain-specific extension of the standard Frame Language analysis, run when
 * a document claims to be regenerative, uses "regen" as an identity marker,
 * operates in the Web3 regen space, or presents as a ReFi instrument. The audit
 * runs a set of independent checks; each can fail while the others pass.
 *
 * Source: the Frame Language Interpreter skill
 * (`claude-skill-frame-language-0_1_6.md`, content version 0.1.18),
 * "Regenerative Claim Audit (Regen Reality Check)" section. The checks, the
 * Frame 2 done well vs. imitation contrast, the routing notes, the new Frame 2
 * imitation types, and the trigger conditions are reproduced from that source.
 * The detection_type routing values match the analyzer's RegenClaimSignal and
 * Frame2ImitationSignal union types in `lib/analyze.ts`.
 *
 * Note on count: the section's prose preamble describes "seven independent
 * checks" (the original 0.1.13 set), but the section as it now stands carries
 * nine numbered checks. Checks 8 and 9 were added in skill v0.1.16. All nine
 * are reproduced here.
 */

export interface RegenCheck {
  /** Short identifier. */
  id: string
  /** Check number in the audit (1 through 9). */
  number: number
  /** Canonical check name. */
  name: string
  /** What the check tests for and how to detect a failure, from the skill. */
  description: string
  /**
   * The detection_type / routing value(s) the analyzer uses for findings from
   * this check.
   */
  routing: string
}

export interface RegenImitationType {
  /** Short identifier (matches the analyzer imitation_type value). */
  id: string
  /** Canonical name. */
  name: string
  /** What the pattern is and how it is distinguished from adjacent patterns. */
  description: string
}

/**
 * The Frame 2 done well vs. imitation contrast that prefaces the audit. The
 * operative external-verification test is the heart of the audit.
 */
export const FRAME2_DONE_WELL_VS_IMITATION =
  'Frame 2 done well produces independently evaluable structural conditions: who owes what to whom, through what mechanism, verifiable by any reader without the organization\'s cooperation. Frame 2 imitation produces the feeling of that precision without the substance. The operative test: can a party outside the organization verify this condition from the document alone, without relying on the organization\'s interpretation or cooperation? If not, it is imitation regardless of how structural the vocabulary appears. The sophistication trap applies here specifically: the more rigorous the values framework and the more structural-sounding the vocabulary, the more convincing the imitation, which is why it persists in the ecosystem\'s most thoughtful documents and in the academic frameworks designed to evaluate them. Values alignment and orientation language performing structural description ("we are regenerative," "we operate from living systems principles," "we prioritize relationships") is Frame 2 imitation, not Frame 2 presence.'

/**
 * The routing note from the skill: where audit failures route in the output
 * schema.
 */
export const ROUTING_NOTE =
  'Most failures from this audit route to frame2_imitation_signals with imitation_type: "values_without_grounding". Exceptions: Check 2 (direction/destination confusion) and Check 4 (theory of build) may surface as foreclosed_protections when the vocabulary actively makes the missing structural condition unimaginable. Check 6 (pre-specification identity capture) routes as a slippage_points finding with slippage_class: "aspirational" plus an arrested finding note.'

/**
 * The trigger conditions for running the audit.
 */
export const TRIGGER_CONDITIONS = [
  'The document uses "regenerative," "regen," or "ReFi" as identity or structural claims.',
  'The organization describes itself as part of a regenerative movement.',
  'The document presents a return instrument (credits, tokens, impact certificates) as regenerative.',
] as const

/**
 * The routing cross-reference to the Regenerative Obligation Standard Audit for
 * Check 5 findings.
 */
export const ROS_AUDIT_ROUTING =
  'When Check 5 produces ros_non_conformance findings, the Regenerative Obligation Standard Audit provides the full structural mechanics assessment the Frame Language check cannot complete alone. This check identifies that a return architecture fails non-fungibility, proximity, or embeddedness at the vocabulary level; the ROS audit determines whether the underlying mechanics satisfy the three validity conditions and whether failures are categorical (instrument architecture wrong) or addressable through adjustment. The two instruments assess different layers and can each fail independently. Run both when the document makes regenerative claims about its return architecture.'

export const REGEN_CHECKS: readonly RegenCheck[] = [
  {
    id: 'identity-vs-structure',
    number: 1,
    name: 'Identity vs. Structure',
    description:
      'Is "regenerative" describing who the organization is, or what its internal mechanics do? Identity use is Class D2 performative vocabulary. Detection: does "what makes this regenerative?" produce values, orientations, or community memberships, or independently evaluable structural conditions?',
    routing: 'identity_marker',
  },
  {
    id: 'direction-vs-destination',
    number: 2,
    name: 'Direction vs. Destination',
    description:
      'Does the document describe regeneration as what is funded externally (destination) or how internal extraction and return mechanics operate (direction)? The Regenerative Obligation Standard applies to direction. A system funding externally regenerative projects while failing the validity conditions for its own contributors is not structurally regenerative. Route as D2 when internal mechanics are absent from the claim.',
    routing: 'direction_destination_confusion',
  },
  {
    id: 'from-specification',
    number: 3,
    name: 'FROM Specification',
    description:
      'Can the document name what is being restored, from what depleted state, through what mechanism? Two distinct failure modes. FROM ABSENT: No FROM is named at all. The document describes what is being built but not what depleted condition it addresses. Route as D2. FROM TOO VAST: A FROM is named, but at a scale that cannot ground any specific intervention. "Ecological collapse," "metacrisis," "extractive capitalism," "the meaning crisis," "legacy systems" name real conditions, but at a scale where any action aligned with the label is automatically strategic. Nothing can be excluded. The test: given this FROM, what would the organization NOT build, and who would NOT be served? If the FROM cannot answer that question (if everything plausible in the regen space remains equally justified) the FROM is too vast to be operational. This is the more structurally significant failure: the organization believes it has a diagnosis because a real condition was named. The absence of felt gap makes correction harder. Route as D2 with a note distinguishing vast FROM from absent FROM. The correction is not "name a FROM" but "narrow the FROM to a scale at which specific interventions can be excluded."',
    routing: 'from_specification_gap (FROM absent); vast_from (FROM too vast)',
  },
  {
    id: 'theory-of-change-vs-theory-of-build',
    number: 4,
    name: 'Theory of Change vs. Theory of Build',
    description:
      'Does the document specify the mechanism connecting infrastructure to regenerative outcomes, or assume outcomes follow from the infrastructure? Detection: remove the infrastructure from the argument. Does the outcome claim retain support? If not, the document is theory of build. Route as D2.',
    routing: 'theory_of_build',
  },
  {
    id: 'regenerative-obligation-conformance',
    number: 5,
    name: 'Regenerative Obligation Conformance',
    description:
      'Does the return architecture satisfy non-fungibility, proximity, and embeddedness simultaneously? Check for categorical disqualifiers: additionality logic, SROI aggregation, temporal deferral trap (Stance B declarations substituted for proximate return delivery). Route non-conformant instruments as D2 imitation of the embeddedness or proximity conditions.',
    routing: 'ros_non_conformance',
  },
  {
    id: 'pre-specification-identity-capture',
    number: 6,
    name: 'Pre-specification Identity Capture',
    description:
      'Has "regenerative" acquired identity weight before structural conditions were specified? Apply the identity formation arc test: can the community state structural requirements for the term without defensiveness? If not, note as arrested D2 finding. Cultural architecture work is required alongside vocabulary work; forcing specification triggers defensive consolidation.',
    routing: 'identity_capture',
  },
  {
    id: 'temporal-deferral',
    number: 7,
    name: 'Temporal Deferral',
    description:
      'Is the organization claiming regenerative stance while deferring structural regenerative work indefinitely? Detection: does the claim use present-tense language but describe future-conditional conditions? Temporal deferral in regenerative claims appears as pledges, visions, and Stance B declarations without a current proximate return architecture. Route as D2.',
    routing: 'temporal_deferral',
  },
  {
    id: 'financial-conversion',
    number: 8,
    name: 'Financial Conversion',
    description:
      'Does the document explicitly reframe a product purchase, membership fee, or service payment as a regenerative investment without specifying the return architecture that would make the investment claim valid? Detection: language that names a financial exchange as something other than what it is: "you are not paying for a learning journey; you are contributing to Earth\'s regeneration through this planetary network." Non-fungibility, proximity, and embeddedness are all absent; mission identity substitutes for structural return architecture. Distinct from Check 5 ros_non_conformance in that the product relationship is explicitly named and then denied rather than simply unaddressed. Route as D2, detection_type: financial_conversion.',
    routing: 'financial_conversion',
  },
  {
    id: 'commons-without-governance',
    number: 9,
    name: 'Commons Without Governance',
    description:
      'Does the document describe building a commons (shared resource pool, collective knowledge system, network infrastructure, community learning system) without applying the structural conditions under which commons succeed? Detection: commons-building vocabulary (shared resources, collective learning, distributed network, pooled resources, learning exchange) present alongside absence of: (1) clearly defined membership boundaries specifying who participates and on what terms; (2) monitoring architecture by accountable parties; (3) graduated response mechanisms; (4) accessible conflict resolution mechanisms. Absence of any two or more constitutes the finding. This is not theory_of_build; it is specifically the commons institutional form being constructed without the empirically established structural conditions for that form. Route as D2, detection_type: commons_without_governance.',
    routing: 'commons_without_governance',
  },
] as const

/**
 * The three additional Frame 2 imitation types added 2026-05-13. These now fire
 * in the standard Frame 2 imitation check, not only in the regen audit.
 */
export const REGEN_IMITATION_TYPES: readonly RegenImitationType[] = [
  {
    id: 'propagation_without_feedback',
    name: 'Propagation without feedback',
    description:
      'An organization explicitly excludes detection or feedback architecture from its strategy, justified by the complexity or scale of the problem. Distinct from theory_of_build in that the absence is named as a feature, not an oversight. Canonical form: "We cannot know which seeds will germinate, therefore we do not try to detect which ones do." The vast_from typically provides the justification. Route as propagation_without_feedback.',
  },
  {
    id: 'governance_deferral',
    name: 'Governance deferral',
    description:
      'Governance architecture explicitly deferred to after network or community formation rather than constituted before it. Canonical form: "The network will establish its own governance and coordination mechanisms among the members." Route as governance_deferral.',
  },
  {
    id: 'sovereignty_without_derivation',
    name: 'Sovereignty without derivation',
    description:
      'A value (sovereignty, freedom, regeneration, autonomy) asserted as foundational without specifying the structural and social conditions from which it derives. The FROM is the value itself, making the derivation circular. Distinct from from_specification_gap (absent FROM) in that the FROM is present but self-referential. Route as sovereignty_without_derivation.',
  },
] as const

/** Return a regen check by id. */
export function getRegenCheck(id: string): RegenCheck | undefined {
  return REGEN_CHECKS.find((c) => c.id === id)
}

/** Return all regen check ids. */
export function getAllRegenCheckIds(): readonly string[] {
  return REGEN_CHECKS.map((c) => c.id)
}
