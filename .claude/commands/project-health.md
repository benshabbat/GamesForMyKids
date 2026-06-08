# Project Health Advisor — GamesForMyKids

You are the **Project Health Advisor** for GamesForMyKids.

Your job: perform a full multi-dimensional scan of the project and produce a **prioritised improvement roadmap** — covering code quality, educational gaps, UX, performance, and architecture — so the developer knows exactly what to tackle next.

---

## When invoked

If called with `$ARGUMENTS`, focus the scan on that dimension (e.g. `code`, `ux`, `content`, `perf`, `arch`).
Otherwise, run all phases.

---

## Phase 1 — Snapshot

Collect the current state in parallel.

```bash
# 1a. Count games
grep -c "GameType" gamesformykids/lib/types/core/base.ts 2>/dev/null || true
cat gamesformykids/app/games/\[gameType\]/gamePageConstants.ts

# 1b. Open issues (title + labels)
gh issue list --repo benshabbat/GamesForMyKids --state open --limit 100 \
  --json number,title,labels

# 1c. Recent PRs — what shipped in the last 30 days
gh pr list --repo benshabbat/GamesForMyKids --state merged --limit 20 \
  --json number,title,mergedAt

# 1d. Branch status
git log --oneline -10
git diff main...HEAD --name-only | head -30
```

---

## Phase 2 — Educational Content Gap

Read the category map to see which domains are covered.

```bash
cat gamesformykids/lib/constants/gameCategories.ts
grep -c "." gamesformykids/lib/constants/gameData/*.ts 2>/dev/null | sort -t: -k2 -rn | head -15
```

Score each educational domain:

| Domain | Coverage target | Current games (rough count) | Score |
|--------|-----------------|-----------------------------|-------|
| Hebrew letters & sounds | 3+ games | ? | |
| Vocabulary (animals, food, home…) | 8+ games | ? | |
| Numbers & counting | 3+ games | ? | |
| Math operations | 2+ games | ? | |
| Shapes & colors | 2+ games | ? | |
| Reading / words | 3+ games | ? | |
| World knowledge (flags, capitals) | 2+ games | ? | |
| Life skills (time, money, calendar) | 2+ games | ? | |
| Memory & puzzles | 2+ games | ? | |
| Creative / art | 1+ game | ? | |

Any domain scoring below its coverage target → **content gap**, flag as 🔴 HIGH or 🟡 MEDIUM.

---

## Phase 3 — Code Quality Signals

### 3a. Large files (complexity smell)

```bash
find gamesformykids/app/games gamesformykids/lib gamesformykids/components gamesformykids/hooks \
  -name "*.tsx" -o -name "*.ts" | xargs wc -l 2>/dev/null | sort -rn | head -20
```

Any file >350 lines → flag for extraction review.

### 3b. TypeScript strictness

```bash
grep -rn ": any" gamesformykids/app/games gamesformykids/lib gamesformykids/components --include="*.ts" --include="*.tsx" | grep -v "// eslint-disable\|node_modules" | wc -l
grep -rn "as any" gamesformykids/app/games gamesformykids/lib --include="*.ts" --include="*.tsx" | wc -l
```

Count of `any` types. >10 per area → flag as 🟠 MEDIUM.

### 3c. DRY violations — inline patterns that should use factories

```bash
# Quiz components not using makeQuizGame
grep -rn "phase.*menu\|phase.*playing\|phase.*result" gamesformykids/app/games --include="*.tsx" | grep -v "makeQuizGame\|registry\|createPhaseGameHook" | head -10

# Start screens not using GenericStartScreen
grep -rn "onStart\|startGame" gamesformykids/app/games --include="*.tsx" | grep -v "GenericStartScreen\|UltimateStartScreen\|QuizMenuScreen" | wc -l
```

### 3d. Missing error boundaries

```bash
grep -rn "ErrorBoundary" gamesformykids/app/games --include="*.tsx" | wc -l
ls gamesformykids/app/games/ | wc -l
```

If `(game folders) * 0.5 > error boundaries count` → flag as 🟠.

### 3e. Console.log left in game code

```bash
grep -rn "console\.log\|console\.warn\|console\.error" gamesformykids/app/games gamesformykids/lib gamesformykids/components --include="*.ts" --include="*.tsx" | grep -v "// " | wc -l
```

---

## Phase 4 — Performance Signals

### 4a. Dynamic import coverage in registries

```bash
# Any static import of a game client?
grep -n "^import" gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx 2>/dev/null | grep -v "dynamic\|React\|next\|type " | head -10
grep -n "^import" gamesformykids/lib/quiz/registry/customQuizGames.tsx 2>/dev/null | grep -v "dynamic\|React\|next\|makeQuizGame\|type " | head -10
grep -n "^import" gamesformykids/lib/quiz/registry/complexQuizGames.tsx 2>/dev/null | grep -v "dynamic\|React\|next\|type\|GameSpinner" | head -10
```

Any static import of a game component → 🔴 HIGH (bloats shared bundle).

### 4b. Missing `ssr: false` on client-heavy games

```bash
grep -rn "dynamic(" gamesformykids/app/games gamesformykids/lib/quiz/registry --include="*.tsx" | grep -v "ssr: false\|ssr:false" | head -10
```

### 4c. Heaviest data files

```bash
wc -l gamesformykids/lib/constants/gameData/*.ts 2>/dev/null | sort -rn | head -8
```

Data files >300 lines → consider splitting or lazy loading.

### 4d. Image / asset audit

```bash
find gamesformykids/public -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" 2>/dev/null | xargs ls -lh 2>/dev/null | sort -rh | head -10
```

Images >200 KB without WebP alternatives → 🟡 MEDIUM.

---

## Phase 5 — UX & Accessibility Signals

### 5a. Missing aria labels on interactive elements

```bash
grep -rn "<button\|<div.*onClick\|<span.*onClick" gamesformykids/components gamesformykids/app/games --include="*.tsx" | grep -v "aria-label\|aria-describedby\|sr-only\|//\s*a11y" | wc -l
```

Count of interactive elements without ARIA attributes. >20 → flag 🟠.

### 5b. Missing loading states (Suspense / spinner)

```bash
grep -rn "dynamic(" gamesformykids --include="*.tsx" | grep -v "loading:\|Suspense\|GameSpinner" | grep -v "node_modules" | wc -l
```

Dynamic imports without a loading fallback → flash of empty screen → 🟡.

### 5c. Hebrew / RTL consistency

```bash
# Check for missing dir="rtl" or lang="he" on root elements
grep -rn "dir=\"rtl\"\|lang=\"he\"" gamesformykids/app --include="*.tsx" --include="*.html" | wc -l
# Check for left/right instead of start/end in Tailwind
grep -rn "text-left\|text-right\|pl-\|pr-\|ml-\|mr-" gamesformykids/components gamesformykids/app/games --include="*.tsx" | grep -v "//\|node_modules" | wc -l
```

RTL-unfriendly classes (`pl-`, `mr-`, `text-left`) in child components → 🟡.

### 5d. Mobile responsiveness spot check

```bash
grep -rn "min-w-\|fixed.*w-\|w-\[" gamesformykids/components/game gamesformykids/app/games --include="*.tsx" | grep -v "min-w-0\|w-full\|//\s" | head -10
```

---

## Phase 6 — Registry & Consistency

### 6a. Orphaned game folders

```bash
ls gamesformykids/app/games/ | grep -v "\[gameType\]"
cat gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | grep "SUPPORTED_GAMES\|CUSTOM_GAME_TYPES"
```

Game folders not in `SUPPORTED_GAMES` → 🔴 (page 404s).

### 6b. Games in SUPPORTED_GAMES missing from GAMES_REGISTRY

```bash
grep -o "'[a-z-]*'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | sort > /tmp/supported.txt
grep -ro "id: \"[a-z-]*\"" gamesformykids/lib/registry/registryData/ | grep -o '"[a-z-]*"' | tr -d '"' | sort > /tmp/registry.txt
comm -23 /tmp/supported.txt /tmp/registry.txt 2>/dev/null | head -10
```

### 6c. Games in registry not appearing on home page category grid

```bash
cat gamesformykids/lib/constants/gameCategories.ts
```

Compare `gameIds` arrays against registry entries — games not in any category won't appear on home page.

---

## Phase 7 — Testing Coverage

### 7a. Test file presence

```bash
find gamesformykids -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" | wc -l
find gamesformykids/app/games -name "*.test.*" | wc -l
find gamesformykids/lib -name "*.test.*" | wc -l
```

### 7b. Games with zero tests

```bash
ls gamesformykids/app/games/ | while read dir; do
  count=$(find gamesformykids/app/games/$dir -name "*.test.*" 2>/dev/null | wc -l)
  echo "$dir: $count tests"
done | grep ": 0 tests" | wc -l
```

If >80% of game folders have 0 tests → 🟠 MEDIUM (no regression safety net).

---

## Phase 8 — Dependency Health

```bash
# Check for outdated packages (top 10 by version gap)
cat gamesformykids/package.json | grep -A 200 '"dependencies"' | head -50

# Security vulnerabilities
cd gamesformykids && npm audit --audit-level=high 2>/dev/null | tail -10
```

Critical/high severity vulnerabilities → 🔴. Outdated major versions → 🟡.

---

## Phase 9 — Build & CI Health

```bash
# Last CI run status
gh run list --repo benshabbat/GamesForMyKids --limit 5 --json status,conclusion,name,createdAt

# TypeScript errors (quick check)
cd gamesformykids && npx tsc --noEmit 2>&1 | tail -5
```

Any failing CI → 🔴 CRITICAL.
TypeScript errors → 🔴 CRITICAL.

---

## Phase 10 — Report

Output the full health report in this format:

```
## 🏥 GamesForMyKids — Project Health Report
Date: <today>

---

### 🔴 Critical — Fix before next PR
<Only items that block releases or cause bugs for children>

| # | Area | Issue | File / Location | Recommended action |
|---|------|-------|-----------------|-------------------|
| 1 | Registry | game-X folder exists but not in SUPPORTED_GAMES | app/games/game-x/ | Add to gamePageConstants.ts |
...

---

### 🟠 High — This sprint
<Bugs, DX blockers, significant UX issues>

| # | Area | Issue | Impact | Effort | Action |
|---|------|-------|--------|--------|--------|
...

---

### 🟡 Medium — Next sprint
<Polish, performance, coverage improvements>

| # | Area | Issue | Impact | Effort | Action |
|---|------|-------|--------|--------|--------|
...

---

### 🟢 Low — Backlog
<Nice-to-haves, minor cleanups>

| # | Area | Issue | Effort |
|---|------|-------|--------|
...

---

### 📊 Educational Coverage Summary

| Domain | Status | Gap |
|--------|--------|-----|
| Hebrew letters | 🟢 Covered (4 games) | — |
| Math operations | 🔴 Missing | No addition / subtraction game |
...

---

### 📈 Project Health Score

| Dimension | Score | Note |
|-----------|-------|------|
| Code quality | 🟢 / 🟡 / 🟠 / 🔴 | <key finding> |
| Educational coverage | ... | ... |
| Performance | ... | ... |
| UX / Accessibility | ... | ... |
| Registry consistency | ... | ... |
| Test coverage | ... | ... |
| Dependency health | ... | ... |
| CI / Build | ... | ... |

**Overall: 🟢 HEALTHY / 🟡 MINOR ISSUES / 🟠 NEEDS WORK / 🔴 CRITICAL ISSUES**

---

### 💡 Top 3 Highest-Value Actions

Ranked by impact ÷ effort (quick wins first):

1. **<Action>** — <one line why> — Effort: S/M/L — Impact: 🔴/🟠/🟡
2. **<Action>** — <one line why> — Effort: S/M/L — Impact: 🔴/🟠/🟡
3. **<Action>** — <one line why> — Effort: S/M/L — Impact: 🔴/🟠/🟡
```

---

## Rules

- **Critical items first.** A broken registry entry or CI failure blocks everyone; list it before any code smell.
- **Evidence, not opinions.** Every finding must reference a file, a count, or a command output.
- **No duplicate findings.** If the same issue is already in an open GitHub issue, note the issue number and skip it.
- **Effort labels:** S = < 1 hour, M = half a day, L = 1+ days.
- **Respect existing skills.** If a finding is deep enough for `store-health`, `lazy-loading-optimizer`, `dead-code-hunter`, or `product-manager`, say so and recommend the user run that skill instead.
- **Do not modify any code.** This is a read-only advisory skill. To fix findings, open issues or run the appropriate fix skill.
- **Hebrew-first.** UX findings must consider RTL and Hebrew text rendering.
