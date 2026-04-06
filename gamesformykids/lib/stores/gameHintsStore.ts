/**
 * ===============================================
 * Game Hints Store — Zustand
 * ===============================================
 * מנהל את מצב הרמזים של האתגר הנוכחי.
 * מאפשר לכל קומפוננט לגשת לרמזים ללא props drilling.
 *
 * מחליף את useState ב-useGameHints.ts.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { GameHint } from '@/lib/types/hooks/ui';

// ── State ──────────────────────────────────────────────────
export interface GameHintsState {
  hints: GameHint[];
  revealedHintsCount: number;
}

// ── Actions ────────────────────────────────────────────────
export interface GameHintsActions {
  setHints: (hints: GameHint[]) => void;
  revealNextHint: () => void;
  resetHints: () => void;
}

// ── Store ──────────────────────────────────────────────────
export const useGameHintsStore = create<GameHintsState & GameHintsActions>()(
  devtools(
    (set, get) => ({
      hints: [],
      revealedHintsCount: 0,

      setHints: (hints) =>
        set({ hints, revealedHintsCount: 0 }, false, 'hints/setHints'),

      revealNextHint: () => {
        const { hints, revealedHintsCount } = get();
        if (revealedHintsCount >= hints.length) return;
        set(
          {
            hints: hints.map((h, i) =>
              i === revealedHintsCount ? { ...h, isRevealed: true } : h,
            ),
            revealedHintsCount: revealedHintsCount + 1,
          },
          false,
          'hints/revealNext',
        );
      },

      resetHints: () =>
        set({ hints: [], revealedHintsCount: 0 }, false, 'hints/reset'),
    }),
    { name: 'GameHintsStore' },
  ),
);
