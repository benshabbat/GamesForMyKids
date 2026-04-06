/**
 * ===============================================
 * Game Difficulty Store — Zustand (persist)
 * ===============================================
 * מנהל רמות קושי אדפטיביות לכל משחק.
 * הנתונים נשמרים ב-localStorage כך שהשחקן חוזר לרמה שהיה בה.
 *
 * מחליף את useState + useEffect ב-useGameDifficulty.ts.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface PerformanceHistory {
  successRate: number[];
  averageTime: number[];
}

interface GameDifficultyEntry {
  difficulty: DifficultyLevel;
  performanceHistory: PerformanceHistory;
}

// ── State ──────────────────────────────────────────────────
export interface GameDifficultyState {
  /** keyed by gameId */
  games: Record<string, GameDifficultyEntry>;
}

// ── Actions ────────────────────────────────────────────────
export interface GameDifficultyActions {
  getDifficulty: (gameId: string, fallback?: DifficultyLevel) => DifficultyLevel;
  setDifficulty: (gameId: string, level: DifficultyLevel) => void;
  getPerformanceHistory: (gameId: string) => PerformanceHistory;
  addPerformanceSnapshot: (gameId: string, successRate: number, averageTime: number) => void;
  resetGame: (gameId: string, fallback?: DifficultyLevel) => void;
}

const EMPTY_HISTORY: PerformanceHistory = { successRate: [], averageTime: [] };

// ── Store ──────────────────────────────────────────────────
export const useGameDifficultyStore = create<GameDifficultyState & GameDifficultyActions>()(
  devtools(
    persist(
      (set, get) => ({
        games: {},

        getDifficulty: (gameId, fallback = 'easy') =>
          get().games[gameId]?.difficulty ?? fallback,

        setDifficulty: (gameId, level) =>
          set(
            (state) => ({
              games: {
                ...state.games,
                [gameId]: { ...state.games[gameId], difficulty: level },
              },
            }),
            false,
            'gameDifficulty/setDifficulty',
          ),

        getPerformanceHistory: (gameId) =>
          get().games[gameId]?.performanceHistory ?? EMPTY_HISTORY,

        addPerformanceSnapshot: (gameId, successRate, averageTime) =>
          set(
            (state) => {
              const prev = state.games[gameId]?.performanceHistory ?? EMPTY_HISTORY;
              return {
                games: {
                  ...state.games,
                  [gameId]: {
                    ...state.games[gameId],
                    performanceHistory: {
                      successRate: [...prev.successRate.slice(-9), successRate],
                      averageTime: [...prev.averageTime.slice(-9), averageTime],
                    },
                  },
                },
              };
            },
            false,
            'gameDifficulty/addSnapshot',
          ),

        resetGame: (gameId, fallback = 'easy') =>
          set(
            (state) => ({
              games: {
                ...state.games,
                [gameId]: { difficulty: fallback, performanceHistory: EMPTY_HISTORY },
              },
            }),
            false,
            'gameDifficulty/resetGame',
          ),
      }),
      { name: 'game-difficulty' },
    ),
    { name: 'GameDifficultyStore' },
  ),
);
