#!/usr/bin/env node
/**
 * @proof-of-coord/frame-language - stdio transport entry point
 *
 * MCP server exposing the Dimensional Frame Language precision discipline
 * as AI tools over stdio. Server construction lives in ./create-server.ts,
 * shared with the HTTP entry point (./http.ts).
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createMcpServer, SERVER_VERSION } from './create-server.js'

async function main() {
  const server = createMcpServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error(`Frame Language MCP server v${SERVER_VERSION} running on stdio`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
