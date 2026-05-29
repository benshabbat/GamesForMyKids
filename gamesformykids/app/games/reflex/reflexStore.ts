import { makeStore } from '@/lib/stores/createStore';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';
import type { PhaseResult as Phase } from '@/lib/types';
import { GAME_DURATION, type Target } from './data/targets';

export type { Target } from './data/targets';

// ── Store ──────────────────────────────────────────────────────────────────

interface ReflexState {
  phase:    Phase;
  targets:  Target[];
  score:    number;
  missed:   number;
  timeLeft: number;
}

interface ReflexActions {
  startGame:    () => void;
  hitTarget:    (id: number) => void;
  addTarget:    (target: Target) => void;
  expireTarget: (id: number) => void;
}

const INITIAL: ReflexState = {
  phase: 'menu', targets: [], score: 0, missed: 0, timeLeft: GAME_DURATION,
};

export const useReflexStore = makeStore<ReflexState & ReflexActions>(
  'ReflexStore',
  (set, get) => {
    const timer = setupGameTimer({
      name: 'reflex',
      set, get,
      onEnd: () => {
        set({ timeLeft: 0, phase: 'result' }, false, 'reflex/gameOver');
      },
    });

    return {
      ...INITIAL,

      startGame: () => {
        timer.stop();
        set({ ...INITIAL, phase: 'playing' }, false, 'reflex/startGame');
        timer.start();
      },

      hitTarget: (id: number) => {
        const { targets, score } = get();
        if (!targets.find(t => t.id === id)) return;
        set({ targets: targets.filter(t => t.id !== id), score: score + 1 }, false, 'reflex/hit');
      },

      addTarget: (target: Target) => {
        set({ targets: [...get().targets, target] }, false, 'reflex/spawn');
      },

      expireTarget: (id: number) => {
        const { targets, missed } = get();
        if (!targets.find(t => t.id === id)) return;
        set({ targets: targets.filter(t => t.id !== id), missed: missed + 1 }, false, 'reflex/expire');
      },
    };
  },
);
