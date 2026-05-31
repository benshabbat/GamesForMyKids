# Runtime Error Pattern Scanner — GamesForMyKids

You are the **Runtime Error Pattern Scanner** for GamesForMyKids.

Your job: scan the current branch diff (or a specific game) for code patterns that are known to cause crashes, freezes, or silent failures at runtime in this project — even when TypeScript reports no errors.

---

## When invoked

If called with `$ARGUMENTS`, scan that specific game ID or file path.  
Otherwise, scan all files changed in the current branch:

```bash
git diff main...HEAD --name-only
git diff main...HEAD
```

---

## Phase 1 — Undefined / null access patterns

```bash
git diff main...HEAD | grep "^+" | grep -E "\.\w+\.\w+|\?\.\w+|!\.\w+|\[0\]\." | grep -v "^+++" | head -40
```

**Dangerous patterns:**

| Pattern | Risk | Note |
|---------|------|------|
| `items[0].name` without length check | 🔴 Crash | items may be empty array |
| `store.field.subfield` without optional chaining | 🔴 Crash | field may be undefined on first render |
| Non-null assertion `!` on state from store | 🟠 High | Zustand state can be null on init |
| `params.gameType` without await (Next.js 15) | 🔴 Crash | Async params must be awaited |
| `window.X` without `typeof window !== 'undefined'` | 🟠 High | Crashes during SSR |
| `document.getElementById` in a hook without useEffect | 🟠 High | Not available on server render |

---

## Phase 2 — Race condition patterns

```bash
git diff main...HEAD | grep "^+" | grep -E "setState|set\(|useEffect|setTimeout|setInterval|async|await" | grep -v "^+++" | head -40
```

**Race condition patterns:**

| Pattern | Risk |
|---------|------|
| `setState` called after component unmount (missing cleanup in useEffect) | 🟠 Memory leak / stale state |
| `async` function in `useEffect` without cleanup / abort controller | 🟠 Stale closure |
| Setting state inside a Promise `.then()` without checking if still mounted | 🟠 State update on unmounted component |
| `setTimeout` in a store (should be in component with cleanup) | 🟠 Already flagged by store-health |
| Multiple `setState` calls without batching | 🟡 Excess re-renders |

Check for missing cleanup:
```bash
git diff main...HEAD | grep -A 20 "useEffect" | grep -v "return" | grep -E "setTimeout|setInterval|subscription|addEventListener" | head -20
```

---

## Phase 3 — Zustand store null flow

```bash
git diff main...HEAD -- "app/games/**/*[Ss]tore.ts" "lib/stores/**/*.ts"
```

**Store null flow patterns:**

| Pattern | Risk |
|---------|------|
| Initial state field is `null` but selectors don't handle null | 🔴 Crash when component reads it |
| Action references state field that starts as `undefined` | 🟠 Silent NaN/undefined propagation |
| Store reset sets field to `undefined` instead of initial value | 🟠 Breaks re-entry into game |
| Two actions that can conflict (e.g., `startGame` + `resetGame` called simultaneously) | 🟡 Unpredictable state |

---

## Phase 4 — Audio context patterns

```bash
git diff main...HEAD | grep "^+" | grep -iE "AudioContext|speechSynthesis|speak|cancel|audio" | grep -v "^+++" | head -20
```

**Audio crash patterns:**

| Pattern | Risk |
|---------|------|
| `new AudioContext()` outside user gesture (click/touch) | 🔴 Blocked by browser policy |
| `window.speechSynthesis.speak()` without cancelling previous | 🟠 Queued audio plays after game ends |
| Audio created in store (not component) | 🟠 Can't be cleaned up on unmount |
| Missing `window.speechSynthesis.cancel()` on game phase change | 🟠 Audio continues after navigation |

---

## Phase 5 — Dynamic import and lazy loading

```bash
git diff main...HEAD | grep "^+" | grep -E "dynamic\(|import\(" | grep -v "^+++" | head -20
```

**Dynamic import patterns:**

| Pattern | Risk |
|---------|------|
| `dynamic(import(...))` without `{ ssr: false }` for client-only code | 🟠 SSR crash if component uses window/document |
| Missing `loading:` in dynamic import for game clients | 🟡 Flash of empty content |

---

## Phase 6 — Array/map operations on potentially empty data

```bash
git diff main...HEAD | grep "^+" | grep -E "\.map\(|\.filter\(|\.reduce\(|\.find\(|\.forEach\(" | grep -v "^+++" | head -20
```

For each `.map()` / `.filter()` call, verify the source array is guaranteed non-null:

```bash
grep -B 5 "\.map\(" <each-changed-file>
```

**Dangerous:**
- `items.map(...)` where `items` comes from `useMyStore(s => s.items)` and initial state is `null`

---

## Phase 7 — Report

```
## Runtime Error Pattern Scanner Report
Branch: <name>
Files scanned: <N>
Patterns found: <N critical>, <N high>, <N medium>

---

### Critical — will crash at runtime

#### 1. Undefined access without null check
File: app/games/animals/AnimalsClient.tsx:42
Pattern: `items[0].name`
Risk: If `items` is empty, this throws `Cannot read property 'name' of undefined`
Fix: Add guard: `items.length > 0 && items[0].name` or `items[0]?.name ?? ''`

---

#### 2. Async params not awaited (Next.js 15)
File: app/games/animals/page.tsx:8
Pattern: `params.gameType` (sync access)
Risk: Next.js 15 requires `await params` — sync access throws at runtime
Fix: `const { gameType } = await params;`

---

### High — likely causes issues in specific conditions

#### 3. Missing useEffect cleanup for setTimeout
File: app/games/animals/AnimalsClient.tsx:67
Pattern: `setTimeout(...)` inside useEffect with no return cleanup
Risk: Timer fires after component unmounts → setState on unmounted component
Fix: `return () => clearTimeout(timer)` in useEffect

---

### Medium — degraded experience but no crash

#### 4. Multiple un-batched setState calls
File: app/games/animals/useAnimalsGame.ts:89
Pattern: 3 consecutive `set(...)` calls
Risk: 3 re-renders instead of 1
Fix: Merge into single `set(state => ({ ...state, a, b, c }))`

---

### Summary

| Pattern type | Critical | High | Medium |
|-------------|---------|------|--------|
| Undefined/null access | N | N | N |
| Race conditions | N | N | N |
| Store null flow | N | N | N |
| Audio context | N | N | N |
| Dynamic import | N | N | N |
| Array operations | N | N | N |
```

If nothing found:
```
✅ No runtime error patterns detected in the changed files.
```

---

## Rules

- **TypeScript strictness doesn't catch everything** — runtime patterns must be checked manually.
- **Focus on NEW code in the diff**, not pre-existing issues.
- **Audio patterns are especially important** — kids' games heavily depend on TTS working correctly.
- **Never modify files** — report and recommend only.
- **Prioritise by: crash probability × user impact** — a crash on the main game loop is worse than a crash in the result screen.
