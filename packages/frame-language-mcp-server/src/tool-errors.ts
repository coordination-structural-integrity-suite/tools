/**
 * Tool error boundary.
 *
 * Without this, a Zod validation failure propagates out of the call handler and
 * the MCP SDK reports it as a JSON-RPC protocol error carrying a raw issue
 * array. A caller then receives a transport failure containing a JSON dump
 * instead of a tool result it can read and correct.
 *
 * A malformed argument is a fault in the call, not in the protocol. It belongs
 * in the tool result as `isError: true` with a message the caller can act on,
 * which is also what lets a model retry rather than abandon the call.
 */

import { ZodError } from 'zod'

/** Render a Zod issue as one readable line. */
function describeIssue(issue: ZodError['issues'][number]): string {
  const path = issue.path.length > 0 ? issue.path.join('.') : '(root)'
  return `${path}: ${issue.message}`
}

/**
 * Convert any error thrown by a tool handler into a tool result.
 *
 * Validation failures are reported per argument, so the caller learns which
 * argument was wrong and why, rather than receiving the whole issue array.
 *
 * The return type is inferred rather than annotated: the SDK's result union is
 * narrower than a hand-written interface and rejects one.
 */
export function toolError(err: unknown, toolName: string) {
  if (err instanceof ZodError) {
    const lines = err.issues.map(describeIssue)
    const text = [
      `Invalid arguments for ${toolName}.`,
      ...lines.map((l) => `  ${l}`),
      '',
      'Correct the arguments and call the tool again.',
    ].join('\n')
    return { content: [{ type: 'text', text }], isError: true }
  }

  const message = err instanceof Error ? err.message : String(err)
  return {
    content: [{ type: 'text', text: `${toolName} failed: ${message}` }],
    isError: true,
  }
}

/**
 * Provenance stamp attached to every successful tool result.
 *
 * These tools emit judgments that rest on encoded standards, and ORE's exposure
 * obligation applies to them as much as to anything else: an output that rests
 * on ingested material declares what it rests on. Without this, a verdict is
 * unattributable once a standard moves, and a caller cannot tell which edition
 * judged them.
 */
export interface Provenance {
  server: string
  serverVersion: string
  /** Standard or registry versions this response was produced against. */
  encodes: Record<string, string>
}

/**
 * Attach provenance to a tool result whose text payload is JSON.
 *
 * Results that are not JSON are returned untouched rather than mangled, and a
 * result already carrying provenance is left alone.
 */
export function stampProvenance<T>(result: T, provenance: Provenance): T {
  const r = result as unknown as {
    content?: Array<{ type: string; text: string }>
    isError?: boolean
  }
  if (r?.isError === true) return result
  const first = r?.content?.[0]
  if (!first || first.type !== 'text' || typeof first.text !== 'string') return result

  let payload: unknown
  try {
    payload = JSON.parse(first.text)
  } catch {
    return result
  }
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    return result
  }
  if ('_provenance' in (payload as Record<string, unknown>)) return result

  const stamped = { ...(payload as Record<string, unknown>), _provenance: provenance }
  first.text = JSON.stringify(stamped, null, 2)
  // A tool that declares an outputSchema must also return the structured value,
  // otherwise a validating client has a contract it cannot check against.
  ;(r as Record<string, unknown>)['structuredContent'] = stamped
  return result
}

/**
 * Output-schema support.
 *
 * A tool that declares an outputSchema tells a client what shape to expect and
 * lets it validate what arrives. The schemas here were derived by calling every
 * tool and recording the keys it actually returns, not by reading the handlers,
 * so they describe behaviour rather than intent.
 *
 * `additionalProperties` stays true deliberately: these responses carry
 * explanatory fields that evolve with the standards, and a closed schema would
 * turn an added note into a validation failure for every client.
 */
export function outputSchemaFor(keys: readonly string[]): Record<string, unknown> {
  const properties: Record<string, unknown> = {}
  for (const k of keys) {
    properties[k] = {}
  }
  properties['_provenance'] = {
    type: 'object',
    description:
      'What this response was produced against: the server, its version, and the standard or registry versions encoded.',
    properties: {
      server: { type: 'string' },
      serverVersion: { type: 'string' },
      encodes: { type: 'object', additionalProperties: { type: 'string' } },
    },
    required: ['server', 'serverVersion', 'encodes'],
  }
  return {
    type: 'object',
    properties,
    required: [...keys, '_provenance'],
    additionalProperties: true,
  }
}

/**
 * Attach the declared outputSchema to each tool definition at list time.
 *
 * Kept out of the inline definitions so the schema map stays in one readable
 * place and cannot drift tool by tool.
 */
export function withOutputSchemas<T extends { name: string }>(
  tools: readonly T[],
  schemas: Record<string, readonly string[]>,
): Array<T & { outputSchema?: Record<string, unknown> }> {
  return tools.map((t) => {
    const keys = schemas[t.name]
    return keys ? { ...t, outputSchema: outputSchemaFor(keys) } : { ...t }
  })
}
