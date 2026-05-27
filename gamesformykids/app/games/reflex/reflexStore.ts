import { makeStore } from '@/lib/stores/createStore';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';
import type { PhaseResult as Phase } from '@/lib/types';
import { TARGET_EMOJIS, GAME_DURATION, type Target, getLifetime, getSpawnInterval } from './data/targets';

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
  startGame: () => void;
  hitTarget: (id: number) => void;
}

const INITIAL: ReflexState = {
  phase: 'menu', targets: [], score: 0, missed: 0, timeLeft: GAME_DURATION,
};

export const useReflexStore = makeStore<ReflexState & ReflexActions>(
  'ReflexStore',
  (set, get) => {
    let nextId  = 0;
    let spawnId: ReturnType<typeof setTimeout> | null = null;

    const timer = setupGameTimer({
      name: 'reflex',
      set, get,
      onEnd: () => {
        if (spawnId) { clearTimeout(spawnId); spawnId = null; }
        set({ timeLeft: 0, phase: 'result' }, false, 'reflex/gameOver');
      },
    });

    function clearTimers() {
      timer.stop();
      if (spawnId) { clearTimeout(spawnId); spawnId = null; }
    }

    function spawnTarget() {
      if (get().phase !== 'playing') return;
      const id = nextId++;
      const target: Target = {
        id,
        x:        5 + Math.random() * 80,
        y:        10 + Math.random() * 70,
        emoji:    TARGET_EMOJIS[Math.floor(Math.random() * TARGET_EMOJIS.length)]!,
        lifetime: getLifetime(get().score),
        born:     Date.now(),
      };
      set({ targets: [...get().targets, target] }, false, 'reflex/spawn');

      setTimeout(() => {
        const { targets, missed } = get();
        if (targets.find(t => t.id === id)) {
          set({ targets: targets.filter(t => t.id !== id), missed: missed + 1 }, false, 'reflex/expire');
        }
      }, target.lifetime);

      spawnId = setTimeout(spawnTarget, getSpawnInterval(get().score));
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearTimers();
        nextId = 0;
        set({ ...INITIAL, phase: 'playing' }, false, 'reflex/startGame');
        spawnId = setTimeout(spawnTarget, 600);
        timer.start();
      },

      hitTarget: (id: number) => {
        const { targets, score } = get();
        if (!targets.find(t => t.id === id)) return;
        set({ targets: targets.filter(t => t.id !== id), score: score + 1 }, false, 'reflex/hit');
      },
    };
  },
);
