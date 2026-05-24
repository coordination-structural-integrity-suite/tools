# CSIS Tools

MCP server tooling for the Coordination Structural Integrity Suite (CSIS) and the Frame Language substrate. Companion to the CSIS standards repo at github.com/coordination-structural-integrity-suite/suite.

This repo contains two MCP servers, each surfacing a different layer of the substrate stack:

1. **CSIS MCP server** (`packages/csis-mcp-server/`) provides structural access to the ten CSIS standards, the nine PFDS corollaries, the ten named structural patterns, the six descriptive classes, the foundational commitments (precision and non-harming as one principle via transclusion), and the substrate inheritance hierarchy. Per the substrate discipline, the server provides pointers and structural metadata, not full standard text. Substantive corollary work continues to require reading the full PFDS or other source standard directly.

2. **Frame Language MCP server** (`packages/frame-language-mcp-server/`) provides operational access to the Frame Language precision discipline derived from CSIS. Five tools cover the watchlist of Frame 1 vocabulary, the seven Pre-Replacement Admissibility cases, the eight Frame 2 functioning-check failure modes (with falsifiability-context variants), the three Frames with the guna typology mapping, and a text auditor for own-voice writing.

Both servers are licensed Apache 2.0, matching the CSIS suite repo's convention for code artifacts. The CSIS standards and the Frame Language Foundational Vocabulary Specification themselves are CC BY 4.0 specifications and live in the suite repo.

---

## Why two servers in one repo

CSIS is the substrate; Frame Language is derived from CSIS and operates as a precision methodology across CSIS-derived work. Co-locating the two servers in a single monorepo reflects the inheritance: Frame Language sits structurally between CSIS and applied specialty work (PoC, CROSS+WALKRI, future domain standards). Other specialties build their own MCP servers (e.g., CROSS+WALKRI at github.com/CrossWalkri/tools); the two in this repo are the substrate.

---

## MCP server installation

### Zero-install (recommended)

Clone this repo, then point your MCP client at the bundled `.mjs` outputs.

```bash
git clone https://github.com/coordination-structural-integrity-suite/tools.git
cd tools
pnpm install
pnpm build
pnpm bundle
```

Add both servers to your MCP client config:

```json
{
  "mcpServers": {
    "csis": {
      "command": "node",
      "args": ["/path/to/tools/csis-server.mjs"]
    },
    "frame-language": {
      "command": "node",
      "args": ["/path/to/tools/frame-language-server.mjs"]
    }
  }
}
```

For Claude Code:

```bash
claude mcp add csis "node /path/to/tools/csis-server.mjs"
claude mcp add frame-language "node /path/to/tools/frame-language-server.mjs"
```

Restart the client for the new servers to be picked up.

---

## CSIS MCP server tools (v0.3.0)

**list_standards**: Enumerate the ten CSIS standards (seven compressive plus three generative) with canonical names, ids, versions, GitHub paths and URLs, and brief descriptions sourced from the suite README.

**get_foundational_commitments**: Return the unified precision-and-non-harming principle held together via transclusion (one move, not two principles held externally) and the substrate inheritance hierarchy (CSIS at the base; Frame Language derived; PoC and CROSS+WALKRI as siblings inheriting from CSIS).

**lookup_corollary**: Return one of the nine corollaries of the Precision-First Design Standard. Each corollary specifies its precision-first invariant in two directions: under-specification failure mode and over-specification failure mode. Includes worked examples from PFDS Section 4 where applicable.

**lookup_structural_pattern**: Return one of the ten named structural patterns from the Suite Structural Patterns Primer. A structural pattern is a recurring arrangement across multiple standards that produces a recognizable failure signature.

**lookup_descriptive_class**: Return one of the six descriptive classes from the Descriptive Typology Map (referenced by PFDS Corollary 8). Each class characterizes a structurally distinct dimension along which a phenomenon can be described.

**get_inheritance_graph_with_specialty**: Return the substrate inheritance hierarchy. With a specialty argument, place the named specialty (e.g., AI evaluation, ESG reporting) in the hierarchy as a sibling of PoC and CROSS+WALKRI under CSIS.

**audit_against_corollary**: Apply a PFDS corollary as a precision-first structural test on a specification, claim, or document. Returns the corollary's structural test framework (under- and over-specification failure modes, requirement, worked example) and, when text is provided, a prompt template for applying the audit.

---

## Frame Language MCP server tools (v0.1.0)

**check_watchlist**: Check a term against the Frame 1 watchlist. Returns whether the term is on the watchlist, why it imports Frame 1 framing, the canonical replacement pattern, primitive anchors, and common phrasings with their Frame 2 equivalents. Watchlist terms include accountability, governance, transparency, stakeholder, oversight, compliance, enforcement, legitimacy, empowerment, fiduciary, credibility, and mandatory.

**check_admissibility**: Return the seven Pre-Replacement Admissibility cases. A Frame 1 term is admissible without replacement if it matches one of these seven cases: citation use, detection use, contextual description, developmental bridge, naming the stage, communication medium, documentary record.

**frame2_functioning_check**: Return the eight Frame 2 functioning check failure modes. A term expressed in Frame 2 vocabulary may still fail to function as Frame 2 in one of these ways: transcendence claim, declaration exploit, precision facade, partial instantiation, direction without destination, vocabulary without architecture, correct map / wrong territory, frozen map. Each mode includes a falsifiability-context variant.

**lookup_three_frames**: Return the three Frames of Frame Language with the guna typology mapping. Frame 1 (tamas), Frame 2 (rajas), Frame 3 (sattva, pointing toward trigunatita). Includes the Innate Totality framing and the precision-and-non-harming unity statement.

**audit_text**: Scan a block of text for Frame 1 watchlist hits. Returns terms found, occurrence counts, and watchlist entries. The tool flags terms; the user determines whether each usage is admissible per the seven cases.

---

## Development

This is a pnpm workspace monorepo.

```bash
pnpm install         # install all package deps
pnpm build           # tsc across all packages
pnpm bundle          # esbuild bundles at repo root
pnpm typecheck       # type-check without emitting
pnpm clean           # remove dist directories
```

Each package builds independently. The root `bundle` script produces two zero-install entry points at the repo root: `csis-server.mjs` and `frame-language-server.mjs`.

---

## License

Both server packages and the code in this repository are licensed under the Apache License 2.0. See `LICENSE` for the full text. This matches the CSIS suite convention for code artifacts (the suite repo applies Apache 2.0 to code and CC BY 4.0 to specifications).

The substrate vocabulary surfaced by these servers (the CSIS standards and the Frame Language Foundational Vocabulary Specification) is published under CC BY 4.0 at github.com/coordination-structural-integrity-suite/suite. The MCP server code in this repo (Apache 2.0) is operational infrastructure that reads from those specifications; the specifications themselves remain CC BY 4.0.
