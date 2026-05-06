import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface StackState {
  phase: PhaseDead;
  score: number;
  best: number;
}

interface StackActions {
  startPlaying: () => void;
  setScore: (score: number) => void;
  endGame: (score: number) => void;
}

export const useStackStore = makeStore<StackState & StackActions>(
  'StackStore',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    startPlaying: () => set({ phase: 'playing', score: 0 }, false, 'stack/startPlaying'),
    setScore: (score) => set({ score }, false, 'stack/setScore'),
    endGame: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best }, false, 'stack/endGame');
    },
  }),
);
