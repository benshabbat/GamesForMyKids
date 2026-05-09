import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseDead } from '@/lib/types';

interface JumperState {
  phase: PhaseDead;
  score: number;
  best: number;
}

interface JumperActions {
  startPlaying: () => void;
  setScore: (score: number) => void;
  endGame: (score: number) => void;
}

export const useJumperStore = makePersistStore<JumperState & JumperActions>(
  'JumperStore',
  'jumper-best',
  (set, get) => ({
    phase: 'menu',
    score: 0,
    best: 0,
    startPlaying: () => set({ phase: 'playing', score: 0 }, false, 'jumper/startPlaying'),
    setScore: (score) => set({ score }, false, 'jumper/setScore'),
    endGame: (score) => {
      const best = Math.max(score, get().best);
      set({ phase: 'dead', score, best }, false, 'jumper/endGame');
    },
  }),
  { partialize: (s) => ({ best: s.best }) },
);
