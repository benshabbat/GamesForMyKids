"use client";

import { useState, useEffect, useCallback } from 'react';

interface GridBreakpoints {
  mobile: number;   // < 768px
  tablet: number;   // 768px – 1023px
  desktop: number;  // >= 1024px
}

const DEFAULT_BREAKPOINTS: GridBreakpoints = { mobile: 2, tablet: 3, desktop: 4 };

/**
 * מפרסר מחרוזת Tailwind grid-cols לתוך GridBreakpoints.
 * לדוגמה: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" → { mobile:2, tablet:3, desktop:4 }
 */
export function parseGridColsClass(gridColsClass: string): GridBreakpoints {
  const mobile  = Number(gridColsClass.match(/(?<![:\w])grid-cols-(\d+)/)?.[1]  ?? 2);
  const tablet  = Number(gridColsClass.match(/md:grid-cols-(\d+)/)?.[1]         ?? mobile);
  const desktop = Number(gridColsClass.match(/lg:grid-cols-(\d+)/)?.[1]         ?? tablet);
  return { mobile, tablet, desktop };
}

/**
 * מחשב כמה אלמנטי-מילוי (fillers) יש להוסיף בסוף הגריד
 * כדי שהשורה האחרונה תהיה שלמה.
 * ניתן להעביר GridBreakpoints ישירות או מחרוזת Tailwind gridCols.
 */
export function useGridFillers(
  itemCount: number,
  breakpoints: GridBreakpoints | string = DEFAULT_BREAKPOINTS
): number {
  const resolved: GridBreakpoints =
    typeof breakpoints === 'string'
      ? parseGridColsClass(breakpoints)
      : breakpoints;
  const getColumns = useCallback(() => {
    if (typeof window === 'undefined') return resolved.mobile;
    if (window.innerWidth >= 1024) return resolved.desktop;
    if (window.innerWidth >= 768) return resolved.tablet;
    return resolved.mobile;
  }, [resolved.mobile, resolved.tablet, resolved.desktop]);

  const [fillerCount, setFillerCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cols = getColumns();
      const remainder = itemCount % cols;
      setFillerCount(remainder === 0 ? 0 : cols - remainder);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [itemCount, getColumns]);

  return fillerCount;
}
