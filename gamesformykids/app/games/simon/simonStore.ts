import { makePersistStore } from '@/lib/stores/createStore';
import type { PhaseSimon as Phase } from '@/lib/types';
import { getRandomItem } from '@/lib/utils';

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

/** Outcome of judging one tap — see `registerTap`. */
export type TapResult = 'ignored' | 'wrong' | 'correct' | 'round-complete';

interface SimonActions {
  setPhase:      (phase: Phase) => void;
  setActiveColor: (color: ButtonId | null) => void;
  setPlayerIdx:  (idx: number) => void;
  updateBest:    (score: number) => void;
  setRoundScore: (score: number) => void;
  setSequence:   (seq: ButtonId[]) => void;
  initGame:      () => void;
  /**
   * Judge one player tap against the sequence. Taps outside the 'input' phase are ignored.
   * - wrong: phase -> 'dead', best/roundScore updated.
   * - round-complete: the sequence grows by one colour and the phase flips to 'showing'
   *   immediately, so a tap during the pause before the replay can't be judged against
   *   the colour the player hasn't been shown yet.
   */
  registerTap:   (id: ButtonId) => TapResult;
}

const INITIAL: SimonState = {
  phase: 'menu',
  activeColor: null,
  playerIdx: 0,
  best: 0,
  roundScore: 0,
  sequence: [],
};

export const useSimonStore = makePersistStore<SimonState & SimonActions>('SimonStore', 'simon-best', (set, get) => ({
  ...INITIAL,
  setPhase:       (phase) => set({ phase }, false, 'simon/setPhase'),
  setActiveColor: (color) => set({ activeColor: color }, false, 'simon/setActiveColor'),
  setPlayerIdx:   (idx)   => set({ playerIdx: idx }, false, 'simon/setPlayerIdx'),
  updateBest:     (score) => set((s) => ({ best: Math.max(s.best, score) }), false, 'simon/updateBest'),
  setRoundScore:  (score) => set({ roundScore: score }, false, 'simon/setRoundScore'),
  setSequence:    (seq)   => set({ sequence: seq }, false, 'simon/setSequence'),

  initGame: () => {
    const first = getRandomItem([...BUTTONS]).id;
    const seq: ButtonId[] = [first];
    // Reset the run but keep `best` — it's the persisted high score, not per-game state.
    const { best: _best, ...freshRun } = INITIAL;
    set({ ...freshRun, sequence: seq, roundScore: 0 }, false, 'simon/initGame');
  },

  registerTap: (id) => {
    const { phase, playerIdx, sequence, best } = get();
    if (phase !== 'input') return 'ignored';

    if (id !== sequence[playerIdx]) {
      const score = sequence.length - 1;
      set({ phase: 'dead', roundScore: score, best: Math.max(best, score) }, false, 'simon/wrongTap');
      return 'wrong';
    }

    const next = playerIdx + 1;
    if (next < sequence.length) {
      set({ playerIdx: next }, false, 'simon/correctTap');
      return 'correct';
    }

    set({
      phase: 'showing',
      playerIdx: 0,
      roundScore: sequence.length,
      sequence: [...sequence, getRandomItem([...BUTTONS]).id],
    }, false, 'simon/roundComplete');
    return 'round-complete';
  },
}), { partialize: (s) => ({ best: s.best }) });
