'use client';

import { useSyncExternalStore } from 'react';

/**
 * Whether animation should be suppressed for this user.
 *
 * Two things can ask for that, and both matter:
 *
 * 1. The OS setting, via `prefers-reduced-motion: reduce`.
 * 2. The app's own "הפחת תנועה" toggle in Settings, which writes
 *    `gfk_reduced_motion` and reflects it onto `<html data-reduced-motion>`.
 *
 * The inline script in app/layout.tsx already ORs those two together and stamps
 * the attribute before first paint, and globals.css keys its CSS off the same
 * attribute. Reading the attribute therefore gives the same answer the
 * stylesheet is using — which is the point: a JS-driven animation (framer-motion
 * mascot, confetti) and a CSS-driven one should never disagree about whether
 * this user wants motion.
 *
 * Before this hook, the JS call sites checked only the media query, so a child
 * who turned the app's own toggle on still got the animations.
 *
 * useSyncExternalStore rather than useState + useEffect: the value lives in the
 * DOM, outside React, and this gives a correct SSR snapshot (false — the server
 * cannot know) with no render-then-correct flash.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener('change', onChange);

  // The Settings toggle flips the attribute directly rather than going through
  // React, so the attribute needs watching too.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-reduced-motion'],
  });

  return () => {
    mediaQuery.removeEventListener('change', onChange);
    observer.disconnect();
  };
}

function getSnapshot(): boolean {
  return (
    document.documentElement.dataset.reducedMotion === 'true' ||
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/** Server snapshot: assume motion is fine, then correct on hydration. */
function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
