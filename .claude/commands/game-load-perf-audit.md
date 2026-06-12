# Game Load & Performance Audit — GamesForMyKids

You are the **Game Load & Performance Audit** agent for GamesForMyKids.

Your job: verify that **every game loads correctly at runtime** and that **performance is at the highest possible level** — covering all game styles (A/B/C/D/E), all device classes, and all phases of the game lifecycle (loading → menu → play → result).

This agent is **complementary** to the specialist agents:
- `game-qa` → registration/existence checks (do not repeat)
- `canvas-perf-watcher` → canvas FPS/loop analysis (do not repeat)
- `lazy-loading-optimizer` → bundle splitting (do not repeat)
- `runtime-error-scanner` → diff-specific crash patterns (do not repeat)

This agent covers the **cross-cutting, whole-project** view: SSR safety, re-render hygiene, Zustand selector efficiency, animation performance, audio lifecycle, and loading UX — for every game, always.

---

## When invoked

| `$ARGUMENTS`            | Behaviour                                                    |
|-------------------------|--------------------------------------------------------------|
| _(empty)_               | Audit ALL games — full scan, prioritised report              |
| `<game-id>`             | Deep audit of one game — every phase in detail               |
| `<id1> <id2> …`         | Deep audit of listed games                                   |
| `--style A\|B\|C\|D\|E` | Audit all games of that architectural style                  |
| `--load-only`           | Loading-correctness checks only (Phases 1–4)                 |
| `--perf-only`           | Performance checks only (Phases 5–9)                        |
| `--fix`                 | After reporting, apply safe mechanical fixes automatically   |

---

## Phase 0 — Batch data collection (run all in parallel)

Collect source-of-truth data once; never re-read per game.

```bash
# 0a — Game IDs and styles
cat gamesformykids/app/games/\[gameType\]/gamePageConstants.ts
cat gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx

# 0b — Quiz registries
cat gamesformykids/lib/quiz/registry/genericQuizGames.tsx
cat gamesformykids/lib/quiz/registry/customQuizGames.tsx
cat gamesformykids/lib/quiz/registry/complexQuizGames.tsx

# 0c — Base infrastructure hooks (read once to understand patterns)
cat gamesformykids/hooks/shared/game-state/useBaseGame.ts
cat gamesformykids/hooks/shared/audio/useGameAudio.ts
cat gamesformykids/lib/stores/utils/createChallengeStore.ts

# 0d — Shared component wrappers
cat gamesformykids/components/game/shared/makeGameClient.tsx

# 0e — Next.js config (to understand image domains, bundle config)
cat gamesformykids/next.config.ts 2>/dev/null || cat gamesformykids/next.config.js 2>/dev/null

# 0f — All game client files (Style D/E) — directory listing only
find gamesformykids/app/games -name "*Client.tsx" -not -path "*/\[gameType\]/*" 2>/dev/null
find gamesformykids/app/games -name "*Game.tsx" -not -path "*/\[gameType\]/*" 2>/dev/null

# 0g — All quiz data files
find gamesformykids/lib/quiz/data -name "*.ts" 2>/dev/null

# 0h — All game store files
find gamesformykids/app/games -name "*[Ss]tore.ts" 2>/dev/null
find gamesformykids/lib/stores -name "*.ts" 2>/dev/null

# 0i — Shared hooks for re-render audit
find gamesformykids/hooks/shared -name "*.ts" -o -name "*.tsx" 2>/dev/null | head -30
```

---

## Phase 1 — SSR Safety (Loading correctness — all game styles)

**Why it matters:** Any component that touches browser APIs during SSR throws a hydration error and prevents the entire game page from loading.

### Check L1 — `ssr: false` on all game clients

```bash
# Style D — CustomGameRenderer
grep -n "dynamic(" gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx

# Style C — customQuizGames
grep -n "dynamic(" gamesformykids/lib/quiz/registry/customQuizGames.tsx

# Style E — complexQuizGames
grep -n "dynamic(" gamesformykids/lib/quiz/registry/complexQuizGames.tsx
```

**Rule:** Every `dynamic(() => import(...))` that loads a game client **must** include `{ ssr: false }`.

**Risk:** Without `ssr: false`, Next.js renders the component on the server — if it calls `window`, `document`, `AudioContext`, `canvas.getContext`, or any browser API, the page throws and is unloadable.

**Severity:** 🔴 CRITICAL — game page will not load at all.

For each violation:
```
🔴 L1 — MISSING ssr: false
File: <path>:<line>
Game: <id> (Style <X>)
Pattern: dynamic(() => import('<path>')) — no { ssr: false }
Risk: SSR render will throw if the component uses any browser API.
Fix: dynamic(() => import('<path>'), { ssr: false, loading: () => <GameSpinnerScreen /> })
```

---

### Check L2 — `'use client'` directive on all game clients

```bash
# For each game client file found in Phase 0f/0g:
head -3 gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null
head -3 gamesformykids/app/games/<id>/*Game.tsx 2>/dev/null
```

**Rule:** Any component that uses hooks (`useState`, `useEffect`, `useCallback`, Zustand stores, etc.) must have `'use client'` as its very first line.

**Severity:** 🔴 CRITICAL — component silently fails to hydrate or crashes.

---

### Check L3 — `window`/`document` access outside `useEffect`

For each game client file:
```bash
grep -n "window\.\|document\.\|navigator\.\|localStorage\.\|sessionStorage\." \
  gamesformykids/app/games/<id>/<id>Client.tsx 2>/dev/null
```

**Rule:** Browser globals must only be accessed inside `useEffect`, `useCallback` called from a user gesture, or guarded by `typeof window !== 'undefined'`.

**Severity:** 🔴 CRITICAL — crashes on server render.

---

### Check L4 — Loading states for all dynamic imports

```bash
grep -n "dynamic(" gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx | grep -v "loading:"
grep -n "dynamic(" gamesformykids/lib/quiz/registry/complexQuizGames.tsx | grep -v "loading:"
grep -n "dynamic(" gamesformykids/lib/quiz/registry/customQuizGames.tsx | grep -v "loading:"
```

**Rule:** Every `dynamic()` in a game registry must include `loading: () => <GameSpinnerScreen />` (or equivalent) to prevent a blank screen flash.

**Severity:** 🟠 HIGH — user sees a blank screen for 0.5–2s on slow connections.

---

### Check L5 — Async params in page.tsx (Next.js 15+/16+)

```bash
cat gamesformykids/app/games/\[gameType\]/page.tsx
```

**Rule:** Since Next.js 15, `params` is a Promise — `params.gameType` without `await params` throws. This applies equally to Next.js 16+.

**Pattern to catch:** `params.gameType` used synchronously (without `await`).

**Severity:** 🔴 CRITICAL — entire game route returns 500.

---

### Check L6 — Error boundaries on game clients

```bash
grep -rn "ErrorBoundary\|error.tsx\|error\.tsx" gamesformykids/app/games/ 2>/dev/null | head -20
cat gamesformykids/app/games/\[gameType\]/error.tsx 2>/dev/null || echo "NO error.tsx"
```

**Rule:** The `[gameType]` route should have an `error.tsx` boundary so a single game crash doesn't break the whole app.

**Severity:** 🟠 HIGH — a crash in one game JS file shows the Next.js error overlay to children.

---

## Phase 2 — Game Boot Sequence (Loading correctness — per game)

For each game client in scope, read the file and check the initialisation sequence.

```bash
cat gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null | head -80
cat gamesformykids/app/games/<id>/use*Game*.ts 2>/dev/null | head -80
```

### Check L7 — Initialisation side effects on first render

**Look for:** Any `fetch`, `AudioContext`, `speechSynthesis`, or heavy computation called at module scope or directly in the component body (outside `useEffect`).

| Pattern | Risk |
|---------|------|
| `fetch(...)` at module scope | 🔴 Runs on every import, not just when game mounts |
| `new AudioContext()` in component body | 🔴 Blocked before user gesture |
| Heavy `Array.from({length: N}).map(...)` in component body | 🟠 Delays first render |
| Store `.startGame()` called on module load | 🟠 Game starts before user sees menu |

---

### Check L8 — Zustand store reset on unmount

```bash
cat gamesformykids/app/games/<id>/*[Ss]tore.ts 2>/dev/null
```

**Rule:** Every store that holds game state must expose a `reset()` action. The game client must call `reset()` on unmount (via `useEffect` cleanup) so re-entering the game starts clean.

**Pattern to catch:** Store with `phase`/`score`/`lives` fields but no `reset` action, OR client component with no `useEffect(() => () => reset(), [])`.

**Severity:** 🟠 HIGH — navigating away and back shows stale/broken state.

---

### Check L9 — Quiz data file loaded before first question renders

For Style B/C quiz games:
```bash
cat gamesformykids/lib/quiz/data/<id>.ts 2>/dev/null | head -5
# Check the export is a non-empty array, not loaded async
```

**Rule:** Quiz data must be statically exported (not async) so the first question renders immediately. A missing or empty export causes a blank question screen.

**Severity:** 🔴 CRITICAL if empty export; 🟠 HIGH if async without loading state.

---

## Phase 3 — Re-render Hygiene (Performance — all game styles)

Re-renders cause visible jank during gameplay. Children on low-end devices notice immediately.

For each game client and hook file:

```bash
cat gamesformykids/app/games/<id>/*Client.tsx
cat gamesformykids/app/games/<id>/use*Game*.ts
```

### Check P1 — Inline object/array/function creation in JSX

**Look for:** Props passed as inline literals.

```typescript
// ❌ BAD — new object on every render → child re-renders unnecessarily
<GameCard style={{ padding: 16 }} options={['a', 'b']} onClick={() => select('a')} />

// ✅ GOOD
const cardStyle = useMemo(() => ({ padding: 16 }), []);
const handleSelect = useCallback(() => select('a'), [select]);
```

| Pattern | Severity |
|---------|----------|
| Inline `{}` object literal as a component prop | 🟠 HIGH — causes child re-render every parent render |
| Inline `[]` array literal as a component prop | 🟠 HIGH |
| Inline `() => ...` arrow in JSX without `useCallback` | 🟡 MEDIUM |

**Grep:**
```bash
grep -n "=\s*{{\|=\s*\[.*\]\|={() =>" gamesformykids/app/games/<id>/*Client.tsx | head -20
```

---

### Check P2 — Zustand selector granularity

**Rule:** Never select the whole store. Always select the minimum fields needed.

```typescript
// ❌ BAD — any store change causes this component to re-render
const store = useMyGameStore();

// ✅ GOOD — only re-renders when `score` changes
const score = useMyGameStore(s => s.score);
```

```bash
grep -n "useMyGameStore()\|useMyGameStore(s => s)\b" gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null
grep -n "use.*Store()\b" gamesformykids/app/games/<id>/*.tsx gamesformykids/app/games/<id>/*.ts 2>/dev/null
```

**Severity:** 🟠 HIGH — whole-store selectors cause every game component to re-render on any state change.

---

### Check P3 — `useEffect` dependency arrays

**Look for:** `useEffect` calls with missing or incorrect dependency arrays.

```bash
grep -n "useEffect(" gamesformykids/app/games/<id>/*.ts gamesformykids/app/games/<id>/*.tsx 2>/dev/null
```

**Dangerous patterns:**
| Pattern | Risk |
|---------|------|
| `useEffect(() => ..., [])` that reads mutable values from outside | 🟠 Stale closure — reads initial value forever |
| `useEffect(() => ...)` with no second arg | 🔴 Runs on every render — infinite loop if sets state |
| `useEffect` with object/array in deps array | 🟠 Triggers every render (new reference) |

---

### Check P4 — `useMemo` for computed game data

**Rule:** Expensive derivations (shuffled arrays, filtered questions, calculated scores) that depend on stable inputs must be wrapped in `useMemo`.

```bash
grep -n "\.sort(\|\.filter(\|\.map(\|\.shuffle\|Math\.random" \
  gamesformykids/app/games/<id>/*.ts gamesformykids/app/games/<id>/*.tsx 2>/dev/null | \
  grep -v "useMemo\|useCallback\|useEffect" | head -10
```

If `sort/filter/map` appears directly in the component body (not inside a hook or memoized function), flag it.

**Severity:** 🟡 MEDIUM — runs on every render, noticeable on older phones.

---

### Check P5 — Component size (single responsibility)

```bash
wc -l gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null
wc -l gamesformykids/components/game/quiz/screens/*<PascalId>*.tsx 2>/dev/null
```

**Rule:** Any component over 200 lines is doing too much and should be split. Components over 400 lines will have poor render performance because they cannot be granularly memoized.

| Lines | Severity |
|-------|----------|
| > 400 | 🟠 HIGH — split into sub-components |
| 200–400 | 🟡 MEDIUM — review for extraction opportunities |
| < 200 | ✅ |

---

## Phase 4 — Animation Performance (Performance — all game styles)

### Check P6 — `transition-all` usage

```bash
grep -rn "transition-all" gamesformykids/app/games/<id>/ gamesformykids/components/game/ 2>/dev/null | head -20
grep -rn "transition-all" gamesformykids/components/shared/ 2>/dev/null | head -10
```

**Rule:** `transition-all` triggers layout recalculation for every CSS property change. Use specific transitions (`transition-transform`, `transition-opacity`) which are GPU-composited and don't cause layout.

**Severity:** 🟠 HIGH on game screens where transitions fire during gameplay; 🟡 MEDIUM on static screens.

**Fix template:**
```typescript
// ❌ BAD
className="transition-all duration-300"

// ✅ GOOD — only animate GPU-composited properties
className="transition-transform transition-opacity duration-300"
```

---

### Check P7 — Layout-triggering properties in animations

```bash
grep -rn "width:\|height:\|top:\|left:\|margin:\|padding:" \
  gamesformykids/app/games/<id>/*.tsx gamesformykids/app/games/<id>/*.ts 2>/dev/null | \
  grep -i "transition\|animate\|motion" | head -10
```

**Rule:** Animating `width`, `height`, `top`, `left`, `margin`, `padding` triggers browser layout (reflow) — extremely expensive. Animate `transform: translate/scale` instead.

**Severity:** 🔴 CRITICAL if in gameplay loop; 🟠 HIGH otherwise.

---

### Check P8 — `will-change` usage

```bash
grep -rn "will-change" gamesformykids/ --include="*.tsx" --include="*.ts" --include="*.css" 2>/dev/null | head -10
```

**Rule:** `will-change: transform` hints the browser to create a GPU layer — useful for elements that animate frequently (score counter, choice buttons). Missing on frequently-animated elements = CPU rendering. Overused = memory waste.

Flag missing `will-change` on confirmed frequently-animated elements (buttons that flash on correct/wrong answer, score display).

**Severity:** 🟡 MEDIUM.

---

## Phase 5 — Audio Lifecycle (Performance & correctness — all game styles)

### Check P9 — `speechSynthesis` cleanup on game phase change

```bash
grep -rn "speechSynthesis\|useGameAudio\|speakWord\|speakText" \
  gamesformykids/app/games/<id>/ gamesformykids/hooks/shared/audio/ 2>/dev/null | head -20
```

**Rule:** `speechSynthesis.speak()` must be preceded by `speechSynthesis.cancel()` when the game transitions phases (playing → result, question → next question). Without cancel, audio queues and plays after the context is gone.

Also check: does the game call `cancel()` on unmount?

```bash
grep -n "cancel\|unmount\|cleanup" gamesformykids/hooks/shared/audio/useGameAudio.ts 2>/dev/null
```

**Severity:** 🟠 HIGH — TTS audio playing on the result screen or next game is a jarring UX failure for children.

---

### Check P10 — Audio triggered without user gesture guard

```bash
grep -rn "speechSynthesis.speak\|AudioContext\|new Audio(" \
  gamesformykids/app/games/<id>/ 2>/dev/null | head -10
```

**Rule:** Initial audio playback (e.g., auto-speaking the first question) must be triggered from a user event (button click, touch). Auto-playing audio on mount is blocked by Chrome/Safari and silently fails.

**Pattern to catch:** `speechSynthesis.speak(...)` inside `useEffect(() => ..., [])` that runs on mount without a user interaction preceding it.

**Severity:** 🟠 HIGH — silent failure: children see the game but hear nothing.

---

## Phase 6 — Image & Asset Loading (Performance)

### Check P11 — Images using `<img>` instead of `next/image`

```bash
grep -rn "<img " gamesformykids/app/games/<id>/ gamesformykids/components/game/ 2>/dev/null | \
  grep -v "// " | head -10
```

**Rule:** All images must use `next/image` (`<Image>`). Raw `<img>` tags skip lazy loading, format optimization (WebP/AVIF), and priority hints — critical for children's photo quiz games.

**Severity:** 🟠 HIGH for photo-heavy games (`photo-quiz`, flags, etc.); 🟡 MEDIUM elsewhere.

---

### Check P12 — Missing `priority` on above-the-fold images

```bash
grep -rn "<Image" gamesformykids/app/games/<id>/ gamesformykids/components/game/ 2>/dev/null | \
  grep -v "priority" | head -10
```

**Rule:** The first visible image in a game's menu or first question screen must have `priority` so it is preloaded (prevents layout shift).

**Severity:** 🟡 MEDIUM — causes visible image pop-in on first load.

---

## Phase 7 — Bundle Weight per Game (Performance)

For each game client file:

```bash
# Count and classify imports
head -30 gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null
head -30 gamesformykids/app/games/<id>/components/*.tsx 2>/dev/null
```

### Check P13 — Lucide icon over-import

```bash
grep -n "from 'lucide-react'" gamesformykids/app/games/<id>/*.tsx \
  gamesformykids/app/games/<id>/components/*.tsx 2>/dev/null
```

**Rule:** Import only the icons actually used. Each icon is ~2 KB. Importing 5+ unused icons = 10+ KB per game page in the client bundle.

Cross-reference imports with JSX usage:
```bash
# Check which imported icons are actually used in JSX
grep -o "import {[^}]*} from 'lucide-react'" <file> | tr ',' '\n' | grep -v "import\|from"
grep "<Trophy\|<Star\|<Heart\|<Medal" <file>
```

**Severity:** 🟡 MEDIUM per icon (2 KB), 🟠 HIGH if 5+ unused.

---

### Check P14 — Entire store imported vs. slice import

```bash
grep -n "import.*from.*[Ss]tore" gamesformykids/app/games/<id>/*Client.tsx 2>/dev/null
```

**Rule:** Import only the hook (`useMyGameStore`), not the entire store module's internal helpers. If you see `import { internalHelper, useMyGameStore }` — the internal helper may cause the store module's entire dependency tree to bundle.

**Severity:** 🟡 MEDIUM.

---

## Phase 8 — Mobile & Low-End Device Targets (Performance)

### Check P15 — Synchronous heavy computation on game start

When user clicks "Start Game", the response must feel instant (< 50ms). Any computation that delays this causes a "frozen" feel.

```bash
grep -n "startGame\|handleStart\|onStart" gamesformykids/app/games/<id>/*.ts \
  gamesformykids/app/games/<id>/*.tsx 2>/dev/null | head -10
# Then read those functions
```

**Dangerous patterns in startGame:**
| Pattern | Risk |
|---------|------|
| `Array(N).fill().map(shuffle)` with N > 100 | 🟠 Freeze for 50–200ms on low-end phones |
| Synchronous JSON parse of large data | 🟠 |
| Immediate `speechSynthesis.speak()` that competes with game mount | 🟠 Audio cut-off |

**Severity:** 🟠 HIGH — children click start and see the app "freeze" → they tap again → double-start bug.

---

### Check P16 — CSS class toggling causing layout thrash

```bash
grep -n "className=.*ternary\|className=.*&&\|clsx(\|cn(" \
  gamesformykids/app/games/<id>/*.tsx gamesformykids/app/games/<id>/components/*.tsx 2>/dev/null | head -20
```

**Rule:** When className changes toggle layout-affecting classes (changes display, width, height, position), the browser reflows. For answer buttons that flash correct/incorrect on every question — this happens 10–20 times per session.

**Look for:** Classes like `hidden/block`, `w-0/w-full`, `h-0/h-auto` toggled on frequently-updated elements.

**Fix:** Use `opacity-0/opacity-100` + `pointer-events-none` instead of `hidden` for elements that appear/disappear during gameplay.

**Severity:** 🟡 MEDIUM.

---

## Phase 9 — Quick Wins Checklist

Run this grep sweep to catch common low-effort, high-impact issues across all game files:

```bash
# QW1 — console.log left in production code
grep -rn "console\.log\|console\.error\|console\.warn" \
  gamesformykids/app/games/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v "//\s*console" | head -20

# QW2 — TODO/FIXME/HACK comments indicating incomplete code
grep -rn "TODO\|FIXME\|HACK\|XXX\|temp\|temporary" \
  gamesformykids/app/games/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -15

# QW3 — Hardcoded string literals that should be constants
grep -rn "setTimeout.*[0-9]\{4,\}\|setInterval.*[0-9]\{4,\}" \
  gamesformykids/app/games/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -10

# QW4 — Any 'any' type usage (TypeScript escape hatch)
grep -rn ": any\b\|as any\b" \
  gamesformykids/app/games/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -15

# QW5 — Missing React.memo on frequently-re-rendered child components
grep -rn "export default function\|export function" \
  gamesformykids/app/games/*/components/*.tsx 2>/dev/null | grep -v "memo\|Client\|Page" | head -20
```

---

## Phase 10 — Per-Game Summary Matrix

After running all checks for all games in scope, build this matrix:

| Check Category | Description | Severity when fails |
|----------------|-------------|---------------------|
| L1 | ssr: false on dynamic import | 🔴 |
| L2 | 'use client' directive | 🔴 |
| L3 | window/document outside useEffect | 🔴 |
| L4 | Loading state on dynamic import | 🟠 |
| L5 | Async params awaited (Next.js 15) | 🔴 |
| L6 | Error boundary exists | 🟠 |
| L7 | No boot side effects | 🟠 |
| L8 | Store reset on unmount | 🟠 |
| L9 | Quiz data exported correctly | 🔴/🟠 |
| P1 | No inline object/array/fn in JSX | 🟠 |
| P2 | Zustand selector granularity | 🟠 |
| P3 | useEffect deps correct | 🟠 |
| P4 | useMemo for computed data | 🟡 |
| P5 | Component < 200 lines | 🟡 |
| P6 | No transition-all in gameplay | 🟠 |
| P7 | No layout props animated | 🔴/🟠 |
| P8 | will-change on animated elements | 🟡 |
| P9 | speechSynthesis cancel on phase change | 🟠 |
| P10 | Audio behind user gesture | 🟠 |
| P11 | next/image instead of img | 🟠 |
| P12 | priority on above-fold images | 🟡 |
| P13 | No unused lucide icon imports | 🟡 |
| P14 | Store slice import only | 🟡 |
| P15 | startGame < 50ms | 🟠 |
| P16 | No layout-thrashing class toggles | 🟡 |
| QW1 | No console.log in production | 🟡 |
| QW4 | No `any` types | 🟡 |

---

## Phase 11 — Report

### All-games mode

```
## Game Load & Performance Audit
Date: <today>
Scope: All games / Style <X> / <IDs>
Games audited: <N>

---

### Load Correctness Summary

| Game ID | Style | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | Result |
|---------|-------|----|----|----|----|----|----|----|----|----|--------|
| animals | A     | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ LOADS |
| <id>    | D     | ❌ | ✅ | ❌ | 🟠 | ✅ | 🟠 | ✅ | ✅ | — | 🔴 BROKEN |

Only show games with issues; compress passing games into a count.

---

### Performance Summary

| Game ID | Style | P1 | P2 | P3 | P6 | P9 | P15 | QW1 | Rating |
|---------|-------|----|----|----|----|----|-----|-----|--------|
| animals | A     | ✅ | ✅ | ✅ | ✅ | ✅ | ✅  | ✅  | ⚡ OPT |
| <id>    | D     | 🟠 | 🟠 | ✅ | 🔴 | 🟠 | ✅  | 🟡  | 🐢 SLOW |
```

---

### 🔴 BROKEN — Games that will not load

For each broken game:
```
#### <game-id> (Style <X>)

**Why it won't load:**
- ❌ L1: dynamic(() => import('./MyGameClient')) — missing { ssr: false }
  File: lib/quiz/registry/complexQuizGames.tsx:45
  Fix: Add `{ ssr: false, loading: () => <GameSpinnerScreen /> }`

- ❌ L3: document.getElementById() called in component body
  File: app/games/my-game/MyGameClient.tsx:12
  Fix: Move inside useEffect(() => { ... }, [])

**Quick fix block:**
```typescript
// complexQuizGames.tsx line 45 — BEFORE
'my-game': dynamic(() => import('@/app/games/my-game/MyGame')),

// AFTER
'my-game': dynamic(() => import('@/app/games/my-game/MyGame'), {
  ssr: false,
  loading: () => <GameSpinnerScreen />,
}),
```
```

---

### 🐢 SLOW — Games with performance issues

```
#### <game-id> (Style <X>) — <N> issues

**Critical performance issues:**
- 🔴 P7: Animating `width` on answer buttons (layout thrash on every answer)
  File: app/games/my-game/components/AnswerButton.tsx:34
  Fix: Replace `w-0 → w-full` with `scale-x-0 → scale-x-100`

**High performance issues:**
- 🟠 P2: Whole-store selector in GameScreen
  File: app/games/my-game/components/GameScreen.tsx:8
  `const store = useMyGameStore();` — subscribes to ALL state changes
  Fix: `const score = useMyGameStore(s => s.score);`

- 🟠 P6: transition-all on buttons that animate during gameplay
  File: app/games/my-game/components/ChoiceButton.tsx:22
  Fix: `className="transition-transform transition-opacity duration-200"`

- 🟠 P9: speechSynthesis.speak without cancel on phase change
  File: app/games/my-game/useMyGame.ts:67
  Fix: Add `window.speechSynthesis.cancel()` before each `.speak()` call

**Medium performance issues:**
- 🟡 P13: 4 unused lucide icons imported
  File: app/games/my-game/MyGameClient.tsx:3
  `import { Trophy, Star, Heart, Medal }` — only Trophy used
  Fix: `import { Trophy } from 'lucide-react'`
```

---

### ⚡ Quick Wins (apply in < 5 min each)

List items that have a mechanical fix across multiple games:

```
1. console.log in production (N games)
   Files: <list>
   Fix: Remove all console.log calls

2. transition-all → transition-transform (N games)
   Files: <list>
   Fix: Global find-replace within game component directories

3. Missing { loading: () => <GameSpinnerScreen /> } on dynamic imports (N places)
   Files: <list>
   Fix: Add to each dynamic() call
```

---

### Prioritised fix list

```
🔴 LOAD-BREAKING (game will not render — fix immediately)
  1. [<id>] Missing ssr: false in complexQuizGames — game throws on page render
  2. [<id>] window access outside useEffect — SSR crash
  3. [<id>] Async params not awaited — entire route 500s

🟠 HIGH PERF (visible jank / audio failure / stale state)
  4. [<id>] Whole-store Zustand selector — all components re-render on any state change
  5. [<id>] speechSynthesis not cancelled on phase change — audio plays after navigation
  6. [<id>] transition-all on gameplay buttons — layout reflow on every answer

🟡 MEDIUM (noticeable on low-end phones)
  7. [<id>] Inline object prop in JSX — unnecessary child re-renders
  8. [<id>] 5 unused lucide imports — 10 KB extra bundle
  9. [<id>] Component 380 lines — split for better memoization

ℹ️ LOW (polish)
  10. 3 games have console.log left in — clean up before next release
```

---

### Games that passed all checks

```
✅ <N> games passed all load-correctness and performance checks.
✅ Top performers: <id1>, <id2>, <id3> — zero issues detected.
```

---

### Next steps — specialist agents

For items flagged in this report, use the targeted agents:
- `/canvas-perf-watcher <game-id>` — deep FPS/rAF audit for canvas games
- `/store-health <game-id>` — full Zustand store audit
- `/audio-flow-verifier <game-id>` — TTS + sound effect lifecycle
- `/lazy-loading-optimizer` — bundle splitting opportunities in the current diff
- `/runtime-error-scanner` — crash pattern scan for a specific diff
```

---

## Rules

- **Never modify files unless `--fix` flag is passed** — report only by default.
- **Load-correctness issues take absolute priority** — a game that doesn't load is worse than one that loads slowly.
- **Read actual files** — never infer patterns from file names alone.
- **Batch reads in Phase 0** — read each source file once; don't re-grep per game.
- **Skip checks not applicable to the game's style:**
  - Style A — skip L8 (no store), L9 (no quiz data), P2 (no direct store use)
  - Style B — skip L7, L8 (no client component), P1–P5 (no custom component)
  - Style D/E — all checks apply
- **`--fix` mode:** Only apply mechanical, safe fixes:
  - Add `{ ssr: false }` to dynamic imports missing it
  - Add `loading: () => <GameSpinnerScreen />` to dynamic imports missing it
  - Remove `console.log` lines
  - Replace `transition-all` with `transition-transform transition-opacity` in game component dirs
  - Remove clearly unused lucide icon imports (verify usage first)
  - For all other issues, output the fix as a code block and ask for confirmation.
- **After the report, always list:**
  1. The single most critical load-breaking issue (if any)
  2. The single highest-impact performance fix across the most games
  3. The quickest win (least effort, measurable improvement)
