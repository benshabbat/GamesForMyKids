'use client';

import { useRef, MutableRefObject } from 'react';
import { type Dir, type SnakeRefs, OPPOSITE_DIR } from './snakeConstants';
import { useKeyboardControls } from '@/hooks/shared/game-controls';

/**
 * Registers keyboard and touch input handlers for the snake game.
 * Returns `{ handleTouchStart, handleTouchEnd, controlDir }`.
 */
export function useSnakeInput(st: MutableRefObject<SnakeRefs>) {
  // On-screen D-pad (also used for keyboard input below)
  const controlDir = (dir: Dir) => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    if (dir !== OPPOSITE_DIR[s.dir]) s.nextDir = dir;
  };

  useKeyboardControls({
    ArrowUp: () => controlDir('U'), w: () => controlDir('U'),
    ArrowDown: () => controlDir('D'), s: () => controlDir('D'),
    ArrowLeft: () => controlDir('L'), a: () => controlDir('L'),
    ArrowRight: () => controlDir('R'), d: () => controlDir('R'),
  });

  // Touch
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0]!.clientX - touchStart.current.x;
    const dy = e.changedTouches[0]!.clientY - touchStart.current.y;
    touchStart.current = null;
    const s = st.current;
    if (s.phase !== 'playing') return;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (Math.max(adx, ady) < 20) return;
    let newDir: Dir;
    if (adx > ady) newDir = dx > 0 ? 'R' : 'L';
    else newDir = dy > 0 ? 'D' : 'U';
    if (newDir !== OPPOSITE_DIR[s.dir]) s.nextDir = newDir;
  };

  return { handleTouchStart, handleTouchEnd, controlDir };
}
