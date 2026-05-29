import { makePersistStore } from '@/lib/stores/createStore';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';
import type { PhaseResult as Phase } from '@/lib/types';

// ── Constants ──────────────────────────────────────────────────────────────

const GRID = 9;
export const GAME_DURATION = 30;
export const MOLES = ['🐹', '🐭', '🦔', '🐿️'];
export const BAD   = '💣';

export type HoleState = 'empty' | 'mole' | 'bad' | 'hit' | 'miss';

// ── Store ──────────────────────────────────────────────────────────────────

interface WhackAMoleState {
  phase:      Phase;
  holes:      HoleState[];
  holeValues: string[];
  score:      number;
  timeLeft:   number;
  best:       number;
  combo:      number;
}

interface WhackAMoleActions {
  startGame:  () => void;
  whack:      (idx: number) => void;
  showMole:   (idx: number, val: string, isBad: boolean) => void;
  hideMole:   (idx: number) => void;
  clearHole:  (idx: number) => void;
}

function freshState(best = 0): WhackAMoleState {
  return {
    phase: 'menu',
    holes:      Array(GRID).fill('empty') as HoleState[],
    holeValues: Array(GRID).fill('') as string[],
    score: 0, timeLeft: GAME_DURATION, best, combo: 0,
  };
}

export const useWhackAMoleStore = makePersistStore<WhackAMoleState & WhackAMoleActions>(
  'WhackAMoleStore',
  'whack-a-mole-best',
  (set, get) => {
    const timer = setupGameTimer({
      name: 'whack',
      set, get,
      onEnd: () => {
        const { score, best } = get();
        set({ timeLeft: 0, phase: 'result', best: Math.max(best, score) }, false, 'whack/gameOver');
      },
    });

    return {
      ...freshState(),

      startGame: () => {
        timer.stop();
        set({ ...freshState(get().best), phase: 'playing' }, false, 'whack/startGame');
        timer.start();
      },

      whack: (idx: number) => {
        if (get().phase !== 'playing') return;
        const { holes, holeValues, score, combo } = get();
        const state = holes[idx];
        if (state !== 'mole' && state !== 'bad') return;

        const newH = [...holes] as HoleState[];
        const newV = [...holeValues];
        if (state === 'mole') {
          newH[idx] = 'hit';
          set({ holes: newH, score: score + 10, combo: combo + 1 }, false, 'whack/hit');
        } else {
          newH[idx] = 'miss';
          set({ holes: newH, holeValues: newV, score: Math.max(0, score - 15), combo: 0 }, false, 'whack/bad');
        }
      },

      showMole: (idx: number, val: string, isBad: boolean) => {
        const { holes, holeValues } = get();
        const newH = [...holes] as HoleState[];
        const newV = [...holeValues];
        newH[idx] = isBad ? 'bad' : 'mole';
        newV[idx] = val;
        set({ holes: newH, holeValues: newV }, false, 'whack/spawn');
      },

      hideMole: (idx: number) => {
        const { holes, holeValues } = get();
        if (holes[idx] !== 'mole' && holes[idx] !== 'bad') return;
        const newH = [...holes] as HoleState[];
        const newV = [...holeValues];
        newH[idx] = 'empty';
        newV[idx] = '';
        set({ holes: newH, holeValues: newV }, false, 'whack/autoHide');
      },

      clearHole: (idx: number) => {
        const { holes, holeValues } = get();
        const newH = [...holes] as HoleState[];
        const newV = [...holeValues];
        newH[idx] = 'empty';
        newV[idx] = '';
        set({ holes: newH, holeValues: newV }, false, 'whack/clear');
      },
    };
  },
  { partialize: (s) => ({ best: s.best }) },
);
