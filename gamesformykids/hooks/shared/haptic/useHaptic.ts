'use client';

/**
 * Haptic feedback via navigator.vibrate() — no-op where unsupported.
 * correct: 50ms pulse
 * wrong: double pulse (50–50–50ms)
 */
export function useHaptic() {
  const correct = () => navigator.vibrate?.(50);
  const wrong   = () => navigator.vibrate?.([50, 50, 50]);
  return { correct, wrong };
}
