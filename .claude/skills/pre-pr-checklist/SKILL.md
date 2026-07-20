---
name: pre-pr-checklist
description: This skill should be used before opening a pull request, before telling the user a change is "done" or "ready", or when the user asks to "open a PR", "commit this", "ship it", or "wrap up" work in the GamesForMyKids repo. Provides the mandatory pre-flight checklist (typecheck, build, manual test, CI, PR body format) so nothing broken gets shipped.
---

# Pre-PR Checklist — GamesForMyKids

Run this checklist before opening a pull request or reporting work as complete. Do not skip steps because a change "looks small" — TypeScript and build errors in this repo are cheap to catch locally and expensive to catch in CI.

## Step 1 — Typecheck and build

```bash
cd gamesformykids && npx tsc --noEmit
npm run build
```

Both must be clean (zero errors) before proceeding. Fix errors rather than suppressing them (no `@ts-ignore` additions to make the checklist pass).

## Step 2 — Manually exercise the change

- If a game was added or changed, load `http://localhost:3000/games/<game-type>` and actually play it — a passing typecheck does not prove the game works.
- If it's a new game, confirm it shows up in its category on the home page grid.
- For UI changes, check mobile and desktop layout.

## Step 3 — Run relevant project audits (optional but recommended)

Pick whichever apply to the change:
- `/dry-guard` — duplicate-infrastructure scan on the diff
- `/game-sanity-review` or `/game-qa` — full game correctness pass
- `/commit-quality` — commit message / diff hygiene
- `/branch-hygiene` — branch state sanity

## Step 4 — Open the PR

- Use `/pr-writer` to draft the PR body, or write one directly.
- **Every PR body must contain `Closes #NNN`** — this repo tracks issues and PRs are expected to close one.
- Keep the title under ~70 characters; put detail in the body.

## Step 5 — After opening, watch CI

```bash
gh pr checks
```

Fix any CI failures before reporting the task as done — a green local build does not guarantee green CI (Lighthouse, e2e, etc. run there too). Re-run `gh pr checks` after pushing fixes.
