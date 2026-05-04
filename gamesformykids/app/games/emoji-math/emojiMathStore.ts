import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead as Phase } from '@/lib/types';
import { randInt as rnd } from '@/lib/utils';

// ── Question helpers ────────────────────────────────────────────────────────

const EMOJIS = ['🍎','🍊','🍋','🍇','🍓','🫐','🍒','🍑','🥝','🍉','🍍','🥭'];

export type Op = '+' | '-';

export interface Question {
  a: number; b: number; op: Op; answer: number;
  choices: number[]; emojiA: string; emojiB: string;
}

function pickEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; }

export function makeQuestion(level: number): Question {
  const maxNum = Math.min(5 + level * 2, 15);
  const op: Op = level < 3 ? '+' : (Math.random() < 0.6 ? '+' : '-');
  let a: number, b: number;
  if (op === '+') {
    a = rnd(1, maxNum); b = rnd(1, maxNum - a + 1);
  } else {
    a = rnd(2, maxNum); b = rnd(1, a);
  }
  const answer = op === '+' ? a + b : a - b;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-3, 3);
    if (w !== answer && w >= 0 && w <= 20) wrong.add(w);
  }
  const choices = [...wrong, answer].sort(() => Math.random() - 0.5);
  const e1 = pickEmoji(), e2 = op === '+' ? pickEmoji() : e1;
  return { a, b, op, answer, choices, emojiA: e1, emojiB: e2 };
}

// ── Store ───────────────────────────────────────────────────────────────────

export const TIME_PER_Q  = 8;
const        INITIAL_LIVES = 3;

interface EmojiMathState {
  phase:    Phase;
  score:    number;
  best:     number;
  lives:    number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  q:        Question;
  level:    number;
  streak:   number;
}

interface EmojiMathActions {
  startGame: () => void;
  tap:       (choice: number) => void;
}

const INITIAL: EmojiMathState = {
  phase: 'menu', score: 0, best: 0, lives: INITIAL_LIVES,
  timeLeft: TIME_PER_Q, feedback: null, q: makeQuestion(1), level: 1, streak: 0,
};

export const useEmojiMathStore = makeStore<EmojiMathState & EmojiMathActions>(
  'EmojiMathStore',
  (set, get) => {
    let countdownId: ReturnType<typeof setInterval> | null = null;
    let feedbackId:  ReturnType<typeof setTimeout>  | null = null;

    function clearCountdown()    { if (countdownId) { clearInterval(countdownId); countdownId = null; } }
    function clearFeedbackTimer(){ if (feedbackId)  { clearTimeout(feedbackId);   feedbackId  = null; } }

    function advanceAfterFeedback() {
      clearFeedbackTimer();
      feedbackId = setTimeout(() => {
        if (get().phase !== 'playing') return;
        const level = get().level;
        set({ feedback: null, timeLeft: TIME_PER_Q, q: makeQuestion(level) }, false, 'emojiMath/nextQuestion');
        startCountdown();
      }, 900);
    }

    function startCountdown() {
      clearCountdown();
      if (typeof window === 'undefined') return;
      countdownId = setInterval(() => {
        const { phase, feedback, timeLeft, lives, score, best } = get();
        if (phase !== 'playing' || feedback !== null) { clearCountdown(); return; }
        if (timeLeft <= 1) {
          clearCountdown();
          const newLives = lives - 1;
          const isDead   = newLives <= 0;
          set(
            isDead
              ? { lives: newLives, feedback: 'wrong', timeLeft: TIME_PER_Q, phase: 'dead', best: Math.max(best, score) }
              : { lives: newLives, feedback: 'wrong', timeLeft: TIME_PER_Q },
            false,
            'emojiMath/timeout',
          );
          if (!isDead) advanceAfterFeedback();
        } else {
          set({ timeLeft: timeLeft - 1 }, false, 'emojiMath/tick');
        }
      }, 1000);
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearCountdown();
        clearFeedbackTimer();
        set({ ...INITIAL, phase: 'playing', best: get().best, q: makeQuestion(1) }, false, 'emojiMath/startGame');
        startCountdown();
      },

      tap: (choice: number) => {
        const { phase, feedback, q, streak, score, lives, level, best } = get();
        if (phase !== 'playing' || feedback !== null) return;
        clearCountdown();

        if (choice === q.answer) {
          const newStreak = streak + 1;
          const bonus     = newStreak >= 3 ? 20 : 10;
          const newScore  = score + bonus;
          const newLevel  = newScore > 0 && newScore % 50 === 0 ? level + 1 : level;
          set({ streak: newStreak, score: newScore, level: newLevel, feedback: 'correct' }, false, 'emojiMath/correct');
          advanceAfterFeedback();
        } else {
          const newLives = lives - 1;
          const isDead   = newLives <= 0;
          set(
            isDead
              ? { streak: 0, lives: newLives, feedback: 'wrong', phase: 'dead', best: Math.max(best, score) }
              : { streak: 0, lives: newLives, feedback: 'wrong' },
            false,
            'emojiMath/wrong',
          );
          if (!isDead) advanceAfterFeedback();
        }
      },
    };
  },
);
