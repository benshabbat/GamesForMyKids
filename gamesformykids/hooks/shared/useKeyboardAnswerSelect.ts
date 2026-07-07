'use client';
import { useState, useEffect, useRef } from 'react';
import { parseGridColsClass } from '@/hooks/shared/ui/useGridFillers';

/**
 * Enables keyboard navigation for answer grids:
 * - 1/2/3/4 → immediately select that answer
 * - ArrowDown/Up → move focus one row down/up (jumps by `gridCols`)
 * - ArrowLeft/Right → move focus one column over
 * - Enter/Space    → confirm focused answer
 *
 * The page is always RTL, so the first item in DOM order renders in the
 * rightmost column. Visual "right" is therefore the previous DOM index and
 * visual "left" is the next one — ArrowLeft/Right are mapped accordingly
 * whenever the grid has more than one column.
 *
 * `gridCols` accepts a plain column count, or a Tailwind grid-cols class
 * string (e.g. "grid-cols-2 md:grid-cols-4") for responsive grids.
 *
 * Only active when `enabled` is true (e.g. question phase, not result/menu).
 */
export function useKeyboardAnswerSelect(
  count: number,
  onSelect: (idx: number) => void,
  enabled: boolean,
  gridCols: number | string = 1,
) {
  // -1 = no keyboard focus yet; ring only appears after first arrow/number key press
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const focusedRef = useRef(-1);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const breakpoints = typeof gridCols === 'string' ? parseGridColsClass(gridCols) : null;
  const staticCols = typeof gridCols === 'number' ? gridCols : null;
  const colsRef = useRef(staticCols ?? breakpoints?.mobile ?? 1);

  useEffect(() => {
    if (!breakpoints) return;
    const updateCols = () => {
      colsRef.current =
        window.innerWidth >= 1024 ? breakpoints.desktop :
        window.innerWidth >= 768  ? breakpoints.tablet  :
        breakpoints.mobile;
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, [breakpoints]);

  // Reset focus when a new set of choices arrives
  useEffect(() => {
    setFocusedIdx(-1);
    focusedRef.current = -1;
  }, [count]);

  useEffect(() => {
    if (!enabled || count === 0) return;

    const step = (delta: number) => {
      setFocusedIdx(prev => {
        const next = prev < 0
          ? (delta > 0 ? 0 : count - 1)
          : ((prev + delta) % count + count) % count;
        focusedRef.current = next;
        return next;
      });
    };

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

      const cols = colsRef.current;
      const isGrid = cols > 1;

      if (key === 'ArrowDown') { e.preventDefault(); step(isGrid ? cols : 1); return; }
      if (key === 'ArrowUp')   { e.preventDefault(); step(isGrid ? -cols : -1); return; }
      if (key === 'ArrowLeft')  { e.preventDefault(); step(isGrid ? 1 : -1); return; }
      if (key === 'ArrowRight') { e.preventDefault(); step(isGrid ? -1 : 1); return; }

      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        if (focusedRef.current >= 0) onSelectRef.current(focusedRef.current);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [count, enabled]);

  return { focusedIdx };
}
