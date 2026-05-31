'use client';

import { useEffect, useRef, MutableRefObject } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { ROWS, COLS, CELL, type SnakeRefs } from './snakeConstants';

const EYE_OFFSETS: Record<string, [number, number]> = { R: [1, -1], L: [-1, -1], U: [-1, -1], D: [1, 1] };

/**
 * Drives the snake draw loop via useCanvasLoop (rAF lifecycle managed centrally).
 * Returns the canvas ref to attach to the <canvas> element.
 * Pure rendering concern — no game-state writes.
 */
export function useSnakeDraw(st: MutableRefObject<SnakeRefs>) {
  const dprRef = useRef<number | null>(null);

  const canvasRef = useCanvasLoop((ctx) => {
    // Apply DPR on first frame; use setTransform every frame so scale is always correct
    if (dprRef.current === null) {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      if (dpr !== 1) {
        const c = ctx.canvas;
        c.width  = COLS * CELL * dpr;
        c.height = ROWS * CELL * dpr;
        c.style.width  = `${COLS * CELL}px`;
        c.style.height = `${ROWS * CELL}px`;
      }
    }
    ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);

    const s = st.current;
    s.animFrame++;

    // Grid
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#1a472a' : '#1e5230';
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
      }
    }

    if (s.phase === 'playing' || s.phase === 'dead') {
      // Food
      ctx.font = `${CELL - 2}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pulse = 1 + Math.sin(s.animFrame * 0.2) * 0.1;
      ctx.save();
      ctx.translate((s.food.x + 0.5) * CELL, (s.food.y + 0.5) * CELL);
      ctx.scale(pulse, pulse);
      ctx.fillText(s.foodEmoji, 0, 1);
      ctx.restore();

      // Snake
      for (let i = 0; i < s.snake.length; i++) {
        const p = s.snake[i]!;
        const isHead = i === 0;
        const t = 1 - i / s.snake.length;
        const r = Math.round(50 + t * 100);
        const g = Math.round(180 + t * 40);
        ctx.fillStyle = isHead ? '#00E676' : `rgb(${r},${g},40)`;
        const pad = isHead ? 1 : 2;
        ctx.beginPath();
        ctx.roundRect(p.x * CELL + pad, p.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, isHead ? 5 : 3);
        ctx.fill();

        if (isHead) {
          const eyeOff = EYE_OFFSETS[s.dir]!;
          ctx.fillStyle = 'white';
          ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#111';
          ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2 + 1, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2 + 1, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
  });

  // Clean up the step timer when the canvas unmounts
  useEffect(() => {
    const stRef = st.current;
    return () => { clearTimeout(stRef.timer as ReturnType<typeof setTimeout>); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
}
