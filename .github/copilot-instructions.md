# GamesForMyKids — Copilot Instructions

This project is a Next.js 14 (App Router) children's educational games platform written in TypeScript, using Zustand for state, Tailwind CSS for styling, and Supabase for auth/data. The UI is in Hebrew.

---

## Stack

- **Framework**: Next.js 14 App Router (`app/`)
- **Language**: TypeScript (strict)
- **State**: Zustand (factories in `lib/stores/`)
- **Styling**: Tailwind CSS + `globals.css`
- **Auth/DB**: Supabase (`lib/supabase/`)
- **Tests**: Vitest (unit) + Playwright (e2e)
- **Errors**: Sentry

---

## Anti-Duplication Rules (MANDATORY before writing any new code)

Always grep for existing infrastructure before creating anything new:

| You want to write...            | Grep first                                                 |
|---------------------------------|------------------------------------------------------------|
| New Zustand store               | `createChallengeStore` in `lib/stores/utils/`              |
| New quiz hook                   | `useGenericQuizGame\|createCategoryIndexQuizHook` in `lib/quiz/` |
| New quiz game component         | `makeQuizGame\|GenericQuizGame` in `lib/quiz/`             |
| New start screen                | `GenericStartScreen` in `components/shared/screens/`       |
| New start screen (rich)         | `UltimateStartScreen` in `components/game/universal/`      |
| New canvas game loop            | `useCanvasLoop\|useCanvasReady` in `hooks/canvas/`         |
| New score/progress bar          | `GameResultCard\|ProgressDisplay\|LivesDisplay` in `components/` |
| New celebration/feedback        | `GameCompletionCelebration\|CelebrationBox\|feedbackUtils` |
| New card/grid layout            | `SimpleCard\|AdvancedCard\|GameCardGrid\|PhotoGameCard` in `components/shared/cards/` |
| New game client wrapper         | `makeGameClient` in `components/game/shared/`              |
| New phase-based hook            | `createPhaseGameHook` in `hooks/shared/progress/`          |
| New game item data              | `lib/constants/gameData/` — may already exist              |
| New UI config for a game        | `GAME_UI_CONFIGS` in `lib/constants/ui/`                   |
| New GameType                    | `GameType` union in `lib/types/core/base.ts` only          |

---

## Key Locations

```
lib/stores/utils/createChallengeStore.ts   — factory for challenge-based Zustand stores
lib/quiz/makeQuizGame.tsx                  — factory for quiz game components
lib/quiz/createCategoryIndexQuizHook.ts    — factory for category quiz hooks
components/game/shared/makeGameClient.tsx  — factory to wrap a client component (no-SSR)
hooks/shared/progress/createPhaseGameHook.ts — factory for multi-phase game hooks
hooks/shared/game-state/useBaseGame.ts     — base game state hook (score, level, phase)
hooks/shared/audio/useGameAudio.ts         — TTS + sound effects
hooks/canvas/useCanvasLoop.ts             — requestAnimationFrame loop for canvas games
lib/constants/gameData/                   — ALL game item data lives here
lib/constants/ui/                         — ALL game UI configs live here
lib/types/core/base.ts                    — GameType union (the ONLY place)
lib/registry/registryData/               — game registry batches
lib/constants/gameCategories.ts          — home page category grid
app/games/[gameType]/gamePageConstants.ts — SUPPORTED_GAMES, CUSTOM_GAME_TYPES
```

---

## Hard Rules

- **Never** define `GameType` outside `lib/types/core/base.ts`
- **Never** create a new Zustand store without checking `createChallengeStore` first
- **Never** create a new start screen without checking `GenericStartScreen` / `UltimateStartScreen`
- **Never** create a new quiz without using `makeQuizGame` or `GenericQuizGame`
- **Never** duplicate game item data — check `lib/constants/gameData/` first
- **Never** write raw `fetch` for game data — use `gameItemsLoader.ts`
- **Always** add `| 'my-game'` to `GameType` in `lib/types/core/base.ts`
- **Always** add to `SUPPORTED_GAMES` in `gamePageConstants.ts`
- **Always** add to a `lib/registry/registryData/batch<N>.ts`
- **Always** add to `lib/constants/gameCategories.ts`

---

## Before Opening a PR

1. `cd gamesformykids && npx tsc --noEmit` — zero TypeScript errors
2. `npm run build` — zero build errors
3. Test the game at `http://localhost:3000/games/<game-type>`
4. Verify it appears in the home page category grid
5. Every PR body must contain `Closes #NNN`
