# Contributing

## Branch & PR policy

- All changes go through a pull request — no direct commits to `main`.
- Every PR must be **up-to-date** with `main` before it can be merged (enforced by branch protection).
- The **"Typecheck, Lint & Test"** CI check must pass before merging (required status check on `main`).

## Running checks locally

```bash
cd gamesformykids
npx tsc --noEmit    # Typecheck (there is no "typecheck" npm script — this is what CI runs)
npx eslint . --max-warnings=0   # Lint (matches CI; `npm run lint` also works locally)
npm test -- --run   # Vitest unit tests
npm run build       # next build (full production build)
```

Run all four before opening a PR to catch issues early — these are exactly the commands the "Typecheck, Lint & Test" CI job runs.

## Workflow

1. Open a GitHub issue describing the change.
2. Create a branch from `main` named `<type>/<slug>-<issue-number>` (e.g. `fix/persist-scores-305`).
3. Commit your changes and push the branch.
4. Open a PR referencing the issue (`Closes #N`).
5. Wait for CI to go green, then request a review or self-merge.
