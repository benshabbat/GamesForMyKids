import { makePersistStore } from '@/lib/stores/createStore';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';
import type { PhaseResult as Phase } from '@/lib/types';

// ── Constants ──────────────────────────────────────────────────────────────

const GRID = 9;
export const GAME_DURATION = 30;
const MOLES = ['🐹', '🐭', '🦔', '🐿️'];
const BAD   = '💣';

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
  startGame: () => void;
  whack:     (idx: number) => void;
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
    let moleSpawnRef: ReturnType<typeof setTimeout>  | null = null;
    const moleTimers: (ReturnType<typeof setTimeout> | null)[] = Array(GRID).fill(null);

    const timer = setupGameTimer({
      name: 'whack',
      set, get,
      onEnd: () => {
        if (moleSpawnRef) { clearTimeout(moleSpawnRef); moleSpawnRef = null; }
        moleTimers.forEach((t, i) => { if (t) { clearTimeout(t); moleTimers[i] = null; } });
        const { score, best } = get();
        set({ timeLeft: 0, phase: 'result', best: Math.max(best, score) }, false, 'whack/gameOver');
      },
    });

    function clearAllTimers() {
      timer.stop();
      if (moleSpawnRef) { clearTimeout(moleSpawnRef); moleSpawnRef = null; }
      moleTimers.forEach((t, i) => { if (t) { clearTimeout(t); moleTimers[i] = null; } });
    }

    function spawnMole() {
      if (get().phase !== 'playing') return;

      const { holes, holeValues } = get();
      const emptyIdxs = holes
        .map((h, i) => ({ h, i }))
        .filter(({ h }) => h === 'empty')
        .map(({ i }) => i);

      if (emptyIdxs.length > 0) {
        const idx    = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)]!;
        const isBad  = Math.random() < 0.15;
        const val    = isBad ? BAD : MOLES[Math.floor(Math.random() * MOLES.length)]!;
        const newH   = [...holes] as HoleState[];
        const newV   = [...holeValues];
        newH[idx]    = isBad ? 'bad' : 'mole';
        newV[idx]    = val;
        set({ holes: newH, holeValues: newV }, false, 'whack/spawn');

        moleTimers[idx] = setTimeout(() => {
          const { holes: cur, holeValues: curV } = get();
          if (cur[idx] === 'mole' || cur[idx] === 'bad') {
            const h = [...cur] as HoleState[];
            const v = [...curV];
            h[idx] = 'empty';
            v[idx] = '';
            set({ holes: h, holeValues: v }, false, 'whack/autoHide');
          }
          moleTimers[idx] = null;
        }, 800 + Math.random() * 800);
      }

      moleSpawnRef = setTimeout(spawnMole, 400 + Math.random() * 600);
    }

    return {
      ...freshState(),

      startGame: () => {
        clearAllTimers();
        set({ ...freshState(get().best), phase: 'playing' }, false, 'whack/startGame');
        timer.start();
        moleSpawnRef = setTimeout(spawnMole, 400);
      },

      whack: (idx: number) => {
        if (get().phase !== 'playing') return;
        const { holes, holeValues, score, combo } = get();
        const state = holes[idx];
        if (state !== 'mole' && state !== 'bad') return;

        if (moleTimers[idx]) { clearTimeout(moleTimers[idx]!); moleTimers[idx] = null; }

        const newH = [...holes] as HoleState[];
        const newV = [...holeValues];
        if (state === 'mole') {
          newH[idx] = 'hit';
          set({ holes: newH, score: score + 10, combo: combo + 1 }, false, 'whack/hit');
        } else {
          newH[idx] = 'miss';
          set({ holes: newH, holeValues: newV, score: Math.max(0, score - 15), combo: 0 }, false, 'whack/bad');
        }

        setTimeout(() => {
          const { holes: cur, holeValues: curV } = get();
          const h = [...cur] as HoleState[];
          const v = [...curV];
          h[idx] = 'empty';
          v[idx] = '';
          set({ holes: h, holeValues: v }, false, 'whack/clear');
        }, 300);
      },
    };
  },
  { partialize: (s) => ({ best: s.best }) },
);
