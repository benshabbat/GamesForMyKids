import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface MeteorState {
  phase: PhaseDead;
  score: number;
  best: number;
}

interface MeteorActions {
  startPlaying: () => void;
  setScore: (score: number) => void;
  endGame: (score: number) => void;
}

export const useMeteorDodgeStore = makeStore<MeteorState & MeteorActions>(
  'MeteorDodgeStore',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    startPlaying: () => set({ phase: 'playing', score: 0 }, false, 'meteor/startPlaying'),
    setScore: (score) => set({ score }, false, 'meteor/setScore'),
    endGame: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best }, false, 'meteor/endGame');
    },
  }),
);
