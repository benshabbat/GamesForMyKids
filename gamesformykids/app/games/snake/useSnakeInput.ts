'use client';

import { useEffect, useRef, useCallback, MutableRefObject } from 'react';
import { type Dir, type SnakeRefs, OPPOSITE_DIR } from './snakeConstants';

/**
 * Registers keyboard and touch input handlers for the snake game.
 * Returns `{ handleTouchStart, handleTouchEnd, controlDir }`.
 */
export function useSnakeInput(st: MutableRefObject<SnakeRefs>) {
  // Keyboard
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const s = st.current;
      if (s.phase !== 'playing') return;
      const map: Record<string, Dir> = {
        ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R',
        w: 'U', s: 'D', a: 'L', d: 'R',
      };
      const newDir = map[e.key];
      if (!newDir) return;
      if (newDir !== OPPOSITE_DIR[s.dir]) s.nextDir = newDir;
      e.preventDefault();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    const s = st.current;
    if (s.phase !== 'playing') return;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (Math.max(adx, ady) < 20) return;
    let newDir: Dir;
    if (adx > ady) newDir = dx > 0 ? 'R' : 'L';
    else newDir = dy > 0 ? 'D' : 'U';
    if (newDir !== OPPOSITE_DIR[s.dir]) s.nextDir = newDir;
  }, []);

  // On-screen D-pad
  const controlDir = useCallback((dir: Dir) => {
    const s = st.current;
    if (s.phase !== 'playing') return;
    if (dir !== OPPOSITE_DIR[s.dir]) s.nextDir = dir;
  }, []);

  return { handleTouchStart, handleTouchEnd, controlDir };
}
