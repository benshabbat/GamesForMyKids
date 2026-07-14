---
name: run-and-fix-tests
description: "Run the GamesForMyKids test suite (vitest unit tests + Playwright e2e), diagnose failures, and fix them. Use when: tests are failing, run tests, fix tests, test error, vitest error, playwright error, CI failing, test suite broken, snapshot mismatch, store test failing."
argument-hint: "Optional: test scope — 'unit', 'e2e', 'stores', 'hooks', 'quiz', or a specific file path"
---

# Run & Fix Tests

## When to Use
- "בדיקות נכשלות", "run tests", "fix failing tests", "CI is red"
- After adding a new game or refactoring shared infrastructure
- Diagnosing a specific test file or category

## Test Infrastructure

| Suite | Runner | Config | Command |
|---|---|---|---|
| Unit / integration | Vitest | `vitest.config.ts` | `npm run test` |
| E2E | Playwright | `playwright.config.ts` | `npx playwright test` |

All commands run from `gamesformykids/`.

## Step 1 — Determine Scope

If an argument was provided, restrict to that scope. Otherwise run the full unit suite first, then e2e.

**Scope mappings:**
- `unit` / `stores` / `hooks` / `quiz` → vitest with `--reporter=verbose`
- `e2e` → Playwright
- Specific file path → vitest or playwright depending on extension (`.test.ts` vs `.spec.ts`)

## Step 2 — Run Unit Tests

```bash
cd gamesformykids
npm run test -- --reporter=verbose 2>&1 | head -100
```

If a specific scope:
```bash
npm run test -- --reporter=verbose __tests__/stores/
npm run test -- --reporter=verbose __tests__/quiz/
npm run test -- --reporter=verbose __tests__/hooks/
```

## Step 3 — Diagnose Unit Test Failures

For each failing test:

1. **Read the test file** to understand what it's testing.
2. **Read the source file** being tested.
3. **Common failure patterns and fixes:**

| Symptom | Likely cause | Fix |
|---|---|---|
| `Cannot find module '@/...'` | Missing export or wrong path | Check barrel exports in `index.ts` |
| `Type error: Property X does not exist` | Interface changed | Update type in `lib/types/core/base.ts` |
| `Expected X received Y` in store test | INITIAL_STATE changed | Update test snapshot or store default |
| `useGameAudio is not a function` | Audio mock missing | Add `vi.mock('@/hooks/shared/audio/useGameAudio')` |
| `createChallengeStore` shape mismatch | Store factory API changed | Read `lib/stores/utils/createChallengeStore.ts` and align |
| Zustand store not resetting | Missing `reset()` or wrong key | Verify `reset: () => set(INITIAL_STATE, false, 'ns/reset')` |

## Step 4 — Run E2E Tests

```bash
cd gamesformykids
npx playwright test --reporter=list 2>&1 | head -80
```

For a single spec:
```bash
npx playwright test e2e/game-animals.spec.ts --reporter=list
```

## Step 5 — Diagnose E2E Failures

1. Check if dev server is running — Playwright needs it.
2. **Common e2e failures:**

| Symptom | Fix |
|---|---|
| `net::ERR_CONNECTION_REFUSED` | Start dev server: `npm run dev` |
| Element not found / timeout | Selector changed — read spec + component to align |
| Auth state missing | Check `e2e/auth.spec.ts` — auth fixture may need refresh |
| Game route 404 | Game not in `SUPPORTED_GAMES` or `GameType` union missing |

## Step 6 — Apply Fix

- Fix the **source** if the test is correct and the source is broken.
- Fix the **test** only if the source change was intentional and the test is outdated.
- After fixing, re-run only the affected test file to confirm green.

## Step 7 — Final Check

```bash
npm run test          # all unit tests green
npx tsc --noEmit      # no TS errors introduced
```
