'use client';

import type { RefObject } from 'react';
import { useCanvasAttach } from './useCanvasAttach';

/**
 * Keeps a canvas's drawing buffer (width/height) in sync with its displayed
 * (offsetWidth/offsetHeight) size, re-syncing whenever the element resizes.
 * Follows the element if it mounts after the hook's owner or is re-mounted.
 */
export function useCanvasResize(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useCanvasAttach(canvasRef, (canvas) => {
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  });
}
