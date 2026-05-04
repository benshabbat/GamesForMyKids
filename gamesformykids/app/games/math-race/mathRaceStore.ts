import { makeStore } from '@/lib/stores/createStore';
import type { ArithOp as Op, PhaseDead as Phase } from '@/lib/types';
import { randInt as rnd } from '@/lib/utils';

// ── Question helpers ────────────────────────────────────────────────────────

export interface Question { text: string; answer: number; choices: number[]; }

export function makeQ(score: number): Question {
  const level = Math.floor(score / 30);
  let a: number, b: number, op: Op, answer: number;
  if (level < 3) {
    op = '+'; a = rnd(1, 10 + level * 5); b = rnd(1, 10 + level * 3);
    answer = a + b;
  } else if (level < 6) {
    op = Math.random() < 0.5 ? '+' : '-';
    a = rnd(5, 20); b = rnd(1, op === '-' ? a : 15);
    answer = op === '+' ? a + b : a - b;
  } else {
    op = Math.random() < 0.4 ? '×' : (Math.random() < 0.5 ? '+' : '-');
    if (op === '×') { a = rnd(2, 9); b = rnd(2, 9); answer = a * b; }
    else if (op === '+') { a = rnd(10, 50); b = rnd(10, 50); answer = a + b; }
    else { a = rnd(20, 60); b = rnd(1, a); answer = a - b; }
  }
  const text = `${a} ${op} ${b} = ?`;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-5, 5) * (level < 3 ? 1 : 2);
    if (w !== answer && w >= 0) wrong.add(w);
  }
  return { text, answer, choices: [...wrong, answer].sort(() => Math.random() - 0.5) };
}

// ── Store ───────────────────────────────────────────────────────────────────

export const GAME_TIME = 30;

interface MathRaceState {
  phase:    Phase;
  q:        Question;
  score:    number;
  best:     number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  streak:   number;
  total:    number;
  correct:  number;
}

interface MathRaceActions {
  startGame: () => void;
  tap:       (choice: number) => void;
}

const INITIAL: MathRaceState = {
  phase: 'menu', q: makeQ(0), score: 0, best: 0,
  timeLeft: GAME_TIME, feedback: null, streak: 0, total: 0, correct: 0,
};

export const useMathRaceStore = makeStore<MathRaceState & MathRaceActions>(
  'MathRaceStore',
  (set, get) => {
    let gameTimerId:  ReturnType<typeof setInterval> | null = null;
    let feedbackId:   ReturnType<typeof setTimeout>  | null = null;

    function clearTimers() {
      if (gameTimerId) { clearInterval(gameTimerId); gameTimerId = null; }
      if (feedbackId)  { clearTimeout(feedbackId);   feedbackId  = null; }
    }

    function startGameTimer() {
      if (typeof window === 'undefined') return;
      gameTimerId = setInterval(() => {
        const { timeLeft, score, best } = get();
        if (timeLeft <= 1) {
          clearTimers();
          set({ timeLeft: 0, phase: 'dead', best: Math.max(best, score) }, false, 'mathRace/gameOver');
        } else {
          set({ timeLeft: timeLeft - 1 }, false, 'mathRace/tick');
        }
      }, 1000);
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearTimers();
        set({ ...INITIAL, phase: 'playing', best: get().best, q: makeQ(0) }, false, 'mathRace/startGame');
        startGameTimer();
      },

      tap: (choice: number) => {
        const { phase, feedback, q, score, streak, total, correct } = get();
        if (phase !== 'playing' || feedback !== null) return;

        const newTotal = total + 1;
        if (choice === q.answer) {
          const newStreak  = streak + 1;
          const pts        = newStreak >= 3 ? 20 : 10;
          const newScore   = score + pts;
          const newCorrect = correct + 1;
          set({ score: newScore, streak: newStreak, total: newTotal, correct: newCorrect, feedback: 'correct' }, false, 'mathRace/correct');
          feedbackId = setTimeout(() => {
            set({ feedback: null, q: makeQ(get().score) }, false, 'mathRace/nextQ');
          }, 500);
        } else {
          set({ streak: 0, total: newTotal, feedback: 'wrong' }, false, 'mathRace/wrong');
          feedbackId = setTimeout(() => {
            set({ feedback: null, q: makeQ(get().score) }, false, 'mathRace/nextQ');
          }, 500);
        }
      },
    };
  },
);
