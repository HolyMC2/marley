import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.spec.js'],
    // frappe-ui 1.x ships its source with extensionless imports
    server: { deps: { inline: ['frappe-ui'] } },
  },
})
