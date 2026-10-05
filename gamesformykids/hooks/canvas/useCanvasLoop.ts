'use client';

import { useRef } from 'react';
import { useCanvasAttach } from './useCanvasAttach';

const isDev = process.env.NODE_ENV === 'development';
const PERF_HUD_STORAGE_KEY = 'canvasPerfHud';

/**
 * Game logic runs on a fixed 60 Hz step, independent of the display refresh
 * rate, so per-frame game logic (`x += speed`) moves at the same speed on a
 * 60, 90, 120 or 144 Hz screen.
 */
export const FIXED_STEP_MS = 1000 / 60;
/** Max ticks run for one animation frame while catching up after a slow frame. */
const MAX_TICKS_PER_FRAME = 4;
/** A gap longer than this (hidden tab, debugger pause) is not replayed as game time. */
const MAX_FRAME_GAP_MS = 250;
/** rAF timestamps jitter by a ms or two; without slack a 60 Hz display would occasionally skip/double a tick. */
const STEP_JITTER_MS = 2;

/**
 * Manages the requestAnimationFrame lifecycle for a canvas game loop.
 *
 * Returns a canvasRef to attach to the <canvas> element. The loop runs while
 * that element is mounted — it is fine for the canvas to appear later than the
 * hook (e.g. only in the 'playing' phase) or to be unmounted and re-mounted.
 * Calls `tick(ctx, dt)` on a fixed 60 Hz timestep: `dt` is always
 * FIXED_STEP_MS (~16.67 ms). On a 60 Hz display that is once per animation
 * frame; on a faster display some frames run no tick (the canvas keeps the
 * previous frame); after a slow frame up to 4 ticks run to catch up, and a long
 * pause (hidden tab) is dropped rather than replayed. Games may therefore keep
 * simple per-tick movement (`x += speed`) or scale by `dt` — both run at the
 * same speed on any display. The tick callback is stored in a ref so it may
 * close over game state without causing the effect to re-run.
 *
 * Dev-only perf HUD: press Ctrl+Shift+P while a canvas game is focused to
 * toggle an FPS / worst-frame-time overlay (drawn after each tick, so it
 * shows on top of the game's own rendering). It reports the real display
 * frame rate, not the fixed tick rate. The toggle is remembered in
 * localStorage. Stripped in production builds.
 */
export function useCanvasLoop(
  tick: (ctx: CanvasRenderingContext2D, dt: number) => void,
): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef   = useRef(tick);
  tickRef.current = tick;

  // Starts when the <canvas> element mounts (which may be after this hook's
  // owner first renders) and stops when it unmounts.
  useCanvasAttach(canvasRef, (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId  = 0;
    let last   = performance.now();

    let hudOn         = isDev && window.localStorage.getItem(PERF_HUD_STORAGE_KEY) === '1';
    let frameDts: number[] = [];
    let lastHudUpdate = last;
    let fps           = 0;
    let worstDt       = 0;

    function handleKeyDown(e: KeyboardEvent) {
      if (!(e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p')) return;
      hudOn = !hudOn;
      window.localStorage.setItem(PERF_HUD_STORAGE_KEY, hudOn ? '1' : '0');
      frameDts = [];
    }
    if (isDev) window.addEventListener('keydown', handleKeyDown);

    function drawPerfHud() {
      const label = `${fps} FPS  ${worstDt.toFixed(1)}ms`;
      ctx!.save();
      ctx!.font = '12px monospace';
      const boxWidth = ctx!.measureText(label).width + 12;
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx!.fillRect(4, 4, boxWidth, 18);
      ctx!.fillStyle = fps > 0 && fps < 50 ? '#ff5555' : '#55ff55';
      ctx!.fillText(label, 10, 17);
      ctx!.restore();
    }

    let accumulator = 0;

    function loop(now: number) {
      const dt = Math.max(0, now - last);
      last = now;

      accumulator += dt > MAX_FRAME_GAP_MS ? FIXED_STEP_MS : dt;
      let ticks = 0;
      while (accumulator >= FIXED_STEP_MS - STEP_JITTER_MS && ticks < MAX_TICKS_PER_FRAME) {
        tickRef.current(ctx!, FIXED_STEP_MS);
        accumulator -= FIXED_STEP_MS;
        ticks++;
      }
      // Still behind after the catch-up cap: drop the backlog instead of spiralling.
      if (accumulator >= FIXED_STEP_MS - STEP_JITTER_MS) accumulator = 0;

      if (isDev && hudOn) {
        frameDts.push(dt);
        if (now - lastHudUpdate >= 500) {
          fps     = Math.round(1000 / (frameDts.reduce((a, b) => a + b, 0) / frameDts.length));
          worstDt = Math.max(...frameDts);
          frameDts = [];
          lastHudUpdate = now;
        }
        // Only on frames that ticked, otherwise it would be drawn twice over the previous frame.
        if (ticks > 0) drawPerfHud();
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      if (isDev) window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return canvasRef;
}
