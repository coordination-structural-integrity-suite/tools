/**
 * The seven admissible-use cases for Frame 1 terms.
 *
 * Per the Frame Language: Pre-Replacement Admissibility primitive (Primitives
 * Foundation Layer 1). A Frame 1 term is admissible without replacement in
 * one of seven cases. In all other cases, replacement is required.
 *
 * Source: PFDS Section 2 framework; canonical primitive definition in the
 * Primitives Foundation v0.1.7 Layer 1.
 */

export interface AdmissibilityCase {
  /** Short identifier. */
  id: string
  /** Canonical case name. */
  name: string
  /** What the case admits. */
  description: string
  /** Example usage where this case applies. */
  example: string
}

export const ADMISSIBILITY_CASES: readonly AdmissibilityCase[] = [
  {
    id: 'citation-use',
    name: 'Citation use',
    description:
      'The term is the official name of a specific external entity, framework, or canonical artifact. Using the term to refer to that named thing is citation use, not own-voice adoption.',
    example:
      '"The Open Government Partnership Independent Reporting Mechanism" uses "Reporting Mechanism" as part of the canonical framework name; citation use is admissible.',
  },
  {
    id: 'detection-use',
    name: 'Detection use',
    description:
      'The term names the Frame 1 mechanism being identified through analysis. Using the term to point at what the mechanism is doing structurally is detection use, not endorsement.',
    example:
      '"This document exhibits accountability theater" uses "accountability" to detect a Frame 1 pattern (theater); detection use is admissible.',
  },
  {
    id: 'contextual-description',
    name: 'Contextual description',
    description:
      'The term accurately describes a Frame 1 system being referenced. Used to describe the system as it operates, not to import its frame into own voice.',
    example:
      '"The legacy oversight body operated under Tier 1 impressionistic governance" uses "governance" to describe the legacy system structurally; contextual description is admissible.',
  },
  {
    id: 'developmental-bridge',
    name: 'Developmental bridge',
    description:
      'The term meets the reader at their developmental position before Frame 2 is established. Used to invite readers into the precision vocabulary from the vocabulary they already know.',
    example:
      'The Reader\'s Bridge document uses Frame 1 terms as the entry vocabulary then translates to Frame 2; developmental bridge use is admissible.',
  },
  {
    id: 'naming-the-stage',
    name: 'Naming the stage',
    description:
      'The term accurately names a developmental stage. Used to describe what stage something is at, not to endorse the stage as completion.',
    example:
      '"Tier 1 Impressionistic" (in the Lenses Framework Calibration Tier) names a stage; naming-the-stage use is admissible.',
  },
  {
    id: 'communication-medium',
    name: 'Communication medium',
    description:
      'The term is necessary for structural purposes with a Frame 1 audience. Used because the audience cannot yet receive the Frame 2 form; the structural compromise is named.',
    example:
      'A grant application narrative that uses "stakeholder" because the funder\'s template requires that field; communication-medium use is admissible with explicit acknowledgment.',
  },
  {
    id: 'documentary-record',
    name: 'Documentary record',
    description:
      'The term appears in a quotation or cited source. Used in quotation marks or block quotes; the source\'s use of the term is preserved as documentary record.',
    example:
      '"The Foundation\'s 2024 report claims \'stakeholder engagement\' as a primary mechanism" preserves the source\'s usage; documentary record use is admissible.',
  },
] as const

/** Return an admissibility case by id. */
export function getAdmissibilityCase(id: string): AdmissibilityCase | undefined {
  return ADMISSIBILITY_CASES.find((c) => c.id === id)
}

/** Return all admissibility case ids. */
export function getAllAdmissibilityCaseIds(): readonly string[] {
  return ADMISSIBILITY_CASES.map((c) => c.id)
}
