/**
 * ===============================================
 * Game Progress Store — Zustand
 * ===============================================
 * מנהל את כל מדדי ההתקדמות במשחק: ניקוד, רמה, סטריקים, זמן.
 * מחליף את ה-useState ב-GameProgressContext ו-SimpleGameProgressContext.
 *
 * הפרובידר שומר אחריות בלעדית על:
 *   - useEffect של הטיימר (setInterval)
 *   - איפוס ההתקדמות כשמשתנה סוג המשחק
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GameProgressState {
  score: number;
  level: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  startTime: number;
  streakCount: number;
  bestStreak: number;
  isGameActive: boolean;
  timerPaused: boolean;
}

export interface GameProgressActions {
  incrementScore: (points?: number) => void;
  incrementLevel: (maxLevel?: number) => void;
  recordAttempt: (isCorrect: boolean, pointsPerCorrect?: number) => void;
  resetProgress: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  setGameActive: (active: boolean) => void;
  tickTimer: () => void;
  updateProgress: (updates: Partial<GameProgressState>) => void;
}

const INITIAL_STATE: GameProgressState = {
  score: 0,
  level: 1,
  attempts: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  timeSpent: 0,
  startTime: 0,
  streakCount: 0,
  bestStreak: 0,
  isGameActive: false,
  timerPaused: false,
};

export const useGameProgressStore = create<GameProgressState & GameProgressActions>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,

      incrementScore: (points = 10) =>
        set((s) => ({ score: s.score + points }), false, 'progress/incrementScore'),

      incrementLevel: (maxLevel = 10) =>
        set(
          (s) => ({ level: Math.min(s.level + 1, maxLevel) }),
          false,
          'progress/incrementLevel',
        ),

      recordAttempt: (isCorrect, pointsPerCorrect = 10) =>
        set(
          (s) => {
            const newStreakCount = isCorrect ? s.streakCount + 1 : 0;
            return {
              attempts: s.attempts + 1,
              correctAnswers: s.correctAnswers + (isCorrect ? 1 : 0),
              totalQuestions: s.totalQuestions + 1,
              streakCount: newStreakCount,
              bestStreak: Math.max(newStreakCount, s.bestStreak),
              score: isCorrect ? s.score + pointsPerCorrect : s.score,
            };
          },
          false,
          'progress/recordAttempt',
        ),

      resetProgress: () =>
        set(
          { ...INITIAL_STATE, startTime: Date.now() },
          false,
          'progress/resetProgress',
        ),

      pauseTimer: () => set({ timerPaused: true }, false, 'progress/pauseTimer'),

      resumeTimer: () => set({ timerPaused: false }, false, 'progress/resumeTimer'),

      setGameActive: (active) =>
        set(
          (s) => ({
            isGameActive: active,
            startTime: active && s.startTime === 0 ? Date.now() : s.startTime,
          }),
          false,
          'progress/setGameActive',
        ),

      tickTimer: () =>
        set(
          (s) => ({ timeSpent: Math.floor((Date.now() - s.startTime) / 1000) }),
          false,
          'progress/tickTimer',
        ),

      updateProgress: (updates) =>
        set(updates as Partial<GameProgressState>, false, 'progress/updateProgress'),
    }),
    { name: 'GameProgressStore' },
  ),
);

// Selectors
export const selectScore = (s: GameProgressState) => s.score;
export const selectLevel = (s: GameProgressState) => s.level;
export const selectIsGameActive = (s: GameProgressState) => s.isGameActive;
export const selectAccuracy = (s: GameProgressState) =>
  s.totalQuestions === 0 ? 0 : (s.correctAnswers / s.totalQuestions) * 100;
