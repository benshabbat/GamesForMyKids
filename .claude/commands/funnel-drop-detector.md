# Funnel Drop Detector — GamesForMyKids

You are the **Funnel Drop Detector** for GamesForMyKids.

Your job: analyse the game flow code for a given game and identify points where users are most likely to abandon — missing feedback, confusing transitions, dead ends, or slow paths — then rate each drop point by severity.

---

## When invoked

Requires `$ARGUMENTS` with a game ID (e.g., `animals`, `colors`, `riddles`).  
If no arguments given, scan all games changed in the current branch.

---

## Phase 1 — Identify the game's flow architecture

```bash
# Find the game's main files
find gamesformykids/app/games/<id> -name "*.tsx" -o -name "*.ts" 2>/dev/null | head -10
find gamesformykids/lib/quiz -name "*<id>*" 2>/dev/null | head -5
```

Determine the game style:
- **Style A** (card game): `UltimateGamePage` → challenge loop
- **Style B/C** (quiz): `menu → playing → result` phases
- **Style D** (custom): game-specific phase machine

Read the phase machine / flow logic:

```bash
grep -rn "phase\|Phase\|setPhase\|'menu'\|'playing'\|'result'\|'idle'" \
  gamesformykids/app/games/<id>/ gamesformykids/lib/quiz/ --include="*.ts" --include="*.tsx" | head -30
```

---

## Phase 2 — Map the user funnel

Build the funnel steps from the code:

```
Step 1: Home page → game link click
Step 2: Game page load (start screen)
Step 3: User clicks "Start" → first question/challenge appears
Step 4: User answers first question
Step 5: User completes all questions
Step 6: Result screen shown
Step 7: User clicks "Play again" or navigates away
```

For each step, check the code for abandonment risks.

---

## Phase 3 — Drop point analysis

### Drop 1: Page load time

```bash
# Check for heavy imports in the game client
head -20 gamesformykids/app/games/<id>/<id>Client.tsx 2>/dev/null
grep -n "import" gamesformykids/app/games/<id>/<id>Client.tsx 2>/dev/null | head -15
```

**Risks:**
- No `loading:` in `dynamic()` import → blank screen during load
- Large data file imported synchronously → delays first paint
- No `ssr: false` for client-only code → SSR error blocks render

### Drop 2: Start screen friction

```bash
grep -rn "GenericStartScreen\|UltimateStartScreen\|MenuScreen\|onStart\|startGame" \
  gamesformykids/app/games/<id>/ gamesformykids/components/game/quiz/screens/ --include="*.tsx" | head -10
```

**Risks:**
- No start screen at all → game starts immediately, may confuse young users
- Start screen with too much text → kids abandon before reading
- Start button not visible on mobile (below the fold)
- Missing `tip` or instructions in UI config

### Drop 3: First question delay

```bash
# Check time between startGame and first question render
grep -rn "startGame\|pickNext\|setPhase\|generateChallenge" \
  gamesformykids/app/games/<id>/ gamesformykids/lib/quiz/ --include="*.ts" | head -15
```

**Risks:**
- `startGame` calls async function without loading state → blank screen
- First question requires data fetch → noticeable delay
- Audio fires before visual content is ready → audio plays to a blank screen (very confusing for kids)

### Drop 4: During gameplay

```bash
# Check feedback after answering
grep -rn "correct\|incorrect\|feedback\|celebration\|wrong\|right" \
  gamesformykids/app/games/<id>/ --include="*.tsx" | head -15
```

**Risks:**
- No visual/audio feedback after correct answer → kids don't know if they were right
- No visual/audio feedback after wrong answer → no learning moment
- Next question appears instantly (< 500ms) → kids can't process feedback
- Infinite game with no progress indicator → kids don't know how much is left

### Drop 5: Result screen

```bash
# Check result/completion screens
grep -rn "GameResultCard\|GameCompletionCelebration\|CelebrationBox\|ResultScreen\|result" \
  gamesformykids/app/games/<id>/ --include="*.tsx" | head -10
```

**Risks:**
- No result screen → game ends abruptly, kids confused
- No "play again" button → dead end
- Score not shown → no motivation to improve
- Result screen auto-navigates away too quickly

---

## Phase 4 — Check for dead-end states

```bash
# States that set phase to a value with no exit transition
grep -rn "setPhase\|set({.*phase" gamesformykids/app/games/<id>/ --include="*.ts" --include="*.tsx" | head -15
```

For each phase set in the code, verify there's a UI path to exit it:
- `phase === 'error'` → is there an error boundary or retry button?
- `phase === 'result'` → is there a "play again" button that resets to 'menu'?
- `phase === 'loading'` → is there a timeout fallback if data never arrives?

---

## Phase 5 — Report

```
## Funnel Drop Detector Report
Game: <id> (Style <A/B/C/D>)

---

### Funnel map

```
[Home] → [Game page load] → [Start screen] → [Question 1] → [Questions 2-N] → [Result]
   5%            10%              20%              40%             15%            10%
   ↑ Estimated relative drop probability at each step (based on code analysis, not real data)
```

---

### Drop point findings

#### Drop 2: Start screen — HIGH RISK
File: app/games/<id>/<id>Client.tsx
Issue: No start screen — game starts immediately on page load
Impact: Kids may not understand what game they're in
Fix: Add `GenericStartScreen` before the first challenge

#### Drop 3: First question delay — MEDIUM RISK
File: lib/quiz/use<id>Game.ts:34
Issue: `startGame` calls `generateQuestion()` which is synchronous but renders
  nothing while Zustand state updates on the next tick
Impact: ~100ms blank flash between start and first question
Fix: Initialise `currentQuestion` to a default value in store initial state

#### Drop 4: No wrong-answer feedback — HIGH RISK
File: app/games/<id>/components/<id>Question.tsx:67
Issue: Correct answers trigger celebration but wrong answers immediately
  advance to next question with no visual or audio feedback
Impact: Learning opportunity missed; kids may feel confused and frustrated
Fix: Add a brief visual shake + audio "oops" on wrong answer before advancing

#### Drop 5: No "play again" button — CRITICAL
File: app/games/<id>/components/<id>Result.tsx
Issue: Result screen has no replay button — only a "home" button
Impact: Players who want to replay must navigate back through home page
Fix: Add `onRestart` handler that resets store and returns to menu/start phase

---

### Dead-end states

| Phase | Exit path | Status |
|-------|-----------|--------|
| 'menu' | Start button → 'playing' | ✅ |
| 'playing' | Complete N questions → 'result' | ✅ |
| 'result' | ❌ No restart button | ❌ Dead end |
| 'error' | ❌ No error UI rendered | ❌ Invisible dead end |

---

### Summary

| Drop point | Risk | Impact |
|-----------|------|--------|
| Page load | 🟢 Low | Fast load |
| Start screen | 🟠 High | Missing start screen |
| First question | 🟡 Medium | Brief blank flash |
| During play | 🟠 High | No wrong-answer feedback |
| Result screen | 🔴 Critical | Dead end, no replay |
```

---

## Rules

- **Kids 4–8 are the primary audience** — they have very low tolerance for confusion or dead ends.
- **Audio feedback is as important as visual** for this age group.
- **Never assume data from analytics** — base all findings on code analysis.
- **"Play again" is non-negotiable** — every result screen must have it.
- **Estimate drop probability as "low/medium/high"**, not percentages — we don't have real data.
- **Focus on the 3 most impactful drop points**, not an exhaustive list.
