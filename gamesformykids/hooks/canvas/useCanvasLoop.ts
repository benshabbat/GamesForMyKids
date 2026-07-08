'use client';

import { useEffect, useRef } from 'react';

const isDev = process.env.NODE_ENV === 'development';
const PERF_HUD_STORAGE_KEY = 'canvasPerfHud';

/**
 * Manages the requestAnimationFrame lifecycle for a canvas game loop.
 *
 * Returns a canvasRef to attach to the <canvas> element.
 * Calls `tick(ctx, dt)` every frame where dt is milliseconds since the
 * previous frame. The tick callback is stored in a ref so it may close
 * over game state without causing the effect to re-run.
 *
 * Dev-only perf HUD: press Ctrl+Shift+P while a canvas game is focused to
 * toggle an FPS / worst-frame-time overlay (drawn after each tick, so it
 * shows on top of the game's own rendering). The toggle is remembered in
 * localStorage. Stripped in production builds.
 */
export function useCanvasLoop(
  tick: (ctx: CanvasRenderingContext2D, dt: number) => void,
): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef   = useRef(tick);
  tickRef.current = tick;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

    function loop(now: number) {
      const dt = now - last;
      last = now;
      tickRef.current(ctx!, dt);

      if (isDev && hudOn) {
        frameDts.push(dt);
        if (now - lastHudUpdate >= 500) {
          fps     = Math.round(1000 / (frameDts.reduce((a, b) => a + b, 0) / frameDts.length));
          worstDt = Math.max(...frameDts);
          frameDts = [];
          lastHudUpdate = now;
        }
        drawPerfHud();
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      if (isDev) window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return canvasRef;
}
