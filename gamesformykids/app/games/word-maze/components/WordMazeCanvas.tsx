'use client';
import { useRef, useEffect, type RefObject } from 'react';
import { useCanvasLoop } from '@/hooks/canvas/useCanvasLoop';
import { GRID_SIZE, CELL_SIZE, type Grid, type LetterCell } from '../useWordMaze';

interface Props {
  gridRef: RefObject<Grid>;
  playerRef: RefObject<{ row: number; col: number }>;
  lettersRef: RefObject<LetterCell[]>;
  bouncing: boolean;
  onMove: (dr: number, dc: number) => void;
}

const WALL_COLOR = '#4a2f1a';
const PATH_COLOR = '#fef9c3';
const LETTER_COLOR = '#7c3aed';
const COLLECTED_COLOR = '#16a34a';
const PLAYER_COLOR = '#f97316';

export default function WordMazeCanvas({ gridRef, playerRef, lettersRef, bouncing, onMove }: Props) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const canvasRef = useCanvasLoop((ctx) => {
    const grid = gridRef.current;
    const player = playerRef.current;
    const letters = lettersRef.current;
    if (!grid || !grid.length) return;

    const W = GRID_SIZE * CELL_SIZE;
    ctx.clearRect(0, 0, W, W);

    // Draw grid
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        ctx.fillStyle = grid[r]?.[c] ? PATH_COLOR : WALL_COLOR;
        ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Draw letters
    ctx.font = `bold ${CELL_SIZE * 0.55}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const l of letters) {
      const x = l.col * CELL_SIZE + CELL_SIZE / 2;
      const y = l.row * CELL_SIZE + CELL_SIZE / 2;
      ctx.fillStyle = l.collected ? COLLECTED_COLOR : LETTER_COLOR;
      ctx.beginPath();
      ctx.arc(x, y, CELL_SIZE * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(l.letter, x, y + 1);
    }

    // Draw player
    const px = player.col * CELL_SIZE + CELL_SIZE / 2;
    const py = player.row * CELL_SIZE + CELL_SIZE / 2;
    ctx.fillStyle = bouncing ? '#ef4444' : PLAYER_COLOR;
    ctx.beginPath();
    ctx.arc(px, py, CELL_SIZE * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `${CELL_SIZE * 0.5}px Arial`;
    ctx.fillText('🧒', px, py + 1);
  });

  // Touch swipe support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch || !touchStart.current) return;
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      const absDx = Math.abs(dx), absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < 20) return;
      if (absDx > absDy) onMove(0, dx > 0 ? 1 : -1);
      else onMove(dy > 0 ? 1 : -1, 0);
      touchStart.current = null;
    };
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMove, canvasRef]);

  const size = GRID_SIZE * CELL_SIZE;
  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-xl shadow-xl border-2 border-amber-300"
      style={{ maxWidth: '100%', touchAction: 'none' }}
    />
  );
}
