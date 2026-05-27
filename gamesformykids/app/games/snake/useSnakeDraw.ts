'use client';

import { useEffect, MutableRefObject } from 'react';
import { ROWS, COLS, CELL, type SnakeRefs } from './snakeConstants';

/**
 * Runs a requestAnimationFrame loop that draws the snake game onto `canvasRef`.
 * Pure rendering concern — no game-state writes.
 */
export function useSnakeDraw(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  st: MutableRefObject<SnakeRefs>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    function draw() {
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
            const eyeOff = ({ R: [1, -1], L: [-1, -1], U: [-1, -1], D: [1, 1] } as Record<string, [number, number]>)[s.dir]!;
            ctx.fillStyle = 'white';
            ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#111';
            ctx.beginPath(); ctx.arc(p.x * CELL + CELL * 0.65 + eyeOff[0] * 2 + 1, p.y * CELL + CELL * 0.3 + eyeOff[1] * 2 + 1, 1.5, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      s.raf = requestAnimationFrame(draw);
    }

    st.current.raf = requestAnimationFrame(draw);
    const stRef = st.current;
    return () => {
      cancelAnimationFrame(stRef.raf);
      clearTimeout(stRef.timer as ReturnType<typeof setTimeout>);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
