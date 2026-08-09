// Stub for the `server-only` package.
//
// The real module throws on import outside a React Server Component, which
// would make any server-side helper untestable under Vitest. Aliased in
// vitest.config.ts so `import 'server-only'` is a no-op in tests while still
// guarding the real build.
export {};
