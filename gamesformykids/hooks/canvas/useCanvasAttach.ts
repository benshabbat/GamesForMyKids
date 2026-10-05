'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Runs `setup(canvas)` for whichever <canvas> element `canvasRef` currently
 * points at, and runs the cleanup it returns when that element goes away.
 *
 * Unlike a `useEffect(..., [])` that reads `canvasRef.current` once on mount,
 * this follows the element over time: if the hook's owner mounts before the
 * <canvas> is rendered (e.g. the canvas only exists in the 'playing' phase and
 * the menu is shown first), setup runs as soon as the canvas appears; if the
 * canvas unmounts and a new one mounts later (playing → result → playing),
 * the old setup is cleaned up and a fresh one runs for the new element.
 *
 * The check runs after every commit of the owning component, so the owner must
 * re-render when the canvas is mounted/unmounted — which is always the case
 * when the canvas is rendered conditionally from the owner's own state.
 */
export function useCanvasAttach(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  setup: (canvas: HTMLCanvasElement) => void | (() => void),
): void {
  const attached = useRef<{ canvas: HTMLCanvasElement; cleanup: (() => void) | undefined } | null>(null);

  // No deps on purpose: reconcile with the current element after every commit.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (attached.current?.canvas === canvas) return;
    attached.current?.cleanup?.();
    attached.current = null;
    if (!canvas) return;
    const cleanup = setup(canvas);
    attached.current = { canvas, cleanup: typeof cleanup === 'function' ? cleanup : undefined };
  });

  // Tear down on unmount (the effect above only reconciles on re-render).
  useEffect(() => () => {
    attached.current?.cleanup?.();
    attached.current = null;
  }, []);
}
