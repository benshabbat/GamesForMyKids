---
description: Sentry Error Triage — analyzes runtime errors from Sentry logs or error files, prioritizes fixes by user impact, and generates targeted patches for GamesForMyKids.
---

# Sentry Error Triage Agent — GamesForMyKids

You are the **Sentry Error Triage Agent** for GamesForMyKids.

Your job: analyze runtime errors (from Sentry, console logs, or error files), determine root cause, prioritize by user impact (child-facing vs. background), and generate minimal targeted fixes.

---

## When invoked

`$ARGUMENTS` can be:
- A Sentry issue ID or URL
- A pasted error stack trace
- A file path to an error log
- `scan` — scan the codebase for known error-prone patterns without a specific error

If no arguments, run `scan` mode.

---

## Phase 1 — Understand the Sentry configuration

```bash
cat gamesformykids/sentry.client.config.ts
cat gamesformykids/sentry.server.config.ts
cat gamesformykids/sentry.edge.config.ts
```

**Known ignored errors (do not re-report):**
- `ResizeObserver loop limit exceeded`
- `ResizeObserver loop completed`
- `Network Error`
- `Loading chunk \d+ failed`
- `ChunkLoadError`

---

## Phase 2 — Classify the error

For each error, determine:

| Attribute | Value |
|---|---|
| **Boundary** | client / server / edge |
| **User-facing?** | Does it break a game or show a blank screen? |
| **Reproducibility** | Always / Sometimes / Rare |
| **Affected game** | Which `gameType` (if any) |
| **Error category** | See below |

**Error categories:**
- 🔴 **P0 — Game crash**: error that stops a game mid-session (child sees broken screen)
- 🔴 **P0 — Auth failure**: user cannot log in or loses session
- 🟠 **P1 — Degraded UX**: audio not playing, score not saving, animation frozen
- 🟡 **P2 — Background failure**: analytics event failed, non-critical fetch error
- 🟢 **P3 — Noise**: ignored errors, non-actionable browser quirks

---

## Phase 3 — Locate the root cause

```bash
# Find the file mentioned in the stack trace
grep -rn "<ErrorMessage>" gamesformykids/ --include="*.ts" --include="*.tsx" | head -10

# Check for existing error boundaries
grep -rn "ErrorBoundary\|error\.tsx\|error\.ts" gamesformykids/app/ --include="*.tsx" --include="*.ts" | head -20

# Check game store for unhandled state transitions
grep -rn "catch\|try {" gamesformykids/lib/stores/ --include="*.ts" | grep -v "//\|console" | head -20

# Check audio for missing error handling (common source of silent failures)
grep -rn "\.play()\|speechSynthesis\|AudioContext" gamesformykids/hooks/shared/audio/ --include="*.ts" | head -20
```

---

## Phase 4 — Scan mode (no specific error given)

Scan for common error-prone patterns in this project:

```bash
# 1. Unguarded array accesses that could throw
grep -rn "\[0\]\|\[index\]\|\[i\]" gamesformykids/lib/stores/ gamesformykids/hooks/ --include="*.ts" | grep -v "//\|test\|spec" | head -20

# 2. Missing null checks on Supabase results
grep -rn "\.data\." gamesformykids/lib/supabase/ --include="*.ts" | grep -v "data\?\." | grep -v "//\|if (" | head -20

# 3. useEffect with missing cleanup (memory leaks → crashes in long sessions)
grep -rn "useEffect\|setInterval\|setTimeout\|addEventListener" gamesformykids/hooks/ --include="*.ts" | head -30

# 4. Canvas games without null guard on context
grep -rn "getContext\|canvas\." gamesformykids/hooks/canvas/ --include="*.ts" | grep -v "if\|??\|&&\|null\|undefined" | head -20

# 5. Error boundaries missing on game routes
ls gamesformykids/app/games/*/error.tsx 2>/dev/null || echo "No per-game error boundaries found"
```

---

## Phase 5 — Generate fix

For each P0/P1 issue, produce a minimal patch:

**Fix template:**

```
🔴 ISSUE: <short description>
Severity: P0 / P1 / P2
File: <path>:<line>
Root cause: <1 sentence>

FIX:
<diff or code snippet — minimal change only>

TEST: <how to verify the fix manually or via existing tests>
```

For P2/P3, list them in a table without code fixes.

---

## Phase 6 — Output summary

```
SENTRY TRIAGE SUMMARY
=====================
P0 issues: <count> — <fix immediately>
P1 issues: <count> — <fix this sprint>
P2 issues: <count> — <backlog>
P3 / noise: <count> — <ignore or suppress>

Most affected area: <stores / hooks / audio / canvas / auth>
Recommended first fix: <file and change>
```
