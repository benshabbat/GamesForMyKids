'use client';
import { create } from 'zustand';
import { HEBREW_LETTER_PATHS, type HebrewLetterPath } from '@/lib/constants/gameData/hebrewLetterPaths';

export type TraceDifficulty = 'guided' | 'free';
export type TracePhase = 'menu' | 'tracing' | 'result';

interface LetterTraceState {
  phase: TracePhase;
  difficulty: TraceDifficulty;
  letters: HebrewLetterPath[];
  currentIndex: number;
  score: number;
  total: number;
}

interface LetterTraceActions {
  startGame: (difficulty?: TraceDifficulty) => void;
  nextLetter: (success: boolean) => void;
  restart: () => void;
}

export const useLetterTraceStore = create<LetterTraceState & LetterTraceActions>((set, get) => ({
  phase: 'menu',
  difficulty: 'guided',
  letters: [...HEBREW_LETTER_PATHS],
  currentIndex: 0,
  score: 0,
  total: 0,

  startGame: (difficulty = 'guided') =>
    set({
      phase: 'tracing',
      difficulty,
      letters: [...HEBREW_LETTER_PATHS].sort(() => Math.random() - 0.5),
      currentIndex: 0,
      score: 0,
      total: 0,
    }),

  nextLetter: (success) => {
    const { currentIndex, letters, score, total } = get();
    const next = currentIndex + 1;
    if (next >= letters.length) {
      set({ phase: 'result', score: score + (success ? 1 : 0), total: total + 1 });
    } else {
      set({ currentIndex: next, score: score + (success ? 1 : 0), total: total + 1 });
    }
  },

  restart: () =>
    set({
      phase: 'menu',
      currentIndex: 0,
      score: 0,
      total: 0,
    }),
}));
