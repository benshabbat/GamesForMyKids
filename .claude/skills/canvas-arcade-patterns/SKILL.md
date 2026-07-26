---
name: canvas-arcade-patterns
description: This skill should be used before writing or fixing any canvas/requestAnimationFrame-based arcade game in the GamesForMyKids codebase — snake, pong, frogger, flappy-bird, brick-breaker, balloon-pop, catch-fruit, whack-a-mole, meteor-dodge, space-defender, reflex, color-tap, simon, stack, jumper, dino-runner, maze, candy-match, letter-merge, number-merge, letter-slicer, letter-bubble-shooter, and similar. Triggers whenever the user asks to "add an arcade game", "fix the game loop", "tune game speed/difficulty", or describes a bug involving canvas rendering, touch/mouse controls, or frame timing. Prevents hand-rolling a rAF loop or coordinate-scaling logic that already exists.
---

# Canvas Arcade Game Patterns — GamesForMyKids

This codebase has a shared canvas-game engine under `hooks/canvas/`. Before writing a new `useEffect` + `requestAnimationFrame` loop, or new pointer-coordinate math, check whether it already exists.

## Step 1 — Use the shared hooks, don't hand-roll

| About to write... | Use this instead |
|---|---|
| A `requestAnimationFrame` loop with manual cleanup | `useCanvasLoop(tick)` in `hooks/canvas/useCanvasLoop.ts` — handles `cancelAnimationFrame` cleanup and a dev-only perf HUD for you |
| A full game hook (state + loop + pointer input + score save) for a single-pointer-axis game (paddle/player-X control) | `createCanvasArcadeHook(config)` in `hooks/canvas/createCanvasArcadeHook.ts` — see the file's own header comment for a usage example |
| Mouse/touch → canvas-coordinate conversion | Don't use raw `e.clientX`. Scale by `canvasWidth / boundingClientRect.width` — see `createCanvasArcadeHook`'s `handleMouseMove`/`handleTouchMove`, or grep an existing game's input handler |
| Score persistence on game-over | `useGameCompletion(gameType)` → `saveGameResultRef.current({score, level, durationSeconds})` — don't write a raw Supabase call |
| Canvas responsive resize | `useCanvasResize.ts` |
| Canvas-ready gating (avoid drawing before mount) | `useCanvasReady.ts` |

## Step 2 — Not every existing game uses the factory

`createCanvasArcadeHook` postdates several games (frogger, whack-a-mole, brick-breaker hand-roll `useCanvasLoop` directly). When editing an existing game, match its current pattern — don't migrate it to the factory as a side effect of an unrelated change. When adding a **new** game, prefer the factory if the control scheme fits (single pointer axis); fall back to raw `useCanvasLoop` for multi-directional/keyboard-driven games (snake-style).

## Step 3 — Per-game file convention

```
<Game>Client.tsx    'use client' entry, dynamic-imported from CustomGameRenderer
<Game>Game.tsx       canvas element + orchestration
use<Game>Game.ts     state/loop hook
*Draw.ts             pure draw functions (kept separate from state in most games)
use<Game>Input.ts     keyboard/touch mapping (multi-directional games)
<game>Store.ts        Zustand store — phase/score/level
<game>Constants.ts    tunable numbers — check here before hardcoding a speed/size/spawn-rate
```

Tune difficulty/speed via the `*Constants.ts` file, not inline magic numbers.

## Step 4 — Dev perf HUD

`Ctrl+Shift+P` while a canvas game is focused (dev builds only) toggles an FPS/worst-frame-time overlay, persisted in `localStorage['canvasPerfHud']`. Use this to verify a fix actually stopped the loop on game-over, or to check frame timing on a suspected performance regression — don't add a separate debug overlay.

## Step 5 — Registration (new game only)

Same as any Style D game: `GameType` union in `lib/types/core/base.ts` (arcade games group), `CustomGameRenderer.tsx` dynamic import, both `SUPPORTED_GAMES` and `CUSTOM_GAME_TYPES` in `gamePageConstants.ts`, registry entry in `lib/registry/registryData/batch<N>.ts`, `gameIds` in `lib/constants/gameCategories.ts`.

For deeper guidance and bug-class patterns (rAF cleanup leaks, coordinate-scaling bugs), delegate to the `arcade-canvas-builder` agent rather than working through this alone on a non-trivial task.
