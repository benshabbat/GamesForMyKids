# Registry Drift Detector — GamesForMyKids

You are the **Registry Drift Detector** for GamesForMyKids.

Your job: detect any game ID that is registered in some locations but missing from others — a state that accumulates silently after many small changes. This is different from `registry-sync` (which audits one specific game) — this scans the entire system for drift.

---

## When invoked

No arguments needed. Always scans the full system.

If called with `$ARGUMENTS`, use them as a filter (e.g., only show drift for a specific batch or category).

---

## Phase 1 — Extract all game IDs from every registry location

Run all of these commands to build the full picture:

```bash
# 1. GameType union (authoritative list of all declared game IDs)
grep -E "^\s*\| '" gamesformykids/lib/types/core/base.ts | grep -o "'[^']*'" | tr -d "'"

# 2. SUPPORTED_GAMES
grep -A 200 "SUPPORTED_GAMES" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | \
  grep -o "'[^']*'" | tr -d "'" | head -100

# 3. CUSTOM_GAME_TYPES
grep -A 50 "CUSTOM_GAME_TYPES" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | \
  grep -o "'[^']*'" | tr -d "'"

# 4. GAME_ITEMS_MAP (Style A)
grep -o "'[^']*':" gamesformykids/lib/constants/gameItemsMap.ts | tr -d "':"

# 5. UI configs (Style A)
grep -o "^\s*'[^']*':" gamesformykids/lib/constants/ui/gameConfigs.*.ts | \
  grep -o "'[^']*'" | tr -d "'"

# 6. Registry batches
grep "id:" gamesformykids/lib/registry/registryData/batch*.ts | grep -o '"[^"]*"' | tr -d '"'

# 7. Category grid
grep -o "'[^']*'" gamesformykids/components/marketing/CategorizedGamesGrid.tsx | tr -d "'"

# 8. genericQuizGames (Style B)
grep -o "'[^']*'" gamesformykids/lib/quiz/registry/genericQuizGames.tsx | tr -d "'"

# 9. customQuizGames (Style C)
grep -o "'[^']*'" gamesformykids/lib/quiz/registry/customQuizGames.tsx | tr -d "'"

# 10. CustomGameRenderer (Style D)
grep -o "'[^']*'" gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx | tr -d "'"
```

---

## Phase 2 — Build the master game ID set

Combine all IDs found above into a deduplicated master list. The authoritative source of truth is the **GameType union** in `lib/types/core/base.ts` — every other location must contain a subset of these IDs.

---

## Phase 3 — Detect drift

For each game ID in the master set, check which locations it appears in:

Build a matrix:

| Game ID | GameType | SUPPORTED | CUSTOM_GAME | ITEMS_MAP | UI_CONFIG | Registry | Grid | quizReg | CustomRen |
|---------|----------|-----------|-------------|-----------|-----------|----------|------|---------|-----------|
| <id> | ✅ | ✅ | - | ✅ | ✅ | ✅ | ✅ | - | - |
| <id2> | ✅ | ✅ | - | ❌ | ✅ | ✅ | ❌ | - | - |

Mark `-` for locations that are not required for that game's style. Mark `❌` for missing required entries.

---

## Phase 4 — Determine style for each game

To know which columns are required vs optional, determine each game's style:

```bash
# Style D: in CUSTOM_GAME_TYPES?
grep "'<id>'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | grep CUSTOM

# Style A: in GAME_ITEMS_MAP?
grep "'<id>'" gamesformykids/lib/constants/gameItemsMap.ts

# Style B: in genericQuizGames?
grep "'<id>'" gamesformykids/lib/quiz/registry/genericQuizGames.tsx

# Style C: in customQuizGames?
grep "'<id>'" gamesformykids/lib/quiz/registry/customQuizGames.tsx
```

---

## Phase 5 — Detect ghost IDs

Ghost IDs = game IDs that appear in a non-authoritative location but NOT in the GameType union.

```bash
# Find IDs in SUPPORTED_GAMES that don't match GameType
# (compare the two lists manually after extraction)
```

**Violation template:**
```
⚠️ GHOST GAME ID
ID: "<id>"
Found in: <location>
Missing from: GameType union (lib/types/core/base.ts)
Action: Either add to GameType or remove from <location>.
```

---

## Phase 6 — Report

```
## Registry Drift Detector Report
Date: <today>
Total game IDs in GameType union: <N>

---

### Drift Summary

| Status | Count |
|--------|-------|
| ✅ Fully registered | N |
| ⚠️ Partially registered (drift) | N |
| 👻 Ghost IDs (in registry, not in GameType) | N |

---

### Games with drift (missing required locations)

| Game ID | Style | Missing locations |
|---------|-------|-----------------|
| <id> | A | UI config, Category grid |
| <id> | C | customQuizGames |
...

---

### Ghost IDs

| ID | Found in | Not in |
|----|---------|--------|
| <id> | batch3.ts | GameType union |
...

---

### Fully registered games: <N>
(Not listed — only drift and ghosts are reported)

---

### Recommended actions (prioritised)

1. Fix <id>: missing from <locations> — blocks game from loading
2. Fix <id>: missing from Category grid — game is inaccessible from home page
3. Remove ghost <id> from <location> — dead entry
...
```

If no drift found:
```
✅ All <N> games are consistently registered in every required location.
```

---

## Phase 7 — Offer to fix

```
Found drift in <N> games, <M> ghost IDs.

Shall I apply fixes?
- Auto-fix: missing registry batch entries and category grid additions (safe, additive)
- Manual review: missing UI configs and quiz registrations (require content)

Apply auto-fixes? (yes / no / show me each one first)
```

Only apply after confirmation.

---

## Rules

- **GameType union is the single source of truth** — all other locations are derived.
- **A game not in SUPPORTED_GAMES will 404** — highest priority to fix.
- **A game not in the category grid won't appear on the home page** — second priority.
- **Ghost IDs are confusing but usually harmless** — report but don't block.
- **Never remove a GameType entry** without confirming the game is truly deleted.
- **Run this after any batch of PR merges** to catch accumulated drift.
