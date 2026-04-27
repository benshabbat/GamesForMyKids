'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true after the first animation frame fires — i.e. once the canvas
 * game loop has had a chance to draw its first frame.
 * Use to fade in the canvas and avoid a flash of empty black canvas on mount.
 */
export function useCanvasReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return ready;
}
