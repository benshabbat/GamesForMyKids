---
name: game-creation
description: This skill should be used when the user asks to "add a new game", "create a game", "יצירת משחק חדש", "תוסיף משחק", names a new game concept and wants it built (e.g. "add a matching game about fruits"), or asks which architecture style a new game idea should use. Provides the decision tree between the five game styles (Generic Card, Generic Quiz, Custom Quiz, Fully Custom, Complex Quiz) and the exact file checklist for each.
---

# Game Creation — GamesForMyKids

All games are served from the single route `gamesformykids/app/games/[gameType]/page.tsx`, which dispatches to one of three renderers based on game type. Every new game fits one of five styles below — pick the cheapest one that fits before writing any code.

## Step 1 — Pick the style

```
New game idea
│
├─ "Learn/recognise items from a list" (animals, colors, flags, professions)?
│   └─ Style A — Generic Card Game        (0-1 new files)
│
├─ Quiz with a standard 4-choice layout, data-only?
│   └─ Style B — Generic Quiz Game        (1 new file)
│
├─ Quiz needing a custom visual question screen?
│   ├─ Fits menu → question → result with a single hook?
│   │   └─ Style C — Custom Quiz (makeQuizGame)   (3-4 new files)
│   └─ Needs its own store / deeply custom multi-phase rendering?
│       └─ Style E — Complex Quiz (standalone component)   (3-5 new files)
│
└─ Arcade / board / canvas / drawing / unique logic (not a quiz)?
    └─ Style D — Fully Custom Game        (3-5 new files)
```

Confirm the style with the user before scaffolding if the idea is ambiguous between two styles.

## Step 2 — Check for duplicate infrastructure first

Before creating anything, apply the [[dry-check]] skill — most "new" needs (stores, quiz hooks, start screens, canvas loops) already exist as a shared factory.

## Step 3 — Scaffold with the command, not by hand

Use the `/game-scaffolder` slash command to generate the actual files and registry edits:

```
/game-scaffolder <game-id> <style-letter> "<Hebrew title>" "<emoji>" "<category>"
```

Example: `/game-scaffolder space-objects A "חפצי חלל" "🚀" "nature"`

`game-scaffolder` discovers the next registry `order` number, checks for game-ID conflicts, generates every file/snippet per the tables below, and runs `tsc --noEmit` after applying. Only write files manually if the user explicitly wants to skip the command.

## Per-style file checklist (reference)

Every style ends with these three common steps — don't skip them:
- **GameType union** — add `| '<game-id>'` to `lib/types/core/base.ts`
- **Registry entry** — add to the right `lib/registry/registryData/batch<N>.ts`
- **Category grid** — add `'<game-id>'` to the `gameIds` array of the right category in `lib/constants/gameCategories.ts` (otherwise the game won't appear on the home page)

### Style A — Generic Card Game (UltimateGamePage)

| File | Action |
|---|---|
| `lib/constants/gameData/<category>.ts` | New file — array of `BaseGameItem` (min ~8 items) + optional `_PRONUNCIATIONS` map (see [[hebrew-content-conventions]]) |
| `lib/constants/gameItemsMap.ts` | Add `'<game-id>': { items, pronunciations }` entry |
| `lib/constants/ui/gameConfigs.<group>.ts` | Add full UI config block (title, colors, steps, metadata) — pick closest group: educational / nature / home-life / activities / advanced / photo-quiz |

**Total new files: 0-1.**

### Style B — Generic Quiz Game (GenericQuizGame, data-only)

| File | Action |
|---|---|
| `lib/quiz/data/<game>.ts` | New file — question array (min 10), shape `{ id, question, answer, emoji, wrongOptions: [string,string,string] }` |
| `lib/quiz/registry/genericQuizGames.tsx` | Register `'<game>': GenericQuizGame` |

**Total new files: 1.**

### Style C — Custom Quiz Game (makeQuizGame factory)

| File | Action |
|---|---|
| `lib/quiz/data/<game>.ts` | Question data, same shape as Style B |
| `lib/quiz/use<Game>Game.ts` | State-machine hook: `phase` = `menu \| playing \| result` |
| `components/game/quiz/screens/<Game>Question.tsx` | Custom question screen (menu/result usually reuse `QuizMenuScreen`/`QuizResultScreen`) |
| `lib/quiz/registry/customQuizGames.tsx` | Register via `makeQuizGame(useMyGame, phaseMap)` |

**Total new files: 3-4.**

### Style D — Fully Custom Game (CustomGameRenderer)

Folder `app/games/<game-id>/`:

| File | Action |
|---|---|
| `<Game>Client.tsx` | `'use client'` entry point |
| `<game>Store.ts` | Zustand store — check `createChallengeStore` first, else `makeStore`/`makePersistStore` from `lib/stores/createStore.ts` |
| `use<Game>.ts` | Game logic hook |
| `components/<Game>Screen.tsx` | Main play area |
| `app/games/[gameType]/CustomGameRenderer.tsx` | Add `'<game-id>': dynamic(() => import('../<game-id>/<Game>Client'))` |
| `app/games/[gameType]/gamePageConstants.ts` | Add to **both** `SUPPORTED_GAMES` and `CUSTOM_GAME_TYPES` |

Canvas games: use `useCanvasLoop` + `useCanvasReady` from `hooks/canvas/`.

**Total new files: 3-5.**

### Style E — Complex Quiz Game (standalone component)

**When to use over C:** needs its own store, or multi-phase rendering too deep for the `{ menu, question, result }` factory signature. Examples in the codebase: `transport`, `holidays`, `tzadikim`.

Folder `app/games/<game-id>/`:

| File | Action |
|---|---|
| `<Game>.tsx` | Top-level `'use client'` component handling menu → question → result internally |
| `<game>Store.ts` | Optional Zustand store |
| `components/<Game>Menu.tsx`, `<Game>Question.tsx`, `<Game>Result.tsx` | Phase screens |
| `lib/quiz/registry/complexQuizGames.tsx` | Register `'<game-id>': dynamic(() => import('@/app/games/<game-id>/<Game>'), { loading: () => <GameSpinnerScreen /> })` |
| `app/games/[gameType]/gamePageConstants.ts` | Add to `SUPPORTED_GAMES` only — **not** `CUSTOM_GAME_TYPES` |

`COMPLEX_QUIZ_GAMES` merges into the quiz router automatically via `lib/quiz/quizGameRegistry.tsx` — never also register the game in `customQuizGames` or `genericQuizGames`.

**Total new files: 3-5.**

## Step 4 — Before calling it done

1. `cd gamesformykids && npx tsc --noEmit` — zero TS errors
2. `npm run build` — zero build errors
3. Load `http://localhost:3000/games/<game-type>` and play it once
4. Confirm the game appears in its home-page category grid
5. Apply the [[pre-pr-checklist]] skill before opening the PR
