import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    exclude: ['**/node_modules/**', 'e2e/**'],
    coverage: {
      /**
       * Ratchet thresholds, set a couple of points under the current numbers.
       *
       * Read what these do and don't measure before trusting them: with v8's
       * default instrumentation only files a test actually imports are counted,
       * so this is coverage *of the tested modules*, not of the project. A store
       * with no test file at all doesn't drag the number down — it's simply
       * absent from it.
       *
       * So the gate catches "someone deleted a test" and "someone added an
       * untested branch to code that was covered". It does not catch "someone
       * shipped a whole new store with no tests" — for that, look at which
       * stores have no file under __tests__/stores/ at all.
       */
      thresholds: {
        statements: 63,
        branches: 50,
        functions: 53,
        lines: 64,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      // `server-only` throws on import outside an RSC, which would make every
      // server-side helper untestable. The real guard still applies in builds.
      'server-only': fileURLToPath(new URL('./__tests__/stubs/server-only.ts', import.meta.url)),
    },
  },
});
