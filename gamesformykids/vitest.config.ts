import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    exclude: ['**/node_modules/**', 'e2e/**'],
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
