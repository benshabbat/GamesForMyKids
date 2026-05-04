import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead as Phase } from '@/lib/types';
import type { Question } from './useEmojiMathGame';

interface EmojiMathState {
  phase: Phase;
  score: number;
  best: number;
  lives: number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  q: Question;
  level: number;
  streak: number;
}

interface EmojiMathActions {
  setPhase: (phase: Phase) => void;
  setScore: (score: number) => void;
  updateBest: (score: number) => void;
  setLives: (lives: number) => void;
  setTimeLeft: (t: number) => void;
  setFeedback: (f: 'correct' | 'wrong' | null) => void;
  setQ: (q: Question) => void;
  setLevel: (level: number) => void;
  setStreak: (streak: number) => void;
}

const INITIAL_Q: Question = {
  a: 1, b: 1, op: '+', answer: 2,
  choices: [2, 3, 4, 5], emojiA: '🍎', emojiB: '🍊',
};

const INITIAL: EmojiMathState = {
  phase: 'menu',
  score: 0,
  best: 0,
  lives: 3,
  timeLeft: 8,
  feedback: null,
  q: INITIAL_Q,
  level: 1,
  streak: 0,
};

export const useEmojiMathStore = makeStore<EmojiMathState & EmojiMathActions>(
  'EmojiMathStore',
  (set) => ({
    ...INITIAL,
    setPhase:    (phase)    => set({ phase },                          false, 'emojiMath/setPhase'),
    setScore:    (score)    => set({ score },                          false, 'emojiMath/setScore'),
    updateBest:  (score)    => set((s) => ({ best: Math.max(s.best, score) }), false, 'emojiMath/updateBest'),
    setLives:    (lives)    => set({ lives },                          false, 'emojiMath/setLives'),
    setTimeLeft: (timeLeft) => set({ timeLeft },                       false, 'emojiMath/setTimeLeft'),
    setFeedback: (feedback) => set({ feedback },                       false, 'emojiMath/setFeedback'),
    setQ:        (q)        => set({ q },                              false, 'emojiMath/setQ'),
    setLevel:    (level)    => set({ level },                          false, 'emojiMath/setLevel'),
    setStreak:   (streak)   => set({ streak },                         false, 'emojiMath/setStreak'),
  }),
);
