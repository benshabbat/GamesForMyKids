/**
 * ===============================================
 * createQuizStore — Zustand factory
 * ===============================================
 * Factory that generates a typed Zustand store for
 * quiz-style games (menu → playing → answered → finished).
 *
 * Each game extends the base slice with its own
 * category/filter state and questions array.
 */

import { create, StateCreator } from 'zustand';
import type { PhaseQuiz as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';

// ── Base quiz state ──────────────────────────────────────────
export interface QuizBaseState<TQuestion> {
  phase: Phase;
  questions: TQuestion[];
  currentIndex: number;
  selected: number | null;
  isCorrect: boolean;
  score: number;
}

// ── Base quiz actions ────────────────────────────────────────
export interface QuizBaseActions<TQuestion> {
  /** Internal: replace the questions array and reset state */
  _setQuestions: (questions: TQuestion[], phase?: Phase) => void;
  selectAnswer: (idx: number, correctIndex: number) => void;
  nextQuestion: () => void;
  goToMenu: () => void;
}

// ── Derived helpers (not stored, computed from state) ────────
export function getQuizDerived<TQuestion>(
  state: QuizBaseState<TQuestion>,
) {
  return {
    currentQuestion: state.questions[state.currentIndex] ?? null,
    total: state.questions.length,
  };
}

// ── Initial base state ───────────────────────────────────────
export function quizInitialState<TQuestion>(): QuizBaseState<TQuestion> {
  return {
    phase: 'menu',
    questions: [],
    currentIndex: 0,
    selected: null,
    isCorrect: false,
    score: 0,
  };
}

// ── Base slice creator ───────────────────────────────────────
export function createQuizBaseSlice<TQuestion>(
  questionsPerGame: number,
  allQuestions: TQuestion[],
  filterFn: (q: TQuestion, filter: string) => boolean,
  noFilterValue: string,
): StateCreator<
  QuizBaseState<TQuestion> & QuizBaseActions<TQuestion>,
  [],
  [],
  QuizBaseState<TQuestion> & QuizBaseActions<TQuestion>
> {
  return (set, get) => ({
    ...quizInitialState<TQuestion>(),

    _setQuestions: (questions, phase = 'playing') => {
      set({
        questions,
        currentIndex: 0,
        selected: null,
        isCorrect: false,
        score: 0,
        phase,
      });
    },

    selectAnswer: (idx, correctIndex) => {
      if (get().phase !== 'playing') return;
      const correct = correctIndex === idx;
      set((s) => ({
        selected: idx,
        isCorrect: correct,
        score: correct ? s.score + 1 : s.score,
        phase: 'answered',
      }));
    },

    nextQuestion: () => {
      const next = get().currentIndex + 1;
      if (next >= get().questions.length) {
        set({ phase: 'finished' });
        return;
      }
      set({ currentIndex: next, selected: null, isCorrect: false, phase: 'playing' });
    },

    goToMenu: () =>
      set({ phase: 'menu', score: 0, currentIndex: 0, selected: null }),
  });
}

// ── Convenience: create a full standalone quiz store ─────────
export function createQuizStore<TQuestion>(
  questionsPerGame: number,
  allQuestions: TQuestion[],
  filterFn: (q: TQuestion, filter: string) => boolean,
  noFilterValue: string,
) {
  type Store = QuizBaseState<TQuestion> & QuizBaseActions<TQuestion>;

  const store = create<Store>(
    createQuizBaseSlice(questionsPerGame, allQuestions, filterFn, noFilterValue),
  );

  /** Helper: pick shuffled questions and call _setQuestions */
  const loadQuestions = (filter: string) => {
    const pool =
      filter === noFilterValue
        ? allQuestions
        : allQuestions.filter((q) => filterFn(q, filter));
    const picked = shuffle(pool).slice(0, questionsPerGame);
    store.getState()._setQuestions(picked);
  };

  return { store, loadQuestions };
}
