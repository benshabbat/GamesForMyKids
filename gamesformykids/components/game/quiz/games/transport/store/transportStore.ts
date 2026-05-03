'use client';

import { create } from 'zustand';
import type { PhaseQuiz as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';
import {
  TRANSPORT_QUESTIONS,
  TRANSPORT_TYPES,
  type TransportType,
  type TransportQuestion,
} from '../data/transport';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

interface TransportStore {
  // Base quiz state
  phase: Phase;
  questions: TransportQuestion[];
  currentIndex: number;
  selected: number | null;
  isCorrect: boolean;
  score: number;

  // Transport-specific state
  transportType: TransportType;
  types: typeof TRANSPORT_TYPES;

  // Derived (computed outside store)
  // currentQuestion and total are read via selectors

  // Actions
  startGame: (type?: TransportType) => void;
  selectAnswer: (idx: number) => void;
  nextQuestion: () => void;
  goToMenu: () => void;
}

export const useTransportStore = create<TransportStore>((set, get) => ({
  // Base quiz state
  phase: 'menu',
  questions: [],
  currentIndex: 0,
  selected: null,
  isCorrect: false,
  score: 0,

  // Transport-specific
  transportType: 'הכל',
  types: TRANSPORT_TYPES,

  startGame: (type = 'הכל') => {
    const pool =
      type === 'הכל'
        ? TRANSPORT_QUESTIONS
        : TRANSPORT_QUESTIONS.filter((q) => q.type === type);
    const questions = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    set({
      transportType: type,
      questions,
      currentIndex: 0,
      selected: null,
      isCorrect: false,
      score: 0,
      phase: 'playing',
    });
  },

  selectAnswer: (idx) => {
    const { phase, questions, currentIndex } = get();
    if (phase !== 'playing') return;
    const q = questions[currentIndex];
    if (!q) return;
    const correct = q.correctIndex === idx;
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
}));
