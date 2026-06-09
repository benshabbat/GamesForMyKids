'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * Enables keyboard navigation for answer grids:
 * - 1/2/3/4 → immediately select that answer
 * - ArrowRight/Down → move focus right/down
 * - ArrowLeft/Up   → move focus left/up
 * - Enter/Space    → confirm focused answer
 *
 * Only active when `enabled` is true (e.g. question phase, not result/menu).
 */
export function useKeyboardAnswerSelect(
  count: number,
  onSelect: (idx: number) => void,
  enabled: boolean,
) {
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedRef = useRef(0);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Reset focus when a new set of choices arrives
  useEffect(() => {
    setFocusedIdx(0);
    focusedRef.current = 0;
  }, [count]);

  useEffect(() => {
    if (!enabled || count === 0) return;

    const handleKey = (e: KeyboardEvent) => {
      // Ignore when typing in an input / textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const { key } = e;

      if (key >= '1' && key <= '4') {
        const idx = parseInt(key, 10) - 1;
        if (idx < count) {
          e.preventDefault();
          onSelectRef.current(idx);
        }
        return;
      }

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIdx(prev => {
          const next = (prev + 1) % count;
          focusedRef.current = next;
          return next;
        });
        return;
      }

      if (key === 'ArrowLeft' || key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIdx(prev => {
          const next = (prev - 1 + count) % count;
          focusedRef.current = next;
          return next;
        });
        return;
      }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        onSelectRef.current(focusedRef.current);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [count, enabled]);

  return { focusedIdx };
}
