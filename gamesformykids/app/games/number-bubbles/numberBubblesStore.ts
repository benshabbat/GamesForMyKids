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
    color:  BUBBLE_COLORS[n % BUBBLE_COLORS.length],
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
}

const INITIAL: NumberBubblesState = {
  phase: 'menu', level: 1, bubbles: [], next: 1,
  elapsed: 0, best: null, wrong: false,
};

export const useNumberBubblesStore = makeStore<NumberBubblesState & NumberBubblesActions>(
  'NumberBubblesStore',
  (set, get) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let startTime  = 0;

    function stopTimer() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function beginRound(lvl: number) {
      set(
        { phase: 'playing', level: lvl, bubbles: makeBubbles(5 + lvl * 3), next: 1, elapsed: 0, wrong: false },
        false, 'bubbles/startRound',
      );
      stopTimer();
      startTime = Date.now();
      intervalId = setInterval(() => {
        set({ elapsed: Math.floor((Date.now() - startTime) / 100) / 10 }, false, 'bubbles/tick');
      }, 100);
    }

    return {
      ...INITIAL,

      startGame:  () => beginRound(1),
      startRound: (lvl: number) => beginRound(lvl),
      nextLevel:  () => beginRound(get().level + 1),

      tap: (bubble: Bubble) => {
        const { phase, bubbles, next, level, best } = get();
        if (phase !== 'playing' || bubble.popped) return;

        if (bubble.num !== next) {
          set({ wrong: true }, false, 'bubbles/wrong');
          setTimeout(() => set({ wrong: false }, false, 'bubbles/clearWrong'), 600);
          return;
        }

        const updated  = bubbles.map(b => b.id === bubble.id ? { ...b, popped: true } : b);
        const allPopped = updated.every(b => b.popped);

        if (allPopped) {
          stopTimer();
          const t      = Math.floor((Date.now() - startTime) / 100) / 10;
          const newBest = best && best.time <= t && best.level >= level ? best : { level, time: t };
          set({ bubbles: updated, next: next + 1, elapsed: t, phase: 'results', best: newBest }, false, 'bubbles/complete');
        } else {
          set({ bubbles: updated, next: next + 1 }, false, 'bubbles/pop');
        }
      },
    };
  },
);
