'use client';

/**
 * createCanvasArcadeHook — factory for canvas arcade game hooks.
 *
 * Abstracts the structural boilerplate shared by 8+ canvas games:
 *   • `st = useRef(initialState())` — zero-re-render game state
 *   • `useCanvasLoop(draw)` — requestAnimationFrame loop
 *   • Pointer handlers that transform clientX → canvas coordinates
 *   • `useGameCompletion` for Supabase score persistence
 *
 * Usage
 * ─────
 * ```ts
 * const _useMyGame = createCanvasArcadeHook({
 *   gameType:     'my-game',
 *   width:        400,
 *   height:       300,
 *   initialState: () => ({ phase: 'menu' as Phase, playerX: 200, score: 0 }),
 *   draw:         (ctx, s, dt) => { /* update + render *\/ },
 *   onPointerX:   (s, x) => { s.playerX = Math.max(20, Math.min(380, x)); },
 * });
 *
 * export function useMyGame() {
 *   const { st, canvasRef, saveGameResultRef, handlers } = _useMyGame();
 *   const startGame = useCallback(() => {
 *     const s = st.current;
 *     s.phase = 'playing';
 *     s.score = 0;
 *     s.playerX = 200;
 *     MyGameStore.getState().startPlaying();
 *   }, [st]);
 *   ...
 *   return { canvasRef, startGame, ...handlers };
 * }
 * ```
 */

import { useRef, useCallback, MutableRefObject } from 'react';
import type { GameType } from '@/lib/types';
import { useCanvasLoop } from './useCanvasLoop';
import { useGameCompletion } from '@/hooks/shared/progress';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CanvasArcadeConfig<S extends { phase: string }> {
  /** GameType key used for Supabase score persistence (useGameCompletion). */
  gameType: GameType;
  /** Canvas width in game pixels (used for coordinate scaling). */
  width:    number;
  /** Canvas height in game pixels (used for coordinate scaling). */
  height:   number;
  /**
   * Factory that returns the initial ref state.
   * Called once per hook mount — do NOT return a module-level constant
   * (it would be shared across mounts and not reset between games).
   */
  initialState: () => S;
  /**
   * Game loop tick — called every animation frame.
   * @param ctx  2D canvas context
   * @param state  mutable game state (mutate directly — no setState)
   * @param dt   milliseconds since the previous frame
   */
  draw: (ctx: CanvasRenderingContext2D, state: S, dt: number) => void;
  /**
   * Optional pointer-X handler — called on mouse/touch move while playing.
   * Receives the x position in *game* coordinates (already scaled + biased).
   * Mutate `state` directly to update the player position.
   */
  onPointerX?: (state: S, canvasX: number) => void;
}

export interface CanvasArcadeReturn<S extends { phase: string }> {
  /** Ref to attach to <canvas>. Wired to the rAF loop automatically. */
  canvasRef:        React.RefObject<HTMLCanvasElement | null>;
  /** Mutable game-state ref. Read / write inside startGame / die / draw. */
  st:               MutableRefObject<S>;
  /** From useGameCompletion — call in the die/end function to persist scores. */
  saveGameResultRef: ReturnType<typeof useGameCompletion>['saveGameResultRef'];
  /** Pre-built event handlers ready to spread onto <canvas>. */
  handlers: {
    onMouseMove:  (e: React.MouseEvent<HTMLCanvasElement>)  => void;
    onTouchMove:  (e: React.TouchEvent<HTMLCanvasElement>)  => void;
  };
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createCanvasArcadeHook<S extends { phase: string }>(
  config: CanvasArcadeConfig<S>,
) {
  return function useCanvasArcadeHook(): CanvasArcadeReturn<S> {
    const { saveGameResultRef } = useGameCompletion(config.gameType);
    const st = useRef<S>(config.initialState());

    // Wire the draw callback into the rAF loop.
    // `tick` is a stable arrow so the ref-based tickRef inside useCanvasLoop
    // picks up changes to `config.draw` on every render without re-running the effect.
    const canvasRef = useCanvasLoop((ctx, dt) => {
      config.draw(ctx, st.current, dt);
    });

    // ── Pointer handlers ───────────────────────────────────────────────────────

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (st.current.phase !== 'playing' || !config.onPointerX) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const canvasX = (e.clientX - rect.left) * (config.width / rect.width);
        config.onPointerX(st.current, canvasX);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        if (st.current.phase !== 'playing' || !config.onPointerX) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const canvasX =
          (e.touches[0].clientX - rect.left) * (config.width / rect.width);
        config.onPointerX(st.current, canvasX);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    return {
      canvasRef,
      st,
      saveGameResultRef,
      handlers: { onMouseMove: handleMouseMove, onTouchMove: handleTouchMove },
    };
  };
}
