'use client';

import { useRef, useEffect } from 'react';

/**
 * מנהל את אנימציית סרגל ההתקדמות של Toast.
 * מחזיר ref לאלמנט progress bar.
 */
export function useToastTimer(duration: number) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current || duration <= 0) return;
    const el = barRef.current;
    el.style.transition = 'none';
    el.style.width = '100%';
    // Force reflow so the CSS transition starts from 100%
    void el.offsetWidth;
    el.style.transition = `width ${duration}ms linear`;
    el.style.width = '0%';
  }, [duration]);

  return { barRef };
}
