import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseSimon as Phase } from '@/lib/types';

export const BUTTONS = [
  { id: 'red',    bg: 'bg-red-500',    active: 'bg-red-200',    label: '▲' },
  { id: 'blue',   bg: 'bg-blue-500',   active: 'bg-blue-200',   label: '●' },
  { id: 'green',  bg: 'bg-green-500',  active: 'bg-green-200',  label: '■' },
  { id: 'yellow', bg: 'bg-yellow-400', active: 'bg-yellow-100', label: '◆' },
] as const;

export type ButtonId = typeof BUTTONS[number]['id'];

interface SimonState {
  phase:       Phase;
  activeColor: ButtonId | null;
  playerIdx:   number;
  best:        number;
  roundScore:  number;
  sequence:    ButtonId[];
}

interface SimonActions {
  setPhase:      (phase: Phase) => void;
  setActiveColor: (color: ButtonId | null) => void;
  setPlayerIdx:  (idx: number) => void;
  updateBest:    (score: number) => void;
  setRoundScore: (score: number) => void;
  setSequence:   (seq: ButtonId[]) => void;
  initGame:      () => void;
}

const INITIAL: SimonState = {
  phase: 'menu',
  activeColor: null,
  playerIdx: 0,
  best: 0,
  roundScore: 0,
  sequence: [],
};

export const useSimonStore = makePersistStore<SimonState & SimonActions>('SimonStore', 'simon-best', (set) => ({
  ...INITIAL,
  setPhase:       (phase) => set({ phase }, false, 'simon/setPhase'),
  setActiveColor: (color) => set({ activeColor: color }, false, 'simon/setActiveColor'),
  setPlayerIdx:   (idx)   => set({ playerIdx: idx }, false, 'simon/setPlayerIdx'),
  updateBest:     (score) => set((s) => ({ best: Math.max(s.best, score) }), false, 'simon/updateBest'),
  setRoundScore:  (score) => set({ roundScore: score }, false, 'simon/setRoundScore'),
  setSequence:    (seq)   => set({ sequence: seq }, false, 'simon/setSequence'),

  initGame: () => {
    const first = BUTTONS[Math.floor(Math.random() * BUTTONS.length)]!.id;
    const seq: ButtonId[] = [first];
    set({ ...INITIAL, sequence: seq, roundScore: 0 }, false, 'simon/initGame');
  },
}), { partialize: (s) => ({ best: s.best }) });
