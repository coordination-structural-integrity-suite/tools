# CSIS MCP Server

MCP server that exposes the Coordination Structural Integrity Suite as AI tools.

The Coordination Structural Integrity Suite (CSIS) is ten structural standards for coordination systems that need to be accountable, consent-legible, and exploitation-resistant. Specifications are licensed CC BY 4.0; co-released with CROSS (CC0). The canonical source repository is `github.com/coordination-structural-integrity-suite/suite`.

This server provides metadata and structural access to CSIS through MCP tools. The substrate discipline requires that substantive PFDS or other standard-level work read the full standard directly rather than substituting summaries; this server returns pointers and structural data rather than displacing the source.

## v0.2.0 working server

Six tools implemented:

**list_standards**

List the ten CSIS standards (seven compressive plus three generative). Returns canonical names, short ids, family, current version, GitHub paths, GitHub URLs, and brief descriptions. Optional family filter (compressive, generative, or all).

**get_foundational_commitments**

Return the foundational commitments: the unified principle of precision and non-harming (held together via transclusion as PFDS specifies, not as two principles held externally); why holding either alone fails (control instrument vs. attack surface); the structural outcome; and the substrate inheritance hierarchy (CSIS substrate; Frame Language derived; PoC and CROSS+WALKRI as siblings inheriting from CSIS). Includes the general principle that inheritance order is independent of chronological order.

**lookup_corollary**

Return one of the nine PFDS corollaries. Each corollary specifies its precision condition in two directions: under-specification failure mode and over-specification failure mode. Includes worked examples from PFDS Section 4 where applicable.

**lookup_structural_pattern**

Return one of the ten named structural patterns from the Suite Structural Patterns Primer. Returns structural arrangement, which standards are involved, observable signature, and maturity status (original-six from cross-context analysis, or four-added working hypotheses from specific evaluations).

**lookup_descriptive_class**

Return one of the six descriptive classes from the Descriptive Typology Map (referenced by PFDS Corollary 8): structural-mechanical, temporal-dynamic, epistemic-perceptual, relational-topological, felt-experience, action-structural. Use to apply Corollary 8 typological declaration.

**get_inheritance_graph_with_specialty**

Return the substrate inheritance hierarchy. Optionally place a named coordination specialty (e.g., "AI evaluation", "ESG reporting") as a sibling of PoC and CROSS+WALKRI under CSIS.

## Planned tools (future versions)

- `audit_against_corollary(text, corollary_id)` - structural audit of text against a corollary
- `lookup_naming_decision(decision_number)` - PoC terminology conventions entries (if PoC has a separate MCP server, this stays there; otherwise served from PoC server)

## Installation

### Prerequisites

- Node.js 20 or later
- pnpm (or npm)

### Install dependencies

```bash
pnpm install
```

### Build

```bash
pnpm build
pnpm bundle
```

The bundled output is at `server.mjs` for the zero-install path.

### MCP client configuration

Add the server to your MCP client configuration. For Claude Code, the simplest path is:

```bash
claude mcp add csis "node /Users/regischapman/csis-mcp-server/server.mjs"
```

Or edit your MCP config file directly:

```json
{
  "mcpServers": {
    "csis": {
      "command": "node",
      "args": ["/path/to/csis-mcp-server/server.mjs"]
    }
  }
}
```

Restart Claude Code for the new server to be picked up.

## Architecture

Single-package TypeScript project. Data files in `src/standards.ts`, `src/foundational-commitments.ts`, `src/corollaries.ts`, `src/structural-patterns.ts`, and `src/descriptive-classes.ts` hold the structural metadata. The MCP server in `src/index.ts` wires the data to tool calls.

v0.2.0 expands from the v0.1.0 scaffold by adding four data files and four tool handlers. Future versions will add audit operations and naming-decision lookups.

## License

Apache-2.0, matching the CSIS suite convention for code artifacts. The substrate this server provides access to (the CSIS standards) is published as CC BY 4.0 specifications at the suite repo; this server is the code that surfaces structural metadata about those specifications.

## See also

- `github.com/coordination-structural-integrity-suite/suite` - the canonical CSIS standards
- `github.com/CrossWalkri/tools` - the CROSS+WALKRI MCP server (sibling pattern)
- `github.com/coordination-structural-integrity-suite/ai` - AI prompt launcher for the suite
