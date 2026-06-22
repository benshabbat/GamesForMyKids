'use client';
import { useEffect, useRef } from 'react';

/**
 * Calls `onClose` when the Escape key is pressed, while the element is `enabled`.
 * Registers in the capture phase so it intercepts Escape before the global
 * "Escape → go home" handler in useUniversalGameNavigation.
 */
export function useEscapeKey(onClose: () => void, enabled: boolean) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [enabled]);
}
