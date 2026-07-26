---
name: dry-check
description: This skill should be used before writing any new Zustand store, quiz hook, quiz component, start screen, canvas game loop, score/progress display, celebration/feedback component, card/grid layout, start button, game client wrapper, phase-based hook, or new game item data in the GamesForMyKids codebase. Triggers whenever the user asks to "add a store", "create a hook", "new component", "add game data", or any task that sounds like new game infrastructure. Prevents duplicating the project's rich shared factories.
---

# Anti-Duplicate Code Check — GamesForMyKids

This codebase has rich shared infrastructure. Before writing anything that looks new, grep for the existing factory or component that already covers it — most "new" needs are already solved.

## Step 1 — Grep before writing

| About to write... | Grep this first |
|---|---|
| A new Zustand store | `createChallengeStore\|makeStore\|makePersistStore` in `lib/stores/` |
| A new quiz hook | `useGenericQuizGame\|createCategoryIndexQuizHook` in `lib/quiz/` |
| A new quiz game component | `makeQuizGame\|GenericQuizGame` in `lib/quiz/` |
| A new "start screen" component | `GenericStartScreen` in `components/shared/screens/`, `UltimateStartScreen` in `components/game/universal/ultimate-game/` |
| A new canvas game loop | `useCanvasLoop\|createCanvasArcadeHook\|useCanvasReady\|useCanvasResize` in `hooks/canvas/` — see also the [[canvas-arcade-patterns]] skill |
| A new score/progress bar | `GameResultCard\|ProgressDisplay\|LivesDisplay` in `components/` |
| A new celebration/feedback | `GameCompletionCelebration\|CelebrationBox\|feedbackUtils` |
| A new card/grid layout | `SimpleCard\|AdvancedCard\|GameCardGrid\|PhotoGameCard` in `components/shared/cards/` |
| A new start button | `SimpleGameStartButton\|GameStatsButton` in `components/shared/buttons/` |
| A new game client wrapper | `makeGameClient` in `components/game/shared/` |
| A new phase-based hook | `createPhaseGameHook` in `hooks/shared/progress/` |
| New game item data | `lib/constants/gameData/` — the data may already exist under a different export name |
| New UI config for a game | `GAME_UI_CONFIGS` in `lib/constants/ui/` — check all `gameConfigs.*.ts` files |
| New game type in TypeScript | `GameType` union in `lib/types/core/base.ts` — add there, never a new type file |

## Step 2 — Key shared infrastructure files

```
lib/stores/utils/createChallengeStore.ts     — factory for challenge-based Zustand stores
lib/quiz/makeQuizGame.tsx                    — factory for quiz game components
lib/quiz/createCategoryIndexQuizHook.ts      — factory for category quiz hooks
components/game/shared/makeGameClient.tsx    — factory to wrap a client component (no-SSR)
hooks/shared/progress/createPhaseGameHook.ts — factory for multi-phase game hooks
hooks/shared/game-state/useBaseGame.ts       — base game state hook (score, level, phase)
hooks/shared/audio/useGameAudio.ts           — TTS + sound effects
hooks/shared/progress/useSessionStats.ts     — session-level progress tracking
hooks/canvas/useCanvasLoop.ts                — requestAnimationFrame loop for canvas games
```

## Step 3 — Hard rules

- Never create a new store unless `createChallengeStore` and the existing stores genuinely don't fit — state the reason before writing one from scratch.
- Never create a new quiz component — use `makeQuizGame` (custom) or `GenericQuizGame` (data-only).
- Never create a new start screen — use `GenericStartScreen` or `UltimateStartScreen`.
- Never add a `GameType` in a local file — it must go in `lib/types/core/base.ts`.
- Never duplicate game item data — all items live in `lib/constants/gameData/`. Check before adding.
- Never write a raw `fetch` for game data — use the existing `gameItemsLoader.ts` server loader.

## Step 4 — After writing, audit the diff

Run `/dry-guard` (optionally with a path argument) to scan the actual diff against these rules before committing — it catches violations this pre-check might miss once real code exists.
