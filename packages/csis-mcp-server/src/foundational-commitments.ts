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
  /** The root of the body: the one commitment specified by PFDS (precision and non-harming via transclusion). Everything inherits from this. */
  root: string
  /** The CSIS suite: ten standards, with PFDS as root and keystone and the other nine as the coordination floors. Context-dependent normative force. */
  csis: string
  /** The two cross-domain families directly under the root: precision instruments and coordination floors, siblings, neither inheriting from the other. */
  twoFamilies: string
  /** The precision-instrument family: CRAFT and WALKRI. Derived from the root, applied across domains including non-coordination work. */
  precisionInstruments: string
  /** The coordination-floor family: the nine CSIS standards other than PFDS. Inherited by FOCAL domains. */
  coordinationFloors: string
  /** Frame Language: the root's twin articulation, the ontological articulation of the same Frame 3 contact PFDS articulates structurally; not a precision instrument. Its vocabulary discipline (PFDS Corollary 1 at the term layer) is a cross-cutting practice. */
  frameLanguage: string
  /** CRAFT: the one meta-standard, a precision instrument, sibling of the coordination floors under the root; held to consistency with the floors in deployment, not an inheritor of them. */
  craft: string
  /** PoC: a FOCAL domain (general coordination) resting on the coordination floors and held to the precision instruments. */
  poc: string
  /** CROSS+WALKRI: the grants FOCAL domain, resting on the coordination floors and held to the precision instruments. */
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
    root: 'The root of the standards body is the one commitment specified by the Precision-First Design Standard (PFDS): precision and non-harming held as a single move via transclusion. Every standard gets its content by specializing this commitment to a layer or a domain, so the root is genetic rather than positional: trace any standard back through what it specializes and the path ends here. PFDS is itself the specification-layer standing-down of contact with the Innate Totality (Frame 3); the body grounds in that contact, not in any one of its own documents. That contact has two articulations and only one is a standard: PFDS is the structural articulation, and Dimensional Frame Language is the ontological articulation, the access-level reading of how a describer stands to what is described, neither deriving from the other. Frame Language is therefore the root\'s twin rather than a standard or an instrument beneath it. Inheritance order is structural and independent of the order in which standards were written.',
    csis: 'CSIS (Coordination Structural Integrity Suite) is the suite of ten standards in which this body does its normative work: seven Tensegrity Compressive plus three Tensegrity Generative. Within it, PFDS is the root and keystone, and the other nine standards are the coordination floors (see coordinationFloors). CSIS is the active normative foundation in the sense that derived work answers to its root commitment and its coordination floors, context-dependently: during specification design or revision they actively constrain what can be proposed (a requirement that contradicts a compressive standard requires resolution at that standard before it can be finalized); during routine operation they recede to background. Specifications CC BY 4.0; co-released with CROSS (CC0). Repository: github.com/coordination-structural-integrity-suite/suite.',
    twoFamilies:
      'Two cross-domain families stand directly under the root, both inheriting from it and neither inheriting from the other. (1) The precision instruments (CRAFT and WALKRI): PFDS precision worked out into general-purpose tools, holding even for non-coordination, data-heavy work. (2) The coordination floors (the nine CSIS standards other than PFDS): PFDS non-harming worked out into the conditions of human multi-party activity. A lens that mostly holds is that the instruments are the precision face of the one commitment and the floors its non-harming face; it bends, so hold it loosely, because the Sensemaking and Adverse-Signal Engagement standards are coordination floors with strong precision character. The two families are siblings, not a clean partition.',
    precisionInstruments:
      'CRAFT and WALKRI, both inheriting from the root and not from the coordination floors. CRAFT is the one meta-standard of the body, the only instrument whose object is a standard as such; it is held to consistency with the coordination floors in deployment, which is a constitutive relation and not an inheritance one. WALKRI specializes precision to per-axis measurement; its relation to CRAFT is conformance, it satisfies CRAFT\'s instrument-facing conditions rather than inheriting from CRAFT, which is a constitutive relation and not an inheritance one. Both apply across domains, including domains that are not coordination at all. Frame Language is not in this family; it is the root\'s twin articulation (see frameLanguage), and the vocabulary discipline it supplies runs across both instruments and floors as a cross-cutting practice.',
    coordinationFloors:
      'The nine CSIS standards other than PFDS: consent legibility, power obligation, information-asymmetry classification, regenerative obligation, coordination scaling, adverse-signal engagement, and the three generative standards (sensemaking, four-batteries capacity, conflict transformation). They are PFDS non-harming specialized to the conditions of human multi-party activity, and they are inherited by FOCAL domains. A FOCAL domain (Form Of Coordination Activity Locus) is one whose defining activity is multiple parties brought into coordination; the operational test is whether an independent observer can name those parties as the defining feature of the domain. Non-FOCAL work (pure specification or measurement, one party, no consent or exposure of a second party) inherits only the precision instruments.',
    frameLanguage:
      'Frame Language (Dimensional Frame Language) is the root\'s twin articulation, not one of the precision instruments. PFDS articulates contact with the Innate Totality (Frame 3) structurally, as a specification; Frame Language articulates the same contact ontologically, as the access-level reading of how a describer stands to what is described. Neither derives from the other, so the development fact that this work surfaced through coordination practice is not an inheritance fact. What Frame Language supplies the body runs as a cross-cutting practice: the vocabulary discipline that enacts PFDS Corollary 1 (operational definition) at the term layer, the Frame 1 to Frame 2 conversion that replaces vocabulary failing the independent-observer test with vocabulary that passes it, and the decomposition method the per-axis standard uses. Three frames: Frame 1 access (seasonal expressions); Frame 2 access (conditions and configurations); Frame 3 access (the Innate Totality itself). The gunas are the procedural map of these access levels (tamas, rajas, sattva, trigunatita).',
    craft:
      'CRAFT is the one meta-standard of the body, a precision instrument and a sibling of the coordination floors under the root. It inherits the root commitment (precision and non-harming); it does not inherit from the coordination floors. It is separately held to consistency with the coordination floors when it is deployed, which is a constitutive and process relation rather than an inheritance one. CRAFT is built (specification v0.4.0). A FOCAL domain application of CRAFT, for example the grants specialty, inherits the coordination floors and is held to the precision instruments including CRAFT.',
    poc: 'Proof of Coordination (PoC) is a FOCAL domain (general coordination): it rests on the coordination floors and is held to the precision instruments. PoC inherits the floors; chronologically, work on PoC surfaced the need for the CSIS standards, but structurally the root and the floors are upstream of PoC. Inheritance order is independent of chronological development order.',
    crossWalkri:
      'CROSS+WALKRI is the grants FOCAL domain: it rests on the coordination floors and is held to the precision instruments (CROSS is CRAFT applied to grants; WALKRI supplies per-axis quality). It is a sibling of PoC as a domain, not a child of PoC. Future FOCAL domains (AI evaluation, ESG, scientific research integrity, policy evaluation) likewise rest on the floors and are held to the instruments. Standards-development meta-work is not a FOCAL domain: that is CRAFT, a precision instrument already built, a sibling of the coordination floors rather than a domain under them.',
    inheritanceOrderRule:
      'Inheritance order is structural; chronological order is temporal. They are independent. Even if X was developed before Y in time, Y can be structurally upstream of X. Conflating chronological order with inheritance order is itself a precision failure (the assertion "Y comes from X" is ambiguous between "Y was developed after X" and "Y depends on X structurally"; the precision form names which is meant).',
  },
}
