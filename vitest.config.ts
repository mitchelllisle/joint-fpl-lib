import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**'
      ]
    },
    globals: true,
    environment: 'node'
  },
  resolve: {
    alias: {
      '../utils/noDataTextMark.js': '/Users/thrillhouse/Documents/libraries/joint-fpl-lib/src/utils/noDataTextMark.ts',
      '../utils/gini.js': '/Users/thrillhouse/Documents/libraries/joint-fpl-lib/src/utils/gini.ts',
      '../utils/colours.js': '/Users/thrillhouse/Documents/libraries/joint-fpl-lib/src/utils/colours.ts'
    }
  }
});
