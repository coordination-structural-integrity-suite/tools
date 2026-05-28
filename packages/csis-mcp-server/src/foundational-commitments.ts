/**
 * The foundational commitments of the Coordination Structural Integrity Suite.
 *
 * Sourced from PFDS Section 2 and the suite README.
 */

export interface FoundationalCommitments {
  /** The unified principle statement. */
  unifiedPrinciple: string
  /** Why precision and non-harming are one principle, not two. */
  unityExplanation: string
  /** What happens if precision is held without non-harming. */
  precisionWithoutNonHarming: string
  /** What happens if non-harming is held without precision. */
  nonHarmingWithoutPrecision: string
  /** The structural condition the foundation produces. */
  outcome: string
  /** The substrate inheritance hierarchy. */
  inheritanceHierarchy: SubstrateInheritance
}

export interface SubstrateInheritance {
  /** The active normative foundation. Context-dependent: actively constraining during specification design and revision; recedes to background during routine operation of derived systems. */
  csis: string
  /** Methodology derived from CSIS. */
  frameLanguage: string
  /** Applied protocol inheriting from CSIS. */
  poc: string
  /** Applied specialty inheriting from CSIS. */
  crossWalkri: string
  /** The structural principle that inheritance order is independent of chronological order. */
  inheritanceOrderRule: string
}

export const FOUNDATIONAL_COMMITMENTS: FoundationalCommitments = {
  unifiedPrinciple:
    'The Coordination Structural Integrity Suite rests on one foundational principle held internally as two constitutive aspects: precision and non-harming. Per the Precision-First Design Standard, precision is what non-harming requires at the specification layer. They are not two commitments held together externally; they are one commitment that PFDS specifies via transclusion (the broader frame at which both are already fully operative, each making the other more possible rather than less).',
  unityExplanation:
    'Precision and non-harming are the same move described from two positions. Precision is seeing the Innate Totality of what is being engaged with, rather than a preferred seasonal expression. Non-harming is treating the Innate Totality as what it actually is, refusing to exclude any part of it from consideration. The same capacity (contact with the Innate Totality rather than a preferred expression) generates both. The floor and ceiling of the suite arise from one commitment, not two.',
  precisionWithoutNonHarming:
    'Precision without non-harming becomes a control instrument: legibility in service of power rather than protection. Specifications become surveillance; categorization becomes discipline. The form is present; the orientation is inverted.',
  nonHarmingWithoutPrecision:
    'Non-harming without precision becomes an attack surface: the good faith and informal trust that sufficiently adversarial actors exploit most reliably, operating in the spaces where formal instruments have no purchase. The intent is present; the structural form is absent.',
  outcome:
    'Held together (which PFDS defines as one principle via transclusion), they produce the structural conditions under which genuine presence is possible. For people who have been harmed by informality used against them, explicit structure is not a bureaucratic imposition. It is what trust requires before it can be extended again. The precision is the compassion.',
  inheritanceHierarchy: {
    csis: 'CSIS (Coordination Structural Integrity Suite) is the active normative foundation from which derived work inherits its structural integrity requirements. Ten standards: seven Tensegrity Compressive Standards plus three Tensegrity Generative Standards. The relationship between CSIS and what inherits from it is context-dependent: during specification design or revision, CSIS standards actively constrain what can be proposed (a requirement that contradicts a CSIS compressive standard requires CSIS-level resolution before it can be finalized); during routine operation of derived systems, CSIS recedes to background (its constraints were satisfied at specification time). The degree of activity is a function of what is being done with the derived work, not a fixed property of the relationship. Specifications CC BY 4.0; co-released with CROSS (CC0). Repository: github.com/coordination-structural-integrity-suite/suite.',
    frameLanguage:
      'Frame Language is derived from CSIS as the precision methodology. Without CSIS, Frame Language would not exist. Frame Language enacts PFDS Corollary 1 (operational definition) precisely: the Frame 1 to Frame 2 conversion replaces vague vocabulary that fails the independent-observer test with typed vocabulary that passes it. Three frames: Frame 1 access (seasonal expressions); Frame 2 access (conditions and configurations); Frame 3 access (the Innate Totality itself). The gunas are the procedural map of these access levels (tamas, rajas, sattva, trigunatita).',
    poc: 'Proof of Coordination (PoC) is an applied protocol about coordination generally. PoC inherits from CSIS. Chronologically, work on PoC surfaced the need for the CSIS standards. Structurally, CSIS is upstream of PoC. The general truth: inheritance order is independent of chronological development order.',
    crossWalkri:
      'CROSS+WALKRI is one coordination specialty (grants) inheriting from CSIS. It is a sibling of PoC under CSIS, not a child of PoC. Future coordination specialties (AI evaluation, ESG, scientific research integrity, policy evaluation, standards-development meta) will also inherit from CSIS as siblings.',
    inheritanceOrderRule:
      'Inheritance order is structural; chronological order is temporal. They are independent. Even if X was developed before Y in time, Y can be structurally upstream of X. Conflating chronological order with inheritance order is itself a precision failure (the assertion "Y comes from X" is ambiguous between "Y was developed after X" and "Y depends on X structurally"; the precision form names which is meant).',
  },
}
