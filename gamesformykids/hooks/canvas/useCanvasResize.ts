'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Keeps a canvas's drawing buffer (width/height) in sync with its displayed
 * (offsetWidth/offsetHeight) size, re-syncing whenever the element resizes.
 */
export function useCanvasResize(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [canvasRef]);
}
