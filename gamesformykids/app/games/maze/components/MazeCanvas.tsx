'use client';
import { useRef } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { useMazeStore } from '../mazeStore';

const CANVAS_SIZE = 340;
const WALL_COLOR = '#e2e8f0';
const BG_COLOR = '#1e293b';
const CELL_COLOR = '#0f172a';
const EXIT_CELL_COLOR = '#14532d';

export default function MazeCanvas() {
  const dprRef = useRef<number | null>(null);

  const canvasRef = useCanvasLoop((ctx) => {
    if (dprRef.current === null) {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const c = ctx.canvas;
      c.width = CANVAS_SIZE * dpr;
      c.height = CANVAS_SIZE * dpr;
      c.style.width = `${CANVAS_SIZE}px`;
      c.style.height = `${CANVAS_SIZE}px`;
    }
    ctx.setTransform(dprRef.current!, 0, 0, dprRef.current!, 0, 0);

    const { grid, rows, cols, playerPos, exitPos, stars, collected, phase } = useMazeStore.getState();
    if (!grid.length || phase === 'idle') {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      return;
    }

    const CELL = CANVAS_SIZE / Math.max(rows, cols);
    const offsetX = (CANVAS_SIZE - cols * CELL) / 2;
    const offsetY = (CANVAS_SIZE - rows * CELL) / 2;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw cell backgrounds
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * CELL;
        const y = offsetY + r * CELL;
        const isExit = r === exitPos[0] && c === exitPos[1];
        ctx.fillStyle = isExit ? EXIT_CELL_COLOR : CELL_COLOR;
        ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
      }
    }

    // Draw walls
    ctx.strokeStyle = WALL_COLOR;
    ctx.lineWidth = 2;
    ctx.lineCap = 'square';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r]?.[c];
        if (!cell) continue;
        const x = offsetX + c * CELL;
        const y = offsetY + r * CELL;
        ctx.beginPath();
        if (cell.N) { ctx.moveTo(x, y);          ctx.lineTo(x + CELL, y); }
        if (cell.E) { ctx.moveTo(x + CELL, y);   ctx.lineTo(x + CELL, y + CELL); }
        if (cell.S) { ctx.moveTo(x, y + CELL);   ctx.lineTo(x + CELL, y + CELL); }
        if (cell.W) { ctx.moveTo(x, y);           ctx.lineTo(x, y + CELL); }
        ctx.stroke();
      }
    }

    // Draw emojis
    const fontSize = Math.max(10, CELL * 0.55);
    ctx.font = `${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Stars
    stars.forEach(([sr, sc], i) => {
      if (collected[i]) return;
      ctx.fillText('⭐', offsetX + (sc + 0.5) * CELL, offsetY + (sr + 0.5) * CELL);
    });

    // Exit door
    ctx.fillText('🚪', offsetX + (exitPos[1] + 0.5) * CELL, offsetY + (exitPos[0] + 0.5) * CELL);

    // Player
    ctx.fillText('🧒', offsetX + (playerPos[1] + 0.5) * CELL, offsetY + (playerPos[0] + 0.5) * CELL);
  });

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{ display: 'block', margin: '0 auto', borderRadius: '12px', border: '2px solid #334155' }}
    />
  );
}
