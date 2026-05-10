# Contributing

## Branch & PR policy

- All changes go through a pull request — no direct commits to `main`.
- Every PR must be **up-to-date** with `main` before it can be merged (enforced by branch protection).
- The **"Typecheck, Lint & Test"** CI check must pass before merging (required status check on `main`).

## Running checks locally

```bash
cd gamesformykids
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest unit tests
npm run build       # next build (full production build)
```

Run all four before opening a PR to catch issues early.

## Workflow

1. Open a GitHub issue describing the change.
2. Create a branch from `main` named `<type>/<slug>-<issue-number>` (e.g. `fix/persist-scores-305`).
3. Commit your changes and push the branch.
4. Open a PR referencing the issue (`Closes #N`).
5. Wait for CI to go green, then request a review or self-merge.
