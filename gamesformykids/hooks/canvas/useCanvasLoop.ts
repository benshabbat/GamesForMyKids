'use client';

import { useEffect, useRef } from 'react';

/**
 * Manages the requestAnimationFrame lifecycle for a canvas game loop.
 *
 * Returns a canvasRef to attach to the <canvas> element.
 * Calls `tick(ctx, dt)` every frame where dt is milliseconds since the
 * previous frame. The tick callback is stored in a ref so it may close
 * over game state without causing the effect to re-run.
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

    function loop(now: number) {
      const dt = now - last;
      last = now;
      tickRef.current(ctx!, dt);
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return canvasRef;
}
