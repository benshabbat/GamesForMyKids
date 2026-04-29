---
name: detect-code-duplication
description: "Scan the GamesForMyKids codebase for repeated code patterns (game hooks, MenuScreen components, Zustand store slices, INITIAL_STATE objects, audio init) and open a GitHub issue for each meaningful duplication cluster found. Use when: detecting duplication, finding repeated code, refactoring candidates, DRY violations, extract shared logic, reduce copy-paste, open issues for code quality."
argument-hint: "Optional: focus area (e.g. 'hooks', 'stores', 'menus', 'all')"
---

# Detect Code Duplication & Open GitHub Issues

## When to Use
- Scanning for DRY violations before a refactoring sprint
- Periodic codebase health checks
- Before a PR that touches shared patterns
- When asked to "find duplicate code", "detect repeated patterns", "open refactoring issues"

## Known Duplication Hotspots (as of April 2026)

| Category | Pattern | Files affected | Priority |
|---|---|---|---|
| **Game hooks** | `useXxxGame.ts` — identical state shape + `startGame` + `handleItemClick` + audio init | `app/games/*/use*Game.ts` (~27 files) | High |
| **MenuScreen components** | Same emoji/title/description/score/button UI structure | `app/games/*/components/*MenuScreen.tsx` (~18 files) | High |
| **Zustand store slices** | `createXxxSlice: StateCreator<...> = (set, get) => ({...})` | `app/games/*/store/slices/*Slice.ts`, `lib/stores/**/*Slice.ts` (~16 files) | High |
| **Store reset pattern** | Every store: `reset: () => set(INITIAL_STATE, false, 'ns/reset')` | `lib/stores/*.ts` (~26 files) | Medium |
| **INITIAL_STATE shape** | `{ score, level, isPlaying, showCelebration, ... }` defined independently per game | `app/games/*/use*Game.ts`, `lib/stores/*.ts` (~20+ files) | Medium |
| **Audio/speech init** | `initSpeechAndAudio(...)` called identically in mount effect across game hooks | `app/games/*/use*Game.ts` | Medium |

## Procedure

### Step 1 — Scope
If the user provided an argument, restrict the scan to that category. Otherwise scan all categories.

### Step 2 — Scan Each Category

For each category run a targeted search and collect:
- **Files affected** (list paths)
- **Duplicated lines / blocks** (copy the smallest representative snippet)
- **Count** (how many times does this pattern appear?)
- **Refactoring opportunity** (what abstraction would fix it — base hook, shared component, factory, mixin?)

Use `grep_search` and `semantic_search` for broad sweeps, then `read_file` on representative files to verify the duplication is real.

#### 2a. Game Hooks
```
grep_search: "useState.*isPlaying|useState.*showCelebration|startGame.*useCallback"
includePattern: "app/games/**/*.ts"
```
Confirm at least 3 files share the same state initialization shape.

#### 2b. MenuScreen Components
```
file_search: "app/games/**/*MenuScreen.tsx"
```
Open 3 random results and compare imports, JSX shape, and prop interfaces.

#### 2c. Zustand Slice Pattern
```
grep_search: "StateCreator<"
includePattern: "**/*Slice.ts"
```
Confirm the `(set, get) => ({})` boilerplate repeats across ≥3 slices.

#### 2d. Store Reset Pattern
```
grep_search: "reset: () => set(INITIAL_STATE"
includePattern: "lib/stores/*.ts"
```
Count occurrences.

#### 2e. INITIAL_STATE Shape
```
grep_search: "const INITIAL_STATE|const INIT ="
isRegexp: true
includePattern: "**/*.ts"
```
List files that define nearly identical shapes.

#### 2f. Audio Init Duplication
```
grep_search: "initSpeechAndAudio"
```
Count how many game hooks call this in an identical mount effect.

### Step 3 — Evaluate Severity

Skip opening an issue if:
- Fewer than **3 files** share the pattern
- The duplication is trivially small (1–2 lines) and not error-prone
- An issue for this pattern already exists (search GitHub first)

Open an issue if:
- **≥3 files** share the pattern AND
- The duplication is **≥5 lines** OR is a **structural pattern** (hook shape, component shape, store shape)

### Step 4 — Search for Existing Issues

Before creating, search GitHub for duplicate issues:
```
Use: github-pull-request_doSearch
Query: "label:refactor OR label:code-quality <pattern-name>"
```

### Step 5 — Open GitHub Issues

For each qualifying duplication cluster, create a GitHub issue using `mcp_gitkraken_pull_request_create` or `github-pull-request_doSearch` + `mcp_gitkraken_issues_add_comment`.

**Issue template:**

```markdown
## Problem
<Pattern name> is duplicated across <N> files. Each file independently defines <description>.

## Affected Files
- `path/to/file1.ts`
- `path/to/file2.ts`
- `path/to/file3.ts`
(and N more — see grep results)

## Duplicated Pattern
\`\`\`typescript
// representative snippet (shortest form)
\`\`\`

## Proposed Solution
Extract to `<suggested path>` as a <base hook / shared component / factory function / mixin>.

Benefits: reduces maintenance surface, single source of truth for <behavior>.

## Effort estimate
- [ ] Small (< 1 day) — if pattern is pure extract with no logic change
- [ ] Medium (1–3 days) — if requires interface design + migration
- [ ] Large (> 3 days) — if touches >10 files or needs breaking change
```

**Issue labels to apply:** `refactor`, `code-quality`, `tech-debt`

### Step 6 — Summary Report

After all issues are opened (or skipped), output a markdown table:

| Pattern | Files | Issue | Action |
|---|---|---|---|
| Game hooks state shape | 27 | #XX | Opened |
| MenuScreen structure | 18 | #YY | Opened |
| ... | ... | ... | Skipped (< 3 files) |

## References
- [Known hotspot: game hooks](../../app/games/) — `app/games/*/use*Game.ts`
- [Known hotspot: stores](../../lib/stores/) — `lib/stores/*.ts`
- [Known hotspot: slices](../../lib/stores/building/) and `app/games/*/store/slices/`
- [Existing shared abstractions](../../hooks/games/) — check here before proposing a new abstraction
- [Base game hook](../../lib/quiz/useGenericQuizGame.ts) — already exists for quiz games; check if similar exists for non-quiz games
