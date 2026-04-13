/**
 * ===============================================
 * Quiz Game Store — Zustand
 * ===============================================
 * מנהל את סטייט סשן משחקי החידון (quiz):
 * - שלב המשחק (menu / playing / result)
 * - אינדקס השאלה הנוכחית
 * - בחירת השחקן והמשוב
 * - ניקוד (מסונכרן גם עם gameProgressStore)
 *
 * כל משחק-חידון קורא ל-startQuiz עם מספר שאלות,
 * ומשתמש ב-selectAnswer / nextQuestion לניהול הזרימה.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useGameStore } from './gameStore';
import { useGameProgressStore } from './gameProgressStore';

export type QuizPhase = 'menu' | 'playing' | 'result';

// ── State ──────────────────────────────────────────────────
export interface QuizGameState {
  phase: QuizPhase;
  /** ID המשחק הפעיל כרגע (לזיהוי store מול משחקים שונים) */
  gameId: string | null;
  index: number;
  total: number;
  score: number;
  /** ID האפשרות שנבחרה */
  selected: string | null;
  isCorrect: boolean | null;
}

// ── Actions ────────────────────────────────────────────────
export interface QuizGameActions {
  /** קרא לזה עם שם המשחק ומספר שאלות לפני תחילת סבב */
  startQuiz: (gameId: string, total: number) => void;
  /** בחירת תשובה — מעדכן selected, isCorrect וניקוד */
  selectAnswer: (id: string, isCorrect: boolean) => void;
  /** מעבר לשאלה הבאה (או מעבר ל-result בסוף) */
  nextQuestion: () => void;
  /** חזרה למסך פתיחה */
  goToMenu: () => void;
  /** איפוס לסבב חדש באותו משחק */
  restartQuiz: () => void;
}

const INITIAL_STATE: QuizGameState = {
  phase: 'menu',
  gameId: null,
  index: 0,
  total: 0,
  score: 0,
  selected: null,
  isCorrect: null,
};

export const useQuizGameStore = create<QuizGameState & QuizGameActions>()(
  devtools(
    (set, get) => ({
      ...INITIAL_STATE,

      startQuiz: (gameId, total) => {
        useGameStore.getState().startGame(gameId);
        useGameProgressStore.getState().resetProgress();
        useGameProgressStore.getState().setGameActive(true);
        set(
          { phase: 'playing', gameId, index: 0, total, score: 0, selected: null, isCorrect: null },
          false,
          'quiz/startQuiz',
        );
      },

      selectAnswer: (id, isCorrect) => {
        const newScore = isCorrect ? get().score + 1 : get().score;
        // עדכן גם את gameProgressStore לסנכרון
        useGameProgressStore.getState().recordAttempt(isCorrect);
        set({ selected: id, isCorrect, score: newScore }, false, 'quiz/selectAnswer');
      },

      nextQuestion: () => {
        const { index, total } = get();
        if (index < total - 1) {
          set({ index: index + 1, selected: null, isCorrect: null }, false, 'quiz/nextQuestion');
        } else {
          // סוף המשחק — שמור high score
          useGameStore.getState().endGame();
          useGameProgressStore.getState().setGameActive(false);
          set({ phase: 'result', selected: null, isCorrect: null }, false, 'quiz/endGame');
        }
      },

      goToMenu: () => {
        useGameProgressStore.getState().setGameActive(false);
        set({ phase: 'menu', selected: null, isCorrect: null }, false, 'quiz/goToMenu');
      },

      restartQuiz: () => {
        const { gameId, total } = get();
        if (gameId) get().startQuiz(gameId, total);
      },
    }),
    { name: 'QuizGameStore' },
  ),
);

// ── Selectors ──────────────────────────────────────────────
export const selectQuizPhase  = (s: QuizGameState) => s.phase;
export const selectQuizScore  = (s: QuizGameState) => s.score;
export const selectQuizIndex  = (s: QuizGameState) => s.index;
export const selectIsAnswered = (s: QuizGameState) => s.selected !== null;
