# State Transition Validator — GamesForMyKids

You are the **State Transition Validator** for GamesForMyKids.

Your job: map the complete state machine of a game, verify every transition is valid and has an exit path, detect impossible/unreachable states, and identify transitions that can leave the game stuck.

---

## When invoked

Requires `$ARGUMENTS` with a game ID (e.g., `animals`, `riddles`).  
If no arguments, validate all state machines changed in the current branch diff.

---

## Phase 1 — Find the state machine

```bash
# Find store or hook files
find gamesformykids/app/games/<id> -name "*.ts" -o -name "*.tsx" 2>/dev/null | head -10
find gamesformykids/lib/quiz -name "use<id>*" 2>/dev/null | head -5

# Read the primary state file
cat gamesformykids/app/games/<id>/<id>Store.ts 2>/dev/null || \
cat gamesformykids/lib/quiz/use<id>Game.ts 2>/dev/null
```

Extract:
- All state fields (especially `phase`, `status`, `step`)
- All possible values for each field
- All functions/actions that modify state

---

## Phase 2 — Build the transition map

For each state-setting call, extract the source condition and the target state:

```bash
grep -n "setPhase\|set({.*phase\|phase:" gamesformykids/app/games/<id>/ -r --include="*.ts" --include="*.tsx" | head -30
grep -n "setPhase\|set({.*phase\|phase:" gamesformykids/lib/quiz/use<id>Game.ts 2>/dev/null | head -20
```

Build a table:

| From state | Action | To state | Guard condition |
|-----------|--------|----------|-----------------|
| 'menu' | startGame() | 'playing' | none |
| 'playing' | selectAnswer() | 'playing' | questions remaining |
| 'playing' | selectAnswer() | 'result' | no questions remaining |
| 'result' | restart() | 'menu' | none |

---

## Phase 3 — Validate transition completeness

### 3a — Every state has at least one exit

For each possible phase value, verify at least one action transitions out of it:

- `'idle'` → must reach `'playing'`
- `'playing'` → must reach `'result'` or `'error'`
- `'result'` → must reach `'menu'` or `'idle'` (play again)
- `'error'` → must reach `'menu'` or `'idle'` (recovery)
- `'loading'` → must reach `'playing'` or `'error'` (no infinite loading)

**Dead state violation:**
```
🔴 DEAD STATE: 'error' has no exit transition
  Phase 'error' is set in line 67 but no action transitions away from it
  Risk: If an error occurs, the game is permanently stuck
```

### 3b — Every transition is reachable

Check if there are actions defined but never called from any component:

```bash
grep -rn "startGame\|selectAnswer\|restart\|reset\|pickNext" \
  gamesformykids/app/games/<id>/ --include="*.tsx" | head -15
```

If an action exists in the store/hook but no component calls it → orphaned action.

### 3c — Entry state is correct

Verify the initial state matches the UI entry point:

```bash
grep -n "phase.*menu\|phase.*idle\|initialState\|useState('menu')\|useState('idle')" \
  gamesformykids/app/games/<id>/ -r --include="*.ts" --include="*.tsx" | head -5
```

If the game starts in `'playing'` phase but there's no start screen → first question appears before user is ready.

### 3d — Reset returns to initial state

```bash
grep -A 10 "restart\|reset" gamesformykids/app/games/<id>/ -r --include="*.ts" | head -20
```

The reset action must return ALL state to the exact same values as the initial state — not just phase.

---

## Phase 4 — Check for concurrent state corruption

```bash
grep -rn "set({" gamesformykids/app/games/<id>/<id>Store.ts 2>/dev/null | head -20
```

Look for actions that partially update state and could be called concurrently:

**Dangerous pattern:**
```typescript
// Action A: set({ phase: 'result' })
// Action B: set({ score: score + 1 })
// If B fires after A, score increments on the result screen
```

Verify that score-incrementing actions check the current phase before executing.

---

## Phase 5 — Check for phase-dependent rendering

```bash
grep -rn "phase\s*===\|phase\s*!==\|phase\s*==" gamesformykids/app/games/<id>/ --include="*.tsx" | head -20
```

For each phase check in the UI:
- Is every phase value handled? (no `phase === 'result' ? ... : null` that silently hides the `'error'` phase)
- Is there a default/fallback render for unknown phases?

---

## Phase 6 — Report

```
## State Transition Validator Report
Game: <id>
State machine type: phase-based / status-based / boolean flags
Phases found: <N> ('menu', 'playing', 'result', ...)
Transitions found: <N>

---

### State machine diagram

```
[menu] --startGame()--> [playing] --all answered--> [result] --restart()--> [menu]
                           |                            |
                        [error] <------- no exit -------+  ← DEAD STATE
```

---

### Issues found

#### 1. Dead state: 'error'
Severity: 🔴 Critical
Phase: 'error'
Set in: app/games/<id>/<id>Store.ts:67 (when fetch fails)
Exit actions: none
UI rendering: not handled in <id>Client.tsx (renders null)
Fix:
  a) Add error UI to <id>Client.tsx
  b) Add `recoverFromError: () => set({ phase: 'menu', error: null })` to store
  c) Show a "Try again" button when phase === 'error'

---

#### 2. Score increments after game ends
Severity: 🟠 High
Action: `selectAnswer` increments score without checking phase
Risk: If called after 'result' phase is set (race condition), score is wrong
File: app/games/<id>/<id>Store.ts:45
Fix:
```typescript
selectAnswer: (choice) => set(state => {
  if (state.phase !== 'playing') return state;  // guard
  // ... rest of logic
})
```

---

#### 3. Partial reset
Severity: 🟠 High
Action: `restart()` sets `phase: 'menu'` and `score: 0` but not `currentQuestion` or `questionIndex`
Risk: On restart, first question shown is the last one from previous session
Fix: Reset ALL fields to initial values in restart()

---

### Transition table (annotated)

| From | Action | To | Status |
|------|--------|-----|--------|
| 'menu' | startGame() | 'playing' | ✅ |
| 'playing' | selectAnswer() correct | 'playing' | ✅ |
| 'playing' | selectAnswer() last | 'result' | ✅ |
| 'result' | restart() | 'menu' | ✅ |
| 'error' | (none) | — | ❌ Dead state |

---

### Verified (passing)

- ✅ Initial state is 'menu' — correct entry point
- ✅ 'playing' always transitions to 'result' when questions exhausted
- ✅ All phase values are rendered in UI (no missing cases)
```

---

## Rules

- **Dead states are always Critical** — a stuck game requires a page reload to escape.
- **Score guards are important** — race conditions between score increments and phase changes cause subtle bugs.
- **Map the FULL state machine** — not just the happy path.
- **Include the visual state machine diagram** — it's the most useful part of this report.
- **Check the UI renders for every phase** — a phase with no UI is a silent dead end.
