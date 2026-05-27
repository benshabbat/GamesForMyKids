import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseSimon as Phase } from '@/lib/types';

export const BUTTONS = [
  { id: 'red',    bg: 'bg-red-500',    active: 'bg-red-200',    label: '' },
  { id: 'blue',   bg: 'bg-blue-500',   active: 'bg-blue-200',   label: '' },
  { id: 'green',  bg: 'bg-green-500',  active: 'bg-green-200',  label: '' },
  { id: 'yellow', bg: 'bg-yellow-400', active: 'bg-yellow-100', label: '' },
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
  startGame:     () => void;
}

const INITIAL: SimonState = {
  phase: 'menu',
  activeColor: null,
  playerIdx: 0,
  best: 0,
  roundScore: 0,
  sequence: [],
};

function flash(id: ButtonId, ms: number): Promise<void> {
  return new Promise(resolve => {
    useSimonStore.getState().setActiveColor(id);
    setTimeout(() => {
      useSimonStore.getState().setActiveColor(null);
      setTimeout(resolve, 120);
    }, ms);
  });
}

export async function showSequence(seq: ButtonId[]) {
  const store = useSimonStore.getState();
  store.setPhase('showing');
  store.setPlayerIdx(0);
  await new Promise(r => setTimeout(r, 500));
  const speed = Math.max(280, 650 - seq.length * 25);
  for (const id of seq) {
    if (useSimonStore.getState().phase !== 'showing') return;
    await flash(id, speed);
  }
  if (useSimonStore.getState().phase !== 'showing') return;
  useSimonStore.getState().setPhase('input');
  useSimonStore.getState().setPlayerIdx(0);
}

export const useSimonStore = makePersistStore<SimonState & SimonActions>('SimonStore', 'simon-best', (set) => ({
  ...INITIAL,
  setPhase:       (phase) => set({ phase }, false, 'simon/setPhase'),
  setActiveColor: (color) => set({ activeColor: color }, false, 'simon/setActiveColor'),
  setPlayerIdx:   (idx)   => set({ playerIdx: idx }, false, 'simon/setPlayerIdx'),
  updateBest:     (score) => set((s) => ({ best: Math.max(s.best, score) }), false, 'simon/updateBest'),
  setRoundScore:  (score) => set({ roundScore: score }, false, 'simon/setRoundScore'),
  setSequence:    (seq)   => set({ sequence: seq }, false, 'simon/setSequence'),

  startGame: () => {
    const first = BUTTONS[Math.floor(Math.random() * BUTTONS.length)]!.id;
    const seq: ButtonId[] = [first];
    useSimonStore.getState().setSequence(seq);
    useSimonStore.getState().setRoundScore(0);
    showSequence(seq);
  },
}), { partialize: (s) => ({ best: s.best }) });
