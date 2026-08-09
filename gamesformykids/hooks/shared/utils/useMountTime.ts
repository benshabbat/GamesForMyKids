'use client';

import { useState } from 'react';

/**
 * The current time, captured once when the component mounts.
 *
 * Calling `Date.now()` straight in a render body is impure: React may render a
 * component more than once for a single commit, so a "last 7 days" cut-off
 * computed inline can differ between those renders and produce a different
 * tree each time. Capturing it in a `useState` initialiser makes the value
 * stable for the component's lifetime, which is what a window boundary wants
 * anyway — the cut-off shouldn't drift while the user is reading the screen.
 *
 * Use this for *reference* timestamps (window boundaries, "is this recent?").
 * For a clock that must keep ticking, use an interval in an effect instead.
 */
export function useMountTime(): number {
  const [mountedAt] = useState(() => Date.now());
  return mountedAt;
}
