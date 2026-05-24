/**
 * The three Frames of Frame Language plus the guna typology that names the
 * procedural texture of operating at each Frame access level.
 *
 * Sourced from `bucket/lens-frameworks/bucket-innate-totality-guna-frame-language-0_1_0.md`
 * (sensemaking-level; April 2026). Frame Language has three frames (not two);
 * the gunas are the procedural map of the structural access levels.
 *
 * Per the Innate Totality primer: precision and non-harming are the same move
 * described from two positions. Frame 3 points toward trigunatita (beyond
 * the three gunas), not toward sattva.
 */

export interface FrameAccessLevel {
  /** Frame number. */
  frame: 1 | 2 | 3
  /** What this frame accesses. */
  access: string
  /** The failure mode at this frame. */
  failure_mode: string
  /** The corresponding guna. */
  guna: {
    name: string
    description: string
    failure: string
  }
}

export interface ThreeFramesData {
  /** The three Frames with their access levels and corresponding gunas. */
  frames: readonly FrameAccessLevel[]
  /** Trigunatita: beyond the three gunas. */
  trigunatita: {
    description: string
    relation_to_sattva: string
    relation_to_frame_3: string
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
      guna: {
        name: 'Tamas',
        description:
          'Density, inertia, fixity. The native mode is resistance to seeing through the present configuration. Not corruption or stupidity; a quality of nature that produces fixity.',
        failure:
          'The plant is dead in winter because the current visible state is taken to be the whole truth.',
      },
    },
    {
      frame: 2,
      access:
        'Conditions the Innate Totality generates: structural requirements, configurations, named arrangements that enable or constrain seasonal expressions. Can hold multiple valid states, adapt given enough time, recognize systemic patterns.',
      failure_mode:
        'Preferred configuration space: these structural arrangements are healthy, those are pathological. Frame 2\'s preference for structural health over pathology is not error - it is Frame 2 doing its job correctly. But the preference is still there and creates a bounded configuration space outside of which Frame 2 cannot assess correctly.',
      guna: {
        name: 'Rajas',
        description:
          'Activity, movement, striving through conditions. Dynamic engagement with the configuration space, named arrangements, response to conditions, adaptation over time. Rajas does the work of Frame 2 correctly.',
        failure:
          'The activity and configuration-preference become the identity rather than the path.',
      },
    },
    {
      frame: 3,
      access:
        'The Innate Totality itself - more precisely, the orientation that can operate from that level rather than from within the expression or the condition. Frame 3 is defined by this access, not merely correlated with it.',
      failure_mode:
        'Identification with the Innate Totality and refusing compositional movement regardless of circumstances. Not abstention or neutrality: claiming the totality as an identity and using that identity to avoid the seasonal expressions the totality is always already making. Attachment to non-attachment is the same failure mode at a more sophisticated register.',
      guna: {
        name: 'Sattva',
        description:
          'Clarity, illumination, balance. The quality that can see the Innate Totality rather than only the expressions or the conditions. Genuinely clearer than rajas or tamas - and the traditional teaching is precise about this.',
        failure:
          'Sattva is itself a guna, still within prakriti (manifest nature). Clinging to sattva is clinging to a quality of nature. Clarity mistaken for completion.',
      },
    },
  ],
  trigunatita: {
    description:
      'Beyond the three gunas. The term the Samkhya tradition uses for what "Innate Totality" is approaching from the structural description side. Not a fourth guna, not a position above the other three. The recognition that holds all three as constitutive expressions of the same whole without being any of them.',
    relation_to_sattva:
      'Frame 3 does NOT point toward sattva as its destination. Frame 3 points toward trigunatita.',
    relation_to_frame_3:
      'The orientation from which tamas, rajas, and sattva are all expressions of the same Innate Totality, with no preferred guna. The Frame 3 access level pointing toward trigunatita is the structural form Frame 3 takes when it is not failing into sattvic attachment.',
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
