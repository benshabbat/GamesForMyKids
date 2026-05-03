'use client';

import { create } from 'zustand';
import type { PhaseQuiz as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';
import {
  SOCCER_QUESTIONS,
  SOCCER_CATEGORIES,
  type SoccerCategory,
  type SoccerQuestion,
} from '../data/soccer';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

interface SoccerStore {
  // Base quiz state
  phase: Phase;
  questions: SoccerQuestion[];
  currentIndex: number;
  selected: number | null;
  isCorrect: boolean;
  score: number;

  // Soccer-specific state
  category: SoccerCategory;
  categories: typeof SOCCER_CATEGORIES;
  showGoal: boolean;

  // Actions
  startGame: (cat?: SoccerCategory) => void;
  selectAnswer: (idx: number) => void;
  nextQuestion: () => void;
  goToMenu: () => void;
}

export const useSoccerStore = create<SoccerStore>((set, get) => ({
  // Base quiz state
  phase: 'menu',
  questions: [],
  currentIndex: 0,
  selected: null,
  isCorrect: false,
  score: 0,

  // Soccer-specific
  category: 'הכל',
  categories: SOCCER_CATEGORIES,
  showGoal: false,

  startGame: (cat = 'הכל') => {
    const pool =
      cat === 'הכל'
        ? SOCCER_QUESTIONS
        : SOCCER_QUESTIONS.filter((q) => q.category === cat);
    const questions = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    set({
      category: cat,
      questions,
      currentIndex: 0,
      selected: null,
      isCorrect: false,
      score: 0,
      showGoal: false,
      phase: 'playing',
    });
  },

  selectAnswer: (idx) => {
    const { phase, questions, currentIndex } = get();
    if (phase !== 'playing') return;
    const correct = (questions[currentIndex]?.correctIndex ?? -1) === idx;
    if (correct) {
      set((s) => ({
        selected: idx,
        isCorrect: true,
        score: s.score + 1,
        showGoal: true,
        phase: 'answered',
      }));
      setTimeout(() => set({ showGoal: false }), 1500);
    } else {
      set({ selected: idx, isCorrect: false, phase: 'answered' });
    }
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
    set({ phase: 'menu', score: 0, currentIndex: 0, selected: null, showGoal: false }),
}));
