---
name: create-new-game
description: "Create a new game in GamesForMyKids end-to-end, following CLAUDE.md rules. Use when: adding a new game, creating a game, new game type, implement game, build game, new quiz, new card game, new arcade game. Picks the right style (A–E), runs anti-duplication checks, then walks through every required file in order."
argument-hint: "Game idea, e.g. 'פירות' or 'animals card game' or 'capital cities quiz'"
---

# Create New Game — End-to-End

## When to Use
- "צור משחק חדש", "add a new game", "new game type", "implement a quiz about X"
- Any time a game doesn't exist yet in the registry

## Step 0 — Anti-Duplication Checks (MANDATORY)

Before writing a single line of code, run these greps:

```
grep_search: createChallengeStore|makeStore|makePersistStore   in lib/stores/
grep_search: useGenericQuizGame|createCategoryIndexQuizHook    in lib/quiz/
grep_search: makeQuizGame|GenericQuizGame                      in lib/quiz/
grep_search: GenericStartScreen                                in components/shared/screens/
grep_search: UltimateStartScreen                               in components/game/universal/
grep_search: useCanvasLoop|useCanvasReady                      in hooks/canvas/
grep_search: GAME_ITEMS_MAP                                    in lib/constants/gameItemsMap.ts
grep_search: GAME_UI_CONFIGS|gameConfigs                       in lib/constants/ui/
grep_search: GameType                                          in lib/types/core/base.ts
```

Check if similar game data already exists in `lib/constants/gameData/` before creating new data.

## Step 1 — Decide Style (Decision Tree)

```
New game idea
│
├─ Learn/recognise items from a list (animals, colors, fruits, professions)?
│   └─ YES → Style A (Generic Card Game) — 0-1 new files
│
├─ Quiz with standard 4-choice layout, static questions?
│   └─ YES → Style B (GenericQuizGame) — 1 new file
│
├─ Quiz needing a custom visual question screen (clock, color mixer, grid)?
│   ├─ Fits makeQuizGame factory (hook + 3 phases)?
│   │   └─ YES → Style C (makeQuizGame) — 3-4 new files
│   └─ Needs own store / complex multi-phase rendering?
│       └─ YES → Style E (Complex Quiz, standalone) — 3-5 new files
│
└─ Arcade / board / canvas / drawing / unique gameplay logic (not a quiz)?
    └─ YES → Style D (Custom Game) — 3-5 new files
```

Announce the chosen style and confirm with the user before proceeding if ambiguous.

---

## Style A — Generic Card Game (UltimateGamePage)

**Trigger**: game is about recognising/learning items from a vocabulary list.

### Files to touch (in order):

1. **`lib/constants/gameData/<category>.ts`** — create if category is new:
   ```typescript
   import type { BaseGameItem } from "@/lib/types/core/base";
   export const MY_ITEMS: BaseGameItem[] = [
     { name: "item1", hebrew: "פריט א", english: "Item A", emoji: "🎈", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
   ];
   export const MY_PRONUNCIATIONS: Record<string, string> = { "item1": "פריט אֶחָד" };
   ```

2. **`lib/constants/gameItemsMap.ts`** — add entry:
   ```typescript
   'my-game': { items: MY_ITEMS, pronunciations: MY_PRONUNCIATIONS },
   ```

3. **`lib/constants/ui/gameConfigs.<group>.ts`** — add UI config (pick closest group: educational, nature, home-life, activities, advanced, photo-quiz).

4. **`lib/types/core/base.ts`** — add `| 'my-game'` to `GameType` union in the correct thematic group.

5. **`app/games/[gameType]/gamePageConstants.ts`** — add `'my-game'` to `SUPPORTED_GAMES` (card games section only, NOT `CUSTOM_GAME_TYPES`).

6. **`lib/registry/registryData/batch<N>.ts`** — add registry entry with id, title, description, icon, emoji, color, href, available, order.

7. **`lib/constants/gameCategories.ts`** — add `'my-game'` to `gameIds` of the appropriate category.

**Total new files: 0-1.**

---

## Style B — Generic Quiz Game (data-only)

**Trigger**: simple Q&A quiz with standard 4-choice layout, static data.

1. **`lib/quiz/data/<game>.ts`** — create question data (minimum 10 questions).
2. **`lib/quiz/registry/genericQuizGames.tsx`** — register `'my-quiz': GenericQuizGame`.
3. Wire data inside `GenericQuizGame` data-selector (look at `riddles` or `capitals` for the pattern).
4. Steps 4-7 from Style A (GameType, SUPPORTED_GAMES, registry, categories).

**Total new files: 1.**

---

## Style C — Custom Visual Quiz (makeQuizGame factory)

**Trigger**: quiz with custom question screen but standard menu/result flow.

1. **`lib/quiz/data/<game>.ts`** — question data.
2. **`lib/quiz/use<Game>Game.ts`** — hook (menu/playing/result state machine).
3. **`components/game/quiz/screens/<Game>MenuScreen.tsx`** — use existing `QuizMenuScreen` when it fits.
4. **`components/game/quiz/screens/<Game>Question.tsx`** — custom question screen.
5. **`lib/quiz/registry/customQuizGames.tsx`** — register with `makeQuizGame(...)`.
6. Steps 4-7 from Style A.

**Total new files: 3-4.**

---

## Style D — Fully Custom Game (CustomGameRenderer)

**Trigger**: arcade, board, canvas, drawing, or unique gameplay.

Folder: `app/games/my-game/`

1. **`myGameStore.ts`** — Zustand store. Use `createChallengeStore` if challenge-based; otherwise a minimal store.
2. **`useMyGame.ts`** — game logic hook.
3. **`MyGameClient.tsx`** — `'use client'` entry component. Use `useCanvasLoop` + `useCanvasReady` from `hooks/canvas/` for canvas games.
4. **`components/MyGameScreen.tsx`** — main play area.
5. **`app/games/[gameType]/CustomGameRenderer.tsx`** — add dynamic import.
6. **`app/games/[gameType]/gamePageConstants.ts`** — add to **both** `SUPPORTED_GAMES` and `CUSTOM_GAME_TYPES`.
7. Steps from Style A: GameType union, registry batch, categories.

**Total new files: 3-5.**

---

## Style E — Complex Quiz (standalone component)

**Trigger**: quiz that needs its own store, deeply complex multi-phase rendering.

Folder: `app/games/my-game/`

1. **`myGameStore.ts`** — Zustand store.
2. **`MyGame.tsx`** — top-level `'use client'` component (menu → question → result phases).
3. **`components/MyGameMenu.tsx`**, **`MyGameQuestion.tsx`**, **`MyGameResult.tsx`**.
4. **`lib/quiz/registry/complexQuizGames.tsx`** — register with `dynamic(() => import(...))`.
5. Steps from Style A: GameType union, SUPPORTED_GAMES, registry, categories.
   - Do NOT add to `customQuizGames` or `genericQuizGames` — `complexQuizGames` is merged automatically.

**Total new files: 3-5.**

---

## Step 2 — Implementation

Follow the file list for the chosen style in order.
After each file, verify no TypeScript errors introduced (`grep_search` for the new type/export name).

## Step 3 — Validation (Before Done)

Run these in `gamesformykids/`:

```bash
npx tsc --noEmit          # zero TS errors
npm run build             # zero build errors
```

Then verify:
- Game accessible at `http://localhost:3000/games/<game-type>`
- Game appears in the home-page category grid
- Registry entry shows correct emoji, title, href

## Step 4 — PR Checklist

- PR body contains `Closes #NNN`
- All CI checks pass (`gh pr checks`)
