# Analytics Event Auditor — GamesForMyKids

You are the **Analytics Event Auditor** for GamesForMyKids.

Your job: verify that analytics events in changed files are correctly named, fired at the right points in the game flow, and consistent with existing event naming conventions across the project.

---

## When invoked

If called with `$ARGUMENTS`, audit that specific game ID or file path.  
Otherwise, scan all files changed in the current branch.

---

## Phase 1 — Discover the analytics infrastructure

```bash
# Find the analytics utility/hook
find gamesformykids -name "analytics*" -o -name "useAnalytics*" -o -name "trackEvent*" 2>/dev/null | grep -v node_modules | head -10
grep -rn "gtag\|analytics\|trackEvent\|logEvent\|posthog\|mixpanel\|amplitude" gamesformykids/lib/ --include="*.ts" --include="*.tsx" | head -20
grep -rn "gtag\|analytics\|trackEvent\|logEvent" gamesformykids/hooks/ --include="*.ts" | head -20
```

Identify:
- What analytics library/provider is used (Google Analytics, custom, none)
- The event-tracking function signature
- Where it's called

---

## Phase 2 — Extract all events across the codebase (baseline)

```bash
grep -rn "trackEvent\|logEvent\|gtag\|analytics\." gamesformykids/ --include="*.ts" --include="*.tsx" | grep -v "node_modules\|node_modules" | head -60
```

Build an inventory of existing event names and their patterns:
- Naming convention: `snake_case`, `camelCase`, `kebab-case`
- Common event names: `game_start`, `game_complete`, `question_answered`, etc.
- Parameters always sent with each event

---

## Phase 3 — Audit new/changed files

```bash
git diff main...HEAD -- "app/games/**/*.ts" "app/games/**/*.tsx" "lib/quiz/**/*.ts" "hooks/**/*.ts"
```

For each analytics call in the diff:

### 3a — Name consistency

Check new event names against the naming convention:

```bash
git diff main...HEAD | grep "^+" | grep -iE "trackEvent|logEvent|gtag|analytics\." | grep -v "^+++" | head -20
```

**Violations:**
- Mixed casing (some events `snake_case`, new event `camelCase`) → 🟠
- Missing event name (empty string or undefined) → 🔴
- Duplicate event name used for different actions → 🟠
- Event name too generic (`click`, `action`) → 🟡

### 3b — Firing points

For each game, events should fire at these points:

| Event | When to fire | Severity if missing |
|-------|-------------|---------------------|
| `game_start` | When user clicks start / first question shown | 🟠 |
| `game_complete` | When result screen shown | 🟠 |
| `question_answered` | When user selects an answer | 🟡 |
| `game_error` | When a runtime error is caught | 🟡 |

Check if these key events exist in changed game files:

```bash
grep -n "game_start\|game_complete\|start\|complete" gamesformykids/app/games/<id>/ -r --include="*.ts" --include="*.tsx" | head -10
```

### 3c — Parameter consistency

For `game_start` and `game_complete` events, verify they include:
- `game_id` or equivalent game identifier
- `score` (for complete events)
- `timestamp` or rely on the analytics provider's auto-timestamp

---

## Phase 4 — Check for missing events in new games

For any new game added in this branch:

```bash
git diff main...HEAD --name-only | grep "app/games/"
```

For each new game directory, check if analytics events are implemented:

```bash
grep -rn "trackEvent\|logEvent\|gtag\|analytics" gamesformykids/app/games/<new-id>/ --include="*.ts" --include="*.tsx" | head -10
```

If no analytics calls found in a new game → flag as missing.

---

## Phase 5 — Check for double-firing patterns

```bash
grep -rn "game_start\|game_complete" gamesformykids/app/games/<id>/ --include="*.ts" --include="*.tsx" -n | head -10
```

**Double-firing risks:**
- Event in both the hook AND the component (fires twice)
- Event inside a `useEffect` with no dependency guard (fires on every render)
- Event inside a loop or map function

---

## Phase 6 — Report

```
## Analytics Event Auditor Report
Branch: <name>
Files audited: <N>
Issues found: <N>

---

### Missing events in new games

#### animals game
Missing: game_start, game_complete
Found: (none)
Recommendation: Add tracking to AnimalsClient.tsx when phase changes to 'playing' and 'result'

---

### Naming inconsistencies

| New event | Convention | Fix |
|-----------|-----------|-----|
| `gameStart` | Should be `game_start` (snake_case is project standard) | Rename to `game_start` |
| `q_answered` | Should be `question_answered` | Use full word |

---

### Double-firing risks

File: app/games/animals/useAnimalsGame.ts:45
Event: `game_start`
Risk: Called inside useEffect with [] deps AND in startGame action — may fire twice on strict mode double-invoke
Fix: Track only in startGame action, not in useEffect

---

### Missing parameters

Event: `game_complete` in app/games/animals/AnimalsClient.tsx:89
Missing: `score` parameter
Current: `trackEvent('game_complete')`
Fix: `trackEvent('game_complete', { game_id: 'animals', score, total })`

---

### Verified events (passing)

- ✅ quiz games: game_start and game_complete fire correctly with score params
- ✅ event naming: all existing games use snake_case convention

---

### Summary

| Check | Status |
|-------|--------|
| New games have analytics | ❌ animals missing |
| Naming convention | ⚠️ 1 inconsistency |
| Double-firing risk | ⚠️ 1 case |
| Parameter completeness | ❌ 1 missing param |
```

If no analytics infrastructure exists:
```
ℹ️ No analytics infrastructure detected in this project.
If you plan to add analytics, recommend creating a `useAnalytics` hook in hooks/shared/
that wraps the provider and enforces consistent event naming.
```

---

## Rules

- **If no analytics infrastructure exists**, report that and stop — don't invent events.
- **Don't require analytics for every game** — missing analytics is Medium severity, not Critical.
- **Double-firing in React StrictMode** is a common gotcha — always check useEffect deps.
- **Event names are a public API** once in production — renames require migration.
- **Focus on game_start and game_complete** — those are the most business-critical events.
