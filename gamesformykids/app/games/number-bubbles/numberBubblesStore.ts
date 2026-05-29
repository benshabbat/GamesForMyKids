import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResults as Phase } from '@/lib/types';

// ── Data helpers ───────────────────────────────────────────────────────────

export const BUBBLE_COLORS = [
  'bg-red-400','bg-blue-400','bg-green-400','bg-yellow-400',
  'bg-purple-400','bg-pink-400','bg-orange-400','bg-teal-400',
  'bg-indigo-400','bg-rose-400','bg-lime-400','bg-cyan-400',
  'bg-fuchsia-400','bg-amber-400','bg-emerald-400',
];

export interface Bubble { id: number; num: number; x: number; y: number; color: string; popped: boolean; }

let uid = 0;

export function makeBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => i + 1).map(n => ({
    id:     uid++,
    num:    n,
    x:      5 + Math.random() * 75,
    y:      5 + Math.random() * 80,
    color:  BUBBLE_COLORS[n % BUBBLE_COLORS.length]!,
    popped: false,
  }));
}

// ── Store ──────────────────────────────────────────────────────────────────

interface NumberBubblesState {
  phase:   Phase;
  level:   number;
  bubbles: Bubble[];
  next:    number;
  elapsed: number;
  best:    { level: number; time: number } | null;
  wrong:   boolean;
}

interface NumberBubblesActions {
  startGame:  () => void;
  startRound: (lvl: number) => void;
  nextLevel:  () => void;
  tap:        (bubble: Bubble) => void;
  tick:       (elapsed: number) => void;
  clearWrong: () => void;
}

const INITIAL: NumberBubblesState = {
  phase: 'menu', level: 1, bubbles: [], next: 1,
  elapsed: 0, best: null, wrong: false,
};

export const useNumberBubblesStore = makeStore<NumberBubblesState & NumberBubblesActions>(
  'NumberBubblesStore',
  (set, get) => ({
    ...INITIAL,

    startGame:  () => set(
      { phase: 'playing', level: 1, bubbles: makeBubbles(5 + 3), next: 1, elapsed: 0, wrong: false },
      false, 'bubbles/startRound',
    ),

    startRound: (lvl: number) => set(
      { phase: 'playing', level: lvl, bubbles: makeBubbles(5 + lvl * 3), next: 1, elapsed: 0, wrong: false },
      false, 'bubbles/startRound',
    ),

    nextLevel: () => {
      const lvl = get().level + 1;
      set(
        { phase: 'playing', level: lvl, bubbles: makeBubbles(5 + lvl * 3), next: 1, elapsed: 0, wrong: false },
        false, 'bubbles/startRound',
      );
    },

    tick: (elapsed) => set({ elapsed }, false, 'bubbles/tick'),

    clearWrong: () => set({ wrong: false }, false, 'bubbles/clearWrong'),

    tap: (bubble: Bubble) => {
      const { phase, bubbles, next, level, best, elapsed } = get();
      if (phase !== 'playing' || bubble.popped) return;

      if (bubble.num !== next) {
        set({ wrong: true }, false, 'bubbles/wrong');
        return;
      }

      const updated   = bubbles.map(b => b.id === bubble.id ? { ...b, popped: true } : b);
      const allPopped = updated.every(b => b.popped);

      if (allPopped) {
        const newBest = best && best.time <= elapsed && best.level >= level ? best : { level, time: elapsed };
        set({ bubbles: updated, next: next + 1, phase: 'results', best: newBest }, false, 'bubbles/complete');
      } else {
        set({ bubbles: updated, next: next + 1 }, false, 'bubbles/pop');
      }
    },
  }),
);
