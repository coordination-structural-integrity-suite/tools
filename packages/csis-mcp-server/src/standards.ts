/**
 * The ten standards of the Coordination Structural Integrity Suite.
 *
 * GENERATED from standards/machine-readable/csis-registry.json by
 * standards/tools/generate-csis-manifest.py. Do not edit by hand; edit the
 * registry and regenerate. Full standard text is NOT embedded (substrate
 * discipline); this carries pointers and metadata only.
 */

export type StandardFamily = 'compressive' | 'generative'

export interface CsisStandard {
  name: string
  id: string
  family: StandardFamily
  version: string
  githubPath: string
  description: string
}

export const STANDARDS: readonly CsisStandard[] = [
  {
    name: "Precision-First Design Standard",
    id: "pfds",
    family: "compressive",
    version: "2.4.3",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-precision-first-2_4_3.md",
    description: "The suite meta-standard. Specifies what precision requires across every standard. Precision-First Design is the discipline of keeping instruments precise enough that violations are detectable and compliance meaningful, before deployment, not after a failure has made those questions urgent. Defines two foundational principles: the precision-first invariant (precision deficit and precision imposition as two failure directions of one commitment) and Method-Structure Congruence (the epistemic method used must match the structural character of what is being known; congruence deficits are self-concealing because the absent content leaves no gap marker). Nine corollaries, the precision review checklist, and obligation loop tier requirements.",
  },
  {
    name: "Adverse-Signal Engagement Principle Core Standard",
    id: "asep",
    family: "compressive",
    version: "0.7.13",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-adverse-signal-engagement-0_7_13.md",
    description: "Specifies how coordination systems engage with signals that contradict their current model. Defines what counts as an adverse signal, the three-phase processing loop, and the requirement that adverse signals not be processed as noise or threat but as structural information.",
  },
  {
    name: "Coordination Scaling Standard",
    id: "css",
    family: "compressive",
    version: "0.1.5",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-coordination-scaling-0_1_5.md",
    description: "Specifies how rigor scales with coordination context. Provides the calibration framework that determines what evidence pressure is appropriate for what scale of public impact claim.",
  },
  {
    name: "Information Asymmetry Classification Standard",
    id: "iacs",
    family: "compressive",
    version: "0.1.28",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-information-asymmetry-0_1_26.md",
    description: "Classifies the six information asymmetry classes (positional, temporal, interpretive, relational, complexity, omission) and specifies what each requires structurally.",
  },
  {
    name: "Regenerative Obligation Standard",
    id: "ros",
    family: "compressive",
    version: "0.1.8",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-regenerative-obligation-0_1_8.md",
    description: "Specifies that extraction from contributors must be matched by regenerative return that is non-fungible, proximate, and embedded in the relationship that generated it. Obligation flows in lineage and ecological directions.",
  },
  {
    name: "Structural Consent Legibility Standard",
    id: "scls",
    family: "compressive",
    version: "0.3.25",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-structural-consent-0_3_25.md",
    description: "Specifies the conditions under which consent in a coordination system is structurally legible: consent is specified to particular acts and parties, standing is distributed to all parties who bear costs, and the consent act itself is verifiable rather than assumed.",
  },
  {
    name: "Structural Power Obligation Standard",
    id: "spos",
    family: "compressive",
    version: "0.1.26",
    githubPath: "tensegrity-suite/compressive/standards/standards-3_0-structural-power-obligation-0_1_26.md",
    description: "Specifies that power in a coordination system must be matched by obligation directions running in multiple directions toward all cost-bearing parties. Power concentration is precisely defined as power without obligation.",
  },
  {
    name: "Conflict Transformation Standard",
    id: "cts",
    family: "generative",
    version: "0.2.10",
    githubPath: "tensegrity-suite/generative/standards/standards-3_0-conflict-transformation-0_2_10.md",
    description: "Specifies that conflicts in a coordination system must be engageable at less than their full intensity before they reach termination thresholds. Requires graduated engagement architecture and the structural capacity to hold conflict as information rather than process it as a binary.",
  },
  {
    name: "Four Batteries Capacity Standard",
    id: "fbcs",
    family: "generative",
    version: "0.3.7",
    githubPath: "tensegrity-suite/generative/standards/standards-3_0-four-batteries-capacity-0_3_7.md",
    description: "Specifies the four capacity dimensions that sustain coordination work: Mission battery, Contribution battery, Relational battery, and a fourth. Requires that depletion in any dimension be reportable as a structural condition rather than left as a private experience.",
  },
  {
    name: "Sensemaking Standard",
    id: "sms",
    family: "generative",
    version: "1.1.23",
    githubPath: "tensegrity-suite/generative/standards/standards-3_0-sensemaking-1_1_23.md",
    description: "Specifies the structural conditions for sensemaking in a coordination system: disruption-occasioned, action-entangled, sufficiency-oriented, and particular-to-general. Requires that disruption events open as questions the system needs to answer rather than be processed as resolved.",
  },
] as const

export function getStandardById(id: string): CsisStandard | undefined {
  return STANDARDS.find((s) => s.id === id)
}

export function getStandardsByFamily(family: StandardFamily): CsisStandard[] {
  return STANDARDS.filter((s) => s.family === family)
}

export function getStandardGithubUrl(standard: CsisStandard): string {
  return `https://github.com/coordination-structural-integrity-suite/suite/blob/main/${standard.githubPath}`
}
