import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // Server tests spawn processes and speak JSON-RPC; give them room.
    testTimeout: 20_000,
    hookTimeout: 20_000,
  },
})
