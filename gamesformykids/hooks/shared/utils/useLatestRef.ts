'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Keeps a ref pointing at the newest value, without that value becoming an
 * effect dependency.
 *
 * This is the "latest ref" pattern used all over this codebase for long-lived
 * listeners: a `keydown` handler or a `setTimeout` registered once on mount
 * still needs to call the *current* callback, not the one captured on the
 * render that registered it.
 *
 * The assignment lives in an effect rather than in the render body. Writing
 * `ref.current = value` during render mutates state that React considers frozen
 * for that render — under concurrent rendering a render can be started and
 * thrown away, which would leave the ref pointing at a value from a render that
 * never committed. Assigning after commit is always the value the user is
 * actually looking at.
 *
 * Only read `.current` from something that runs after paint — an event handler,
 * a timeout, an effect. Reading it during render defeats the purpose and gives
 * you the previous commit's value.
 */
export function useLatestRef<T>(value: T): RefObject<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref;
}
