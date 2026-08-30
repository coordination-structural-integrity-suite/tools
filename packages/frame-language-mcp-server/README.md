# Frame Language MCP Server

MCP server exposing Frame Language precision discipline as AI tools.

Frame Language is the precision methodology derived from the Coordination Structural Integrity Suite (CSIS). It operates substrate-level across PoC, CROSS+WALKRI, and other coordination specialty work that inherits from CSIS. This server makes the discipline operationally available through MCP tools.

## Tools (v0.1.1)

**check_watchlist(term)**

Check a term against the Frame 1 watchlist. Returns whether the term is on the watchlist, why it imports Frame 1 framing, the canonical replacement pattern, primitive anchors, and common phrasings with their Frame 2 equivalents.

The watchlist holds thirty-two terms (for example accountability, governance, transparency, stakeholder, oversight), drawn from a single canonical term registry rather than a hand-maintained list, so the server and the registry cannot drift apart. Matching is on the exact term, so inflected forms are not caught.

**check_admissibility(case_id?)**

Return the seven Pre-Replacement Admissibility cases. A Frame 1 term is admissible without replacement if it matches one of these seven cases. Cases: citation-use, detection-use, contextual-description, developmental-bridge, naming-the-stage, communication-medium, documentary-record.

**frame2_functioning_check(mode_id?)**

Return the eight Frame 2 functioning check failure modes. A term expressed in Frame 2 vocabulary may still fail to function as Frame 2 in one of these ways. Modes: transcendence-claim, declaration-exploit, precision-facade, partial-instantiation, direction-without-destination, vocabulary-without-architecture, correct-map-wrong-territory, frozen-map. Each mode includes a falsifiability-context variant from the Falsifiability Architecture document.

**lookup_three_frames()**

Return the three Frames of Frame Language with the guna typology mapping. Frame 1 (tamas), Frame 2 (rajas), Frame 3 (sattva, pointing toward trigunatita). Includes the Innate Totality framing, the nested failure mode structure, the precision-and-non-harming unity statement, and a note on bridge vocabulary use.

**audit_text(text)**

Scan a block of text for Frame 1 watchlist hits. Returns terms found, occurrence counts, and the watchlist entries. The tool flags terms; user must determine whether each usage is admissible per the seven cases.

**regen_reality_check(check_id?)**

Return the nine regenerative reality checks with the Frame 2 imitation types and routing context. Applies where a document makes regenerative claims. The operative test throughout is external verification: can a party outside the organization verify the condition from the document alone.

## Using this server

This server is hosted at `https://frame-language-production.up.railway.app/mcp`, and is published to npm as `@proof-of-coord/frame-language` and to JSR as `jsr:@proof-of-coord/frame-language`.

Connect the hosted server (nothing to install), or run it locally from the package:

```bash
# hosted, no install
claude mcp add --transport http frame-language https://frame-language-production.up.railway.app/mcp

# or run locally from npm, no clone
claude mcp add frame-language -- npx -y @proof-of-coord/frame-language
```

The full reference for every connection method (hosted, npm, JSR, and a local clone) is [Using the MCP servers](https://github.com/durgadasji/standards-index/blob/main/using-the-mcp-servers.md).

## Architecture

Single-package TypeScript project. Data files in `src/watchlist.ts`, `src/admissibility.ts`, `src/functioning-check.ts`, and `src/three-frames.ts` hold the structural content. The MCP server in `src/index.ts` wires the data to tool calls.

The substrate discipline requires that substantive substrate work read the full source documents directly rather than substituting summaries. This server provides operational access to the Frame Language discipline; the canonical sources are the Frame Language Grammar and SOP documents in the Methodology folder plus the Frame Language Foundational Vocabulary Specification in the CSIS overview.

## Three frames, not two

Frame Language has THREE frames:
- **Frame 1**: seasonal expressions (the visible surface; guna: tamas)
- **Frame 2**: conditions and configurations (the structural arrangement layer; guna: rajas)
- **Frame 3**: the Innate Totality itself (the orientation that operates from the totality; guna: sattva, pointing toward trigunatita)

This is sharper than the common Frame 1 / Frame 2 binary. The three-frame model is sourced from internal Frame Language lens research.

## Precision and non-harming as one move

Per PFDS Section 2 and the Innate Totality primer: precision and non-harming are NOT two principles held together externally. They are the SAME move described from two positions. Precision is seeing the Innate Totality of what is being engaged with; non-harming is treating the Innate Totality as what it actually is. The same capacity generates both.

## License

Apache-2.0, matching the CSIS suite convention for code artifacts. The substrate vocabulary served by this tool (the Frame Language Foundational Vocabulary Specification, derived from CSIS) is published as a CC BY 4.0 specification at the suite repo; this server is the code that surfaces operational access to that vocabulary.

## See also

- `github.com/coordination-structural-integrity-suite/suite` (CSIS standards; Frame Language Foundational Vocabulary Specification in `tensegrity-suite/overview/`)
- `github.com/CrossWalkri/tools` (CROSS+WALKRI MCP server, sibling pattern)
