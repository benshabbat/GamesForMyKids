/**
 * ===============================================
 * High Score Store — Zustand (persist)
 * ===============================================
 * שומר את השיא של כל שחקן לכל משחק ב-localStorage.
 *
 * מחליף את useState + localStorage ב-useGameScore (useCommonGamePatterns.ts).
 * localStorage key לפני ה-migration: `game_best_score_${gameId}`
 * Zustand persist key: 'game-high-scores'
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ── State ──────────────────────────────────────────────────
export interface HighScoreState {
  /** best score keyed by gameId */
  scores: Record<string, number>;
}

// ── Actions ────────────────────────────────────────────────
export interface HighScoreActions {
  getBestScore: (gameId: string) => number;
  /** Only updates if newScore > current best */
  submitScore: (gameId: string, newScore: number) => boolean;
  resetScore: (gameId: string) => void;
  resetAllScores: () => void;
}

// ── Store ──────────────────────────────────────────────────
export const useHighScoreStore = create<HighScoreState & HighScoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        scores: {},

        getBestScore: (gameId) => get().scores[gameId] ?? 0,

        submitScore: (gameId, newScore) => {
          const current = get().scores[gameId] ?? 0;
          if (newScore > current) {
            set(
              (state) => ({ scores: { ...state.scores, [gameId]: newScore } }),
              false,
              'highScore/submitScore',
            );
            return true;
          }
          return false;
        },

        resetScore: (gameId) =>
          set(
            (state) => {
              const next = { ...state.scores };
              delete next[gameId];
              return { scores: next };
            },
            false,
            'highScore/resetScore',
          ),

        resetAllScores: () => set({ scores: {} }, false, 'highScore/resetAll'),
      }),
      { name: 'game-high-scores' },
    ),
    { name: 'HighScoreStore' },
  ),
);
