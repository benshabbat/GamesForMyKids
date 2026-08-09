'use client';
import { useEffect } from 'react';
import { useLatestRef } from '../utils/useLatestRef';

export function useKeyboardControls(
  bindings: Record<string, () => void>,
  enabled = true,
) {
  const ref = useLatestRef(bindings);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const action = ref.current[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, ref]);
}
