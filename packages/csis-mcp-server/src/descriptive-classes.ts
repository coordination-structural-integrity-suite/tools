/**
 * The six descriptive classes from the Descriptive Typology Map.
 *
 * Referenced by PFDS Corollary 8: a specification declares which classes it
 * draws from (operative classes) and at least one class where its vocabulary
 * ends (boundary classes). This enables independent observers to audit
 * what the specification cannot see.
 */

export interface DescriptiveClass {
  /** Short identifier. */
  id: string
  /** Canonical name. */
  name: string
  /** What this class characterizes. */
  characterizes: string
  /** What this class does NOT characterize (the boundary). */
  boundary: string
}

export const DESCRIPTIVE_CLASSES: readonly DescriptiveClass[] = [
  {
    id: 'structural-mechanical',
    name: 'Structural-mechanical',
    characterizes:
      'Load-bearing and tension-distribution properties of coordination structures. Whether structural elements are adequate to sustain the coordination forces they carry.',
    boundary:
      'Semantic and definitional precision; subjective experience of operating under the structure; how structures respond to temporal pressure patterns.',
  },
  {
    id: 'temporal-dynamic',
    name: 'Temporal-dynamic',
    characterizes:
      'How coordination structures respond to the temporal pattern of pressure. The rhythm and frequency dynamics of coordination forces. Frequency-dynamic sub-aspect is particularly load-bearing.',
    boundary:
      'The structure and magnitude of specification requirements; the load-bearing properties of structural elements at rest.',
  },
  {
    id: 'epistemic-perceptual',
    name: 'Epistemic-perceptual',
    characterizes:
      'What makes a term operationally defined, a claim falsifiable, a taxonomy complete, and a detection instrument distinguishable from its most likely false positives. The precision and operationalization sub-aspect is where PFDS primarily operates.',
    boundary:
      'The felt experience of operating under epistemically precise instruments; the structural load-bearing properties of mechanisms.',
  },
  {
    id: 'relational-topological',
    name: 'Relational-topological',
    characterizes:
      'Coordination process structure: the conditions under which a coordination process is precisely specifiable and a detection system is structurally complete relative to the roles required to respond to it.',
    boundary:
      'The substantive content of relations (what kind of relationship exists); the felt experience of participating in the coordination process.',
  },
  {
    id: 'felt-experience',
    name: 'Felt-experience',
    characterizes:
      'The subjective quality of operating under a coordination instrument. Whether a specification feels fair, transparent, or well-designed to those who use it.',
    boundary:
      'Structural accessibility of protection (which IS inside scope of PFDS Section 2 ceiling direction); the structural-mechanical, temporal-dynamic, epistemic-perceptual, and relational-topological properties of the coordination instrument.',
  },
  {
    id: 'action-structural',
    name: 'Action-structural',
    characterizes:
      'The structural properties of actions that coordination instruments structure. The causal architecture of coordination actions: how actions produce their effects at the structural level.',
    boundary:
      'Semantic and definitional precision of the instrument; the load-bearing properties of the structures the actions operate within.',
  },
] as const

/** Return a descriptive class by its id. */
export function getDescriptiveClass(id: string): DescriptiveClass | undefined {
  return DESCRIPTIVE_CLASSES.find((c) => c.id === id)
}

/** Return all descriptive class ids. */
export function getAllDescriptiveClassIds(): readonly string[] {
  return DESCRIPTIVE_CLASSES.map((c) => c.id)
}
