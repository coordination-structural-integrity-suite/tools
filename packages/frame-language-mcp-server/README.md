# Frame Language MCP Server

MCP server exposing Frame Language precision discipline as AI tools.

Frame Language is the precision methodology derived from the Coordination Structural Integrity Suite (CSIS). It operates substrate-level across PoC, CROSS+WALKRI, and other coordination specialty work that inherits from CSIS. This server makes the discipline operationally available through MCP tools.

## v0.1.0 tools

**check_watchlist(term)**

Check a term against the Frame 1 watchlist. Returns whether the term is on the watchlist, why it imports Frame 1 framing, the canonical replacement pattern, primitive anchors, and common phrasings with their Frame 2 equivalents.

Watchlist terms: accountability, governance, transparency, stakeholder, oversight, compliance, enforcement, legitimacy, empowerment, fiduciary, credibility, mandatory.

**check_admissibility(case_id?)**

Return the seven Pre-Replacement Admissibility cases. A Frame 1 term is admissible without replacement if it matches one of these seven cases. Cases: citation-use, detection-use, contextual-description, developmental-bridge, naming-the-stage, communication-medium, documentary-record.

**frame2_functioning_check(mode_id?)**

Return the eight Frame 2 functioning check failure modes. A term expressed in Frame 2 vocabulary may still fail to function as Frame 2 in one of these ways. Modes: transcendence-claim, declaration-exploit, precision-facade, partial-instantiation, direction-without-destination, vocabulary-without-architecture, correct-map-wrong-territory, frozen-map. Each mode includes a falsifiability-context variant from the Falsifiability Architecture document.

**lookup_three_frames()**

Return the three Frames of Frame Language with the guna typology mapping. Frame 1 (tamas), Frame 2 (rajas), Frame 3 (sattva, pointing toward trigunatita). Includes the Innate Totality framing, the nested failure mode structure, the precision-and-non-harming unity statement, and a note on bridge vocabulary use.

**audit_text(text)**

Scan a block of text for Frame 1 watchlist hits. Returns terms found, occurrence counts, and the watchlist entries. The tool flags terms; user must determine whether each usage is admissible per the seven cases.

## Installation

```bash
pnpm install
pnpm build
pnpm bundle
```

The bundled output is at `server.mjs` for the zero-install path.

### MCP client configuration

For Claude Code:

```bash
claude mcp add frame-language "node /Users/regischapman/frame-language-mcp-server/server.mjs"
```

Or edit your MCP config file directly:

```json
{
  "mcpServers": {
    "frame-language": {
      "command": "node",
      "args": ["/path/to/frame-language-mcp-server/server.mjs"]
    }
  }
}
```

Restart Claude Code for the new server to be picked up.

## Architecture

Single-package TypeScript project. Data files in `src/watchlist.ts`, `src/admissibility.ts`, `src/functioning-check.ts`, and `src/three-frames.ts` hold the structural content. The MCP server in `src/index.ts` wires the data to tool calls.

The substrate discipline requires that substantive substrate work read the full source documents directly rather than substituting summaries. This server provides operational access to the Frame Language discipline; the canonical sources are the Frame Language Grammar and SOP documents in the Methodology folder plus the Frame Language Foundational Vocabulary Specification in the CSIS overview.

## Three frames, not two

Frame Language has THREE frames:
- **Frame 1**: seasonal expressions (the visible surface; guna: tamas)
- **Frame 2**: conditions and configurations (the structural arrangement layer; guna: rajas)
- **Frame 3**: the Innate Totality itself (the orientation that operates from the totality; guna: sattva, pointing toward trigunatita)

This is sharper than the common Frame 1 / Frame 2 binary. The three-frame model is sourced from `bucket/lens-frameworks/bucket-innate-totality-guna-frame-language-0_1_0.md`.

## Precision and non-harming as one move

Per PFDS Section 2 and the Innate Totality primer: precision and non-harming are NOT two principles held together externally. They are the SAME move described from two positions. Precision is seeing the Innate Totality of what is being engaged with; non-harming is treating the Innate Totality as what it actually is. The same capacity generates both.

## License

CC0-1.0. Substrate vocabulary served by this tool (Frame Language, derived from CSIS) is CC BY 4.0; this server itself as tooling infrastructure is CC0.

## See also

- `github.com/coordination-structural-integrity-suite/suite` (CSIS standards; Frame Language Foundational Vocabulary Specification in `tensegrity-suite/overview/`)
- `github.com/CrossWalkri/tools` (CROSS+WALKRI MCP server, sibling pattern)
- Local CSIS MCP server scaffold at `/Users/regischapman/csis-mcp-server/`
