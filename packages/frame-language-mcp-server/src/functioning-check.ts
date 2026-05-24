/**
 * The eight failure modes of the Frame 2 Functioning Check.
 *
 * Per the Frame Language: Frame 2 Functioning Check primitive (Primitives
 * Foundation Layer 1). A term expressed in Frame 2 vocabulary may still
 * fail to function as Frame 2. These are the eight ways failure occurs.
 *
 * The corollary failure modes in the Falsifiability Architecture document
 * apply the same eight modes to falsifiability claims specifically.
 */

export interface FunctioningCheckMode {
  /** Short identifier. */
  id: string
  /** Canonical mode name. */
  name: string
  /** What the failure mode is structurally. */
  description: string
  /** Example pattern that triggers this mode. */
  example: string
  /** Falsifiability-context variant from the Falsifiability Architecture document. */
  falsifiability_variant: string
}

export const FUNCTIONING_CHECK_MODES: readonly FunctioningCheckMode[] = [
  {
    id: 'transcendence-claim',
    name: 'Transcendence Claim',
    description:
      'The language claims to escape the conditions it operates within. The form is Frame 2 but the substance asserts the speaker has gone beyond the structural constraints that apply.',
    example:
      '"Our model is too holistic for traditional metrics" - asserts transcendence of measurement; the structural constraints still apply.',
    falsifiability_variant:
      'The claim asserts it has escaped the falsifiability constraints it operates within ("our outcomes are too systemic to be measured against pre-committed indicators"). Remediation: name the systemic outcome at the ecosystem-shift mechanism type; commit to impact evidence scope; accept contribution stance with named causal pathway.',
  },
  {
    id: 'declaration-exploit',
    name: 'Declaration Exploit',
    description:
      'The act of naming a commitment is treated as evidence of the commitment. Form: declaring something is taken to mean doing it.',
    example:
      '"We are committed to transparency" - the declaration is the entire commitment; no structural form follows.',
    falsifiability_variant:
      'The act of declaring a falsifiable commitment is treated as evidence the commitment is falsifiable ("our round configuration declares the indicators; that declaration is itself the falsifiability"). Remediation: declarations are pre-commitment instruments but do not satisfy verification source, drift detection, or disclosure obligation by themselves.',
  },
  {
    id: 'precision-facade',
    name: 'Precision Facade',
    description:
      'The language appears specific but the specificity does not carry operational content. Numbers without units; thresholds without conditions; named metrics without definitions.',
    example:
      '"Grantees achieve 23.7% improvement" - precise-looking but the metric is not operationally defined.',
    falsifiability_variant:
      'The claim appears specific but the specificity does not carry falsifiability content ("a 23.7% improvement in the named metric" where the metric is not actually defined or measured by an independent source). Remediation: precision is necessary but not sufficient; precision must be backed by named verifying source and named drift detection.',
  },
  {
    id: 'partial-instantiation',
    name: 'Partial Instantiation',
    description:
      'A Frame 2 structure is partially implemented while a Frame 1 assumption does the remaining work. Some elements named; others assumed.',
    example:
      'A grant program names operational definitions for outputs but leaves outcomes as "stakeholder-judged" without a stakeholder mechanism specification.',
    falsifiability_variant:
      'A falsifiability structure is partially implemented while an unfalsifiable assumption does the remaining work (pre-commitment published; verifying source named; drift detection left to grantee self-report). Remediation: name the missing element explicitly. Partial form is admissible if documented.',
  },
  {
    id: 'direction-without-destination',
    name: 'Direction Without Destination',
    description:
      'The language names motion toward a goal without specifying the goal. The direction is invoked but the destination is unstated.',
    example:
      '"Working toward systemic change" - direction named; what would count as systemic change is unstated.',
    falsifiability_variant:
      'The claim names motion toward an outcome without specifying the outcome ("the program will strengthen the ecosystem"). Remediation: name the destination per Obligation Mode entry-gate requirement. A directional claim with no destination cannot be falsified.',
  },
  {
    id: 'vocabulary-without-architecture',
    name: 'Vocabulary Without Architecture',
    description:
      'Frame 2 terms are used without the structural requirements Frame 2 implies. The words appear; the form does not.',
    example:
      'A document uses "operationally defined" without applying the independent-observer test to the operational definitions.',
    falsifiability_variant:
      'Falsifiability vocabulary is used without the structural requirements falsifiability implies (a framework described as operating at Tier 5 Falsifiable but lacking any of the four elements). Remediation: vocabulary use must be backed by structural elements.',
  },
  {
    id: 'correct-map-wrong-territory',
    name: 'Correct Map / Wrong Territory',
    description:
      'Frame 2 language accurately describes a different context but not the one it is applied to. The map is precise; it just is not the map of this place.',
    example:
      'A coordination protocol imports the precision-first invariant from a regulatory context but operates under voluntary publication without the regulatory infrastructure.',
    falsifiability_variant:
      'Falsifiability language accurately describes a different context but not the one it is applied to (importing falsifiability from regulatory context to voluntary publication without naming the structural difference). Remediation: name the territory the falsifiability claim operates in; do not import vocabulary from a different territory without naming the structural difference.',
  },
  {
    id: 'frozen-map',
    name: 'Frozen Map',
    description:
      'Frame 2 language that was accurate at specification has not been updated as conditions changed. The form was once aligned; it no longer is.',
    example:
      'A specification cites an API endpoint as the verifying source; the endpoint has since been deprecated; the specification has not been updated.',
    falsifiability_variant:
      'Falsifiability language that was accurate at specification has not been updated as conditions changed (a verifying source has changed its API or publication mechanism, making it no longer queryable as specified). Remediation: per Element 2, the verifying source must remain queryable; changes to source availability require updates to the configuration.',
  },
] as const

/** Return a functioning check mode by id. */
export function getFunctioningCheckMode(id: string): FunctioningCheckMode | undefined {
  return FUNCTIONING_CHECK_MODES.find((m) => m.id === id)
}

/** Return all mode ids. */
export function getAllFunctioningCheckModeIds(): readonly string[] {
  return FUNCTIONING_CHECK_MODES.map((m) => m.id)
}
