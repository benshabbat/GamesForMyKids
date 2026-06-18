'use client';
import { create } from 'zustand';
import type { SoundCategory, SoundClip } from './data/soundClips';

type Phase = 'menu' | 'playing' | 'result';

interface SoundQuizState {
  phase: Phase;
  category: SoundCategory | 'all';
  current: SoundClip | null;
  choices: SoundClip[];
  choicesRevealed: boolean;
  score: number;
  total: number;
  lastCorrect: boolean | null;
  // actions
  startGame:      (cat: SoundCategory | 'all') => void;
  revealChoices:  () => void;
  selectAnswer:   (clip: SoundClip, correct: boolean) => void;
  nextQuestion:   (clip: SoundClip, choices: SoundClip[]) => void;
  endGame:        () => void;
  reset:          () => void;
}

export const useSoundQuizStore = create<SoundQuizState>((set) => ({
  phase: 'menu',
  category: 'all',
  current: null,
  choices: [],
  choicesRevealed: false,
  score: 0,
  total: 0,
  lastCorrect: null,

  startGame: (cat) => set({ phase: 'playing', category: cat, score: 0, total: 0, lastCorrect: null }),
  revealChoices: () => set({ choicesRevealed: true }),
  selectAnswer: (_, correct) => set(s => ({
    score: correct ? s.score + 1 : s.score,
    total: s.total + 1,
    lastCorrect: correct,
    choicesRevealed: false,
  })),
  nextQuestion: (clip, choices) => set({ current: clip, choices, choicesRevealed: false, lastCorrect: null }),
  endGame: () => set({ phase: 'result' }),
  reset: () => set({ phase: 'menu', current: null, choices: [], score: 0, total: 0, lastCorrect: null }),
}));
