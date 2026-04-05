/**
 * ===============================================
 * Game Store — Zustand
 * ===============================================
 * גלובל אמת יחידה לסטייט המשחק הנוכחי.
 * מאפשר לכל קומפוננט (Header, Analytics, etc.) לקרוא
 * את סטייט המשחק מבלי לעבור דרך Context nesting.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { GameType } from '@/lib/types/core/base';

// ── State ──────────────────────────────────────────────────
export interface ActiveGameState {
  /** סוג המשחק הפעיל כרגע (null = לא במשחק) */
  gameType: string | null;
  isPlaying: boolean;
  score: number;
  level: number;
  /** חותמת זמן התחלת המשחק (ms) */
  startedAt: number | null;
}

// ── Stats (persisted between sessions) ─────────────────────
export interface GameStats {
  totalGamesPlayed: number;
  totalScore: number;
  highScores: Partial<Record<string, number>>;
  lastPlayedGame: string | null;
  lastPlayedAt: number | null;
}

export interface GameActions {
  /** קרא לזה כשמשחק מתחיל */
  startGame: (gameType: string) => void;
  /** עדכן ניקוד ורמה תוך כדי משחק */
  updateProgress: (score: number, level: number) => void;
  /** קרא לזה כשמשחק מסתיים */
  endGame: () => void;
  /** איפוס מהיר ללא רישום סטטיסטיקות */
  resetGame: () => void;
  clearStats: () => void;
}

const INITIAL_ACTIVE: ActiveGameState = {
  gameType: null,
  isPlaying: false,
  score: 0,
  level: 1,
  startedAt: null,
};

const INITIAL_STATS: GameStats = {
  totalGamesPlayed: 0,
  totalScore: 0,
  highScores: {},
  lastPlayedGame: null,
  lastPlayedAt: null,
};

export const useGameStore = create<ActiveGameState & GameStats & GameActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        ...INITIAL_ACTIVE,
        ...INITIAL_STATS,

        startGame: (gameType) =>
          set(
            { gameType, isPlaying: true, score: 0, level: 1, startedAt: Date.now() },
            false,
            'game/startGame'
          ),

        updateProgress: (score, level) =>
          set({ score, level }, false, 'game/updateProgress'),

        endGame: () => {
          const { gameType, score, highScores, totalGamesPlayed, totalScore } = get();
          const key = gameType ?? 'unknown';
          const prevBest = highScores[key] ?? 0;

          set(
            {
              ...INITIAL_ACTIVE,
              totalGamesPlayed: totalGamesPlayed + 1,
              totalScore: totalScore + score,
              highScores: {
                ...highScores,
                [key]: Math.max(score, prevBest),
              },
              lastPlayedGame: key,
              lastPlayedAt: Date.now(),
            },
            false,
            'game/endGame'
          );
        },

        resetGame: () =>
          set(INITIAL_ACTIVE, false, 'game/resetGame'),

        clearStats: () =>
          set(INITIAL_STATS, false, 'game/clearStats'),
      }),
      {
        name: 'gamesformykids-game-stats',
        // שמור רק סטטיסטיקות, לא סטייט משחק פעיל
        partialize: (state) => ({
          totalGamesPlayed: state.totalGamesPlayed,
          totalScore: state.totalScore,
          highScores: state.highScores,
          lastPlayedGame: state.lastPlayedGame,
          lastPlayedAt: state.lastPlayedAt,
        }),
      }
    ),
    { name: 'GameStore' }
  )
);

// ── Selectors ──────────────────────────────────────────────
export const selectHighScore = (gameType: string) =>
  (s: ActiveGameState & GameStats) => s.highScores[gameType] ?? 0;

export const selectIsPlayingGame = (gameType: GameType) =>
  (s: ActiveGameState) => s.isPlaying && s.gameType === gameType;
