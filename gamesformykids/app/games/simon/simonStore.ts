import { makeStore } from '@/lib/stores/createStore';
import type { PhaseSimon as Phase } from '@/lib/types';
import type { ButtonId } from './useSimonGame';

interface SimonState {
  phase: Phase;
  activeColor: ButtonId | null;
  playerIdx: number;
  best: number;
  roundScore: number;
  sequence: ButtonId[];
}

interface SimonActions {
  setPhase: (phase: Phase) => void;
  setActiveColor: (color: ButtonId | null) => void;
  setPlayerIdx: (idx: number) => void;
  updateBest: (score: number) => void;
  setRoundScore: (score: number) => void;
  setSequence: (seq: ButtonId[]) => void;
}

const INITIAL: SimonState = {
  phase: 'menu',
  activeColor: null,
  playerIdx: 0,
  best: 0,
  roundScore: 0,
  sequence: [],
};

export const useSimonStore = makeStore<SimonState & SimonActions>('SimonStore', (set) => ({
  ...INITIAL,
  setPhase: (phase) => set({ phase }, false, 'simon/setPhase'),
  setActiveColor: (color) => set({ activeColor: color }, false, 'simon/setActiveColor'),
  setPlayerIdx: (idx) => set({ playerIdx: idx }, false, 'simon/setPlayerIdx'),
  updateBest: (score) => set((s) => ({ best: Math.max(s.best, score) }), false, 'simon/updateBest'),
  setRoundScore: (score) => set({ roundScore: score }, false, 'simon/setRoundScore'),
  setSequence: (seq) => set({ sequence: seq }, false, 'simon/setSequence'),
}));
