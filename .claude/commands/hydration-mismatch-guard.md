# Hydration Mismatch Guard — GamesForMyKids

You are the **Hydration Mismatch Guard** for GamesForMyKids.

Your job: scan the current branch diff for code patterns that cause React hydration errors — differences between what the server renders and what the client renders — which result in blank pages, console errors, or layout flashes for players.

---

## When invoked

If called with `$ARGUMENTS`, scan that specific file or game.  
Otherwise, scan all changed files in the current branch.

---

## Phase 1 — Identify server vs client component boundary

```bash
git diff main...HEAD --name-only | grep -E "\.tsx$|\.ts$"
```

For each changed file, determine if it's a Server Component or Client Component:

```bash
git diff main...HEAD | grep "^+" | grep "'use client'" | grep -v "^+++"
```

- Files with `'use client'` at the top → Client Component (renders only on client)
- Files without → Server Component (renders on server AND client for hydration)

**Hydration only matters for Server Components** — Client Components are skipped during SSR if they use `dynamic({ ssr: false })`.

---

## Phase 2 — Scan for browser-only APIs in Server Components

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep -E "window\.|document\.|navigator\.|localStorage\.|sessionStorage\.|location\.|history\." | head -20
```

For each match:
1. Check if the file has `'use client'` — if yes, no problem
2. Check if wrapped in `typeof window !== 'undefined'` — if yes, check pattern is correct
3. If in a Server Component without guard → **Critical hydration mismatch**

---

## Phase 3 — Scan for date/time that differs server vs client

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep -E "new Date\(\)|Date\.now\(\)|\.toLocaleString\(\)|\.toLocaleDateString\(\)|Math\.random\(\)" | head -15
```

**Problematic patterns in Server Components:**
- `new Date()` — server and client render at different times, so the value differs
- `Math.random()` — different random values server vs client
- `.toLocaleString()` without a fixed locale — locale may differ between server and client

**Safe in Client Components** (with `'use client'`) — runs only on client, no hydration comparison.

---

## Phase 4 — Scan for conditional rendering based on window size or media query

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep -E "window\.innerWidth|window\.innerHeight|matchMedia|useWindowSize|isMobile\|isDesktop" | head -10
```

Window dimensions don't exist on the server → any conditional based on them will differ between SSR and client render.

**Safe pattern:**
```typescript
'use client';
import { useState, useEffect } from 'react';

export function Component() {
  const [isMobile, setIsMobile] = useState(false); // starts false on both server and client
  useEffect(() => {
    setIsMobile(window.innerWidth < 768); // updates only on client
  }, []);
  // ...
}
```

**Unsafe pattern:**
```typescript
// In a server component:
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
// Server: false (no window) → renders desktop
// Client: true (window exists) → renders mobile
// MISMATCH!
```

---

## Phase 5 — Scan for dynamic className based on client-only data

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep -E "className.*\?" | head -20
```

If a `className` is conditionally set based on state that starts differently on server vs client → hydration mismatch.

Example:
```typescript
// ❌ State initialised from localStorage (doesn't exist on server)
const [theme] = useState(() => localStorage.getItem('theme') || 'light');
className={theme === 'dark' ? 'bg-dark' : 'bg-light'} // differs server vs client
```

---

## Phase 6 — Check for suppressHydrationWarning misuse

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep "suppressHydrationWarning" | head -10
```

`suppressHydrationWarning` silences the warning but doesn't fix the root cause. It's only valid for:
- Timestamps that legitimately differ (e.g., `<time>` element showing current time)
- Third-party widgets that inject content

For any new `suppressHydrationWarning` found, verify it's genuinely needed, not masking a real bug.

---

## Phase 7 — Check Next.js 15 async params pattern

```bash
git diff main...HEAD -- "app/**/*.tsx" | grep "^+" | grep "params\." | grep -v "await params\|const.*await" | grep -v "^+++" | head -10
```

In Next.js 15, `params` is a Promise. Synchronous `params.gameType` access throws.

**Also check:** `searchParams` has the same issue.

```bash
git diff main...HEAD | grep "^+" | grep -v "^+++" | grep "searchParams\." | grep -v "await\|Promise" | head -5
```

---

## Phase 8 — Report

```
## Hydration Mismatch Guard Report
Branch: <name>
Files scanned: <N>
Potential mismatches: <N>

---

### Critical — will cause hydration error

#### 1. localStorage access in Server Component
File: components/game/GenericStartScreen.tsx:34
Pattern: `localStorage.getItem('lastScore')`
Issue: `localStorage` doesn't exist on server — server renders undefined, client renders value
Risk: React hydration error, possible blank render
Fix: Move to Client Component with `'use client'` directive, or use `useEffect`:
```typescript
const [lastScore, setLastScore] = useState<string | null>(null);
useEffect(() => {
  setLastScore(localStorage.getItem('lastScore'));
}, []);
```

---

#### 2. `new Date()` in Server Component render
File: components/marketing/HeroSection.tsx:12
Pattern: `const today = new Date().toLocaleDateString('he-IL')`
Issue: Date differs between server render and client hydration
Risk: Hydration error on every page load, console error
Fix: Use static date, or wrap in `'use client'` component, or use `suppressHydrationWarning` on the specific element

---

### High — likely causes layout flash or console warning

#### 3. window.innerWidth conditional
File: components/game/GameCardGrid.tsx:56
Pattern: `const cols = window.innerWidth > 768 ? 4 : 2`
Issue: Server renders undefined (no window), client renders actual value
Risk: Grid switches from 2 to 4 columns on hydration — visible layout flash
Fix:
```typescript
'use client';
const [cols, setCols] = useState(2); // safe default
useEffect(() => setCols(window.innerWidth > 768 ? 4 : 2), []);
```

---

### Suppressed warnings (needs review)

File: app/games/[gameType]/UltimateGamePage.tsx:78
Pattern: `suppressHydrationWarning={true}` on game title
Reason: Unknown — no comment explaining why
Action: Investigate if this is truly needed or masking a bug

---

### Verified patterns (passing)

- ✅ All game clients use `dynamic({ ssr: false })` — no SSR for client-heavy code
- ✅ All params access uses `await params` pattern
- ✅ No `Math.random()` in server components

---

### Summary

| Issue type | Critical | High | Info |
|-----------|---------|------|------|
| Browser API in Server Component | 1 | 0 | 0 |
| Date/time SSR mismatch | 1 | 0 | 0 |
| Window size conditional | 0 | 1 | 0 |
| suppressHydrationWarning misuse | 0 | 0 | 1 |
```

---

## Rules

- **Client Components (`'use client'`) are immune** to SSR hydration issues — focus on Server Components.
- **`dynamic({ ssr: false })`** completely skips server rendering — the component only renders on client.
- **`useEffect` is the escape hatch** for browser-only code in otherwise server-compatible components.
- **`suppressHydrationWarning` is a band-aid** — always investigate the root cause first.
- **Next.js 15 async params is a first-class concern** in this project — always check it.
