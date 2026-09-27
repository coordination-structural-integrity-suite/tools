/**
 * The three Frames of Dimensional Frame Language, with the three capacities
 * whose ratio sets each frame.
 *
 * Sourced from the Dimensional Frame Language map (canonical, internal version
 * 0.2.0), section "The three capacities": three capacities (Suppression,
 * Projection, Perception) run in every perception and none is ever at zero; a
 * frame is set by which dominates. The vocabulary is operational English; the
 * source tradition's terms (the three gunas, trigunatita) appear only as
 * citations, never as operative field values.
 *
 * Per the Innate Totality primer: precision and non-harming are the same move
 * described from two positions. Frame 3 points toward the no-preference
 * orientation, not toward the highest capacity.
 */

export interface FrameAccessLevel {
  /** Frame number. */
  frame: 1 | 2 | 3
  /** What this frame accesses. */
  access: string
  /** The failure mode at this frame. */
  failure_mode: string
  /** The capacity ratio that sets this frame. */
  capacities: {
    dominance: string
    description: string
    failure: string
  }
}

export interface ThreeFramesData {
  /** The three Frames with their access levels and capacity ratios. */
  frames: readonly FrameAccessLevel[]
  /** The three capacities: what they are and the never-zero floor. */
  three_capacities: {
    description: string
    source_note: string
  }
  /** The orientation Frame 3 points toward. */
  no_preference_orientation: {
    description: string
    relation_to_perception: string
    source_note: string
  }
  /** Innate Totality: the dynamic whole. */
  innate_totality: string
  /** Precision and non-harming as one move. */
  precision_and_non_harming: string
  /** The nested failure mode structure. */
  nested_failure_structure: string
  /** Bridge vocabulary note. */
  bridge_vocabulary_note: string
}

export const THREE_FRAMES: ThreeFramesData = {
  frames: [
    {
      frame: 1,
      access:
        'Seasonal expressions: what is visible and measurable at the surface. Frame 1 takes this access to be complete. The root system is invisible or unrecognized as the continuing thing.',
      failure_mode:
        'Preferred direction: this passes or fails; this season is life and that one is death. The whole truth is not accessible from this level.',
      capacities: {
        dominance:
          'Suppression and Projection alternate in dominance, the ordinary swing between dullness and agitation; Perception is present but not steering.',
        description:
          'Projection fashions a ready-made object from a suppressed surface, so precision is structurally absent. The rope is veiled and a snake is projected onto it: the raw perception is incomplete but not wrong, and the projection fills the gap.',
        failure:
          'The vivid projection is taken for the whole truth: the plant is dead in winter because the current visible state is taken to be all there is.',
      },
    },
    {
      frame: 2,
      access:
        'Conditions the Innate Totality generates: structural requirements, configurations, named arrangements that enable or constrain seasonal expressions. Can hold multiple valid states, adapt given enough time, recognize systemic patterns.',
      failure_mode:
        'Preferred configuration space: these structural arrangements are healthy, those are pathological. Frame 2\'s preference for structural health over pathology is not error - it is Frame 2 doing its job correctly. But the preference is still there and creates a bounded configuration space outside of which Frame 2 cannot assess correctly.',
      capacities: {
        dominance:
          'Projection dominates, grounded by enough Perception to fashion valid structure.',
        description:
          'The buildable structural domain, where coordination instruments are made. Building reaches no higher than Frame 2: you cannot compose your way to the source.',
        failure:
          'Perceptual clarity misattaches, fastening onto the vocabulary or the instrument rather than looking through it at the conditions and the cost-bearing parties; the preferred configuration becomes the identity rather than the path.',
      },
    },
    {
      frame: 3,
      access:
        'The Innate Totality itself - more precisely, the orientation that can operate from that level rather than from within the expression or the condition. Frame 3 is defined by this access, not merely correlated with it.',
      failure_mode:
        'Identification with the Innate Totality and refusing compositional movement regardless of circumstances. Not abstention or neutrality: claiming the totality as an identity and using that identity to avoid the seasonal expressions the totality is always already making. Attachment to non-attachment is the same failure mode at a more sophisticated register.',
      capacities: {
        dominance: 'Almost pure Perception.',
        description:
          'Pointed toward, never specified. What it points toward is the no-preference orientation, not Perception itself: the highest capacity is still a capacity.',
        failure:
          'Full clarity present and compositional movement refused: the seeing treated as a sufficient response. Clinging to the clarity of Perception is still clinging to a capacity, clarity mistaken for completion.',
      },
    },
  ],
  three_capacities: {
    description:
      'Three capacities run in every perception, in some ratio, and the ratio sets the frame. Suppression reduces the clarity of what is present. Projection throws a plausible, ready-made object onto the suppressed surface. Perception recognizes the actual conditions. All three run in every perception and none is ever at zero; a frame is set by which dominates, not by any being absent. A frame blind to a capacity runs it unrecognized, not absent. Resolution is by illumination, not repair: seeing rightly dissolves a projection rather than patching it, which is why disconfirmation is the structural antidote.',
    source_note:
      'These are the operational names for what the source tradition calls the three gunas, read as the working of the conditioned field (an Advaita reading; the gunas as such are Samkhya): Suppression the veiling power, Projection the projecting power, Perception the revealing. The source terms are citations here, not the operative vocabulary.',
  },
  no_preference_orientation: {
    description:
      'Holding the three capacities without preferring any. Not a fourth capacity and not a position above the other three; the recognition that holds all three as expressions of the same whole without being any of them.',
    relation_to_perception:
      'Frame 3 does not point toward Perception as its destination. The failure structure is nested: a preferred direction in Frame 1, a preferred configuration in Frame 2, a preferred position in Frame 3, each harder to detect from inside.',
    source_note: 'The source tradition names this orientation trigunatita, beyond the three gunas.',
  },
  innate_totality:
    'The whole of what a given object of consideration is, prior to and inclusive of all its expressions. Not a static set of properties but a dynamic unity. Innate (not constructed, not achieved). Totality (includes all expressions and their apparent opposites). Together: prior to any of its manifestations but includes all of them as the thing it is.',
  precision_and_non_harming:
    'Precision and non-harming are the same move described from two positions. Precision is seeing the Innate Totality of what is being engaged with, rather than a preferred seasonal expression. Non-harming is treating the Innate Totality as what it actually is, refusing to exclude any part of it from consideration. The same capacity (contact with the Innate Totality rather than a preferred expression) generates both. PFDS\'s transclusion language gets a structural mechanism here.',
  nested_failure_structure:
    'The three Frames have a nested failure mode structure in which the same error occurs at progressively higher levels of abstraction. Frame 1 has a preferred direction; Frame 2 has a preferred configuration space; Frame 3 (when it fails) has a preferred ontological position. Each failure mode is a more sophisticated version of the same structural event: taking a position relative to the cycle rather than being what holds the cycle. Every move toward Frame 3 creates a more sophisticated version of the thing being transcended, and the sophistication makes the failure mode harder to detect from inside.',
  bridge_vocabulary_note:
    'Frame 1 and Frame 2 are bridge vocabulary in some contexts (e.g., PoC normative documents use Multiplex/Uniplex as canonical for coordination architecture frames; Frame 1/Frame 2 are practitioner-facing bridge terms there). At the Frame Language substrate level, Frame 1/2/3 are canonical. Within CROSS+WALKRI applied work, Frame 1/Frame 2 are used as substrate vocabulary; whether to upgrade to Uniplex/Multiplex or other terms is a CROSS+WALKRI-specific decision.',
}
