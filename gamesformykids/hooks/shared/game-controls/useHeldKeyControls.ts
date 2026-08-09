'use client';
import { useEffect } from 'react';
import { useLatestRef } from '../utils/useLatestRef';

interface HeldKeyBinding {
  onDown: () => void;
  onUp: () => void;
}

/**
 * For continuous "held" movement (e.g. an arcade paddle or platformer)
 * rather than one-shot key presses — see useKeyboardControls for that case.
 */
export function useHeldKeyControls(
  bindings: Record<string, HeldKeyBinding>,
  enabled = true,
) {
  const ref = useLatestRef(bindings);

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => ref.current[e.key]?.onDown();
    const onKeyUp = (e: KeyboardEvent) => ref.current[e.key]?.onUp();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [enabled, ref]);
}
