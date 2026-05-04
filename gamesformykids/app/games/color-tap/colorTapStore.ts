import { makeStore } from '@/lib/stores/createStore';
import type { PhaseDead as Phase } from '@/lib/types';

// ── Color data ──────────────────────────────────────────────────────────────

export const COLORS = [
  { name: 'אדום',  bg: 'bg-red-500',    hex: '#ef4444', emoji: '🔴' },
  { name: 'כחול',  bg: 'bg-blue-500',   hex: '#3b82f6', emoji: '🔵' },
  { name: 'ירוק',  bg: 'bg-green-500',  hex: '#22c55e', emoji: '🟢' },
  { name: 'צהוב',  bg: 'bg-yellow-400', hex: '#facc15', emoji: '🟡' },
  { name: 'סגול',  bg: 'bg-purple-500', hex: '#a855f7', emoji: '🟣' },
  { name: 'כתום',  bg: 'bg-orange-500', hex: '#f97316', emoji: '🟠' },
  { name: 'ורוד',  bg: 'bg-pink-400',   hex: '#f472b6', emoji: '🩷' },
  { name: 'תכלת',  bg: 'bg-cyan-400',   hex: '#22d3ee', emoji: '🩵' },
];

export type ColorItem = typeof COLORS[number];

export interface Question {
  target:  ColorItem;
  options: ColorItem[];
}

function makeQuestion(): Question {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5) as ColorItem[];
  const target  = shuffled[0];
  const options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
  return { target, options };
}

// ── Store ───────────────────────────────────────────────────────────────────

export const TIME_PER_Q   = 5;
const        FEEDBACK_MS  = 700;
const        INITIAL_LIVES = 3;

interface ColorTapState {
  phase:    Phase;
  score:    number;
  best:     number;
  lives:    number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  question: Question;
}

interface ColorTapActions {
  startGame:  () => void;
  handleTap:  (color: ColorItem) => void;
}

const INITIAL: ColorTapState = {
  phase: 'menu', score: 0, best: 0, lives: INITIAL_LIVES,
  timeLeft: TIME_PER_Q, feedback: null, question: makeQuestion(),
};

export const useColorTapStore = makeStore<ColorTapState & ColorTapActions>(
  'ColorTapStore',
  (set, get) => {
    let countdownId: ReturnType<typeof setInterval> | null = null;
    let feedbackId:  ReturnType<typeof setTimeout>  | null = null;

    function clearCountdown()     { if (countdownId) { clearInterval(countdownId); countdownId = null; } }
    function clearFeedbackTimer() { if (feedbackId)  { clearTimeout(feedbackId);   feedbackId  = null; } }

    function advanceAfterFeedback() {
      clearFeedbackTimer();
      feedbackId = setTimeout(() => {
        if (get().phase !== 'playing') return;
        set({ feedback: null, timeLeft: TIME_PER_Q, question: makeQuestion() }, false, 'colorTap/nextQuestion');
        startCountdown();
      }, FEEDBACK_MS);
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
            'colorTap/timeout',
          );
          if (!isDead) advanceAfterFeedback();
        } else {
          set({ timeLeft: timeLeft - 1 }, false, 'colorTap/tick');
        }
      }, 1000);
    }

    return {
      ...INITIAL,

      startGame: () => {
        clearCountdown();
        clearFeedbackTimer();
        set({ ...INITIAL, phase: 'playing', best: get().best, question: makeQuestion() }, false, 'colorTap/startGame');
        startCountdown();
      },

      handleTap: (color: ColorItem) => {
        const { phase, feedback, question, lives, score, best } = get();
        if (phase !== 'playing' || feedback !== null) return;
        clearCountdown();

        if (color === question.target) {
          set({ score: score + 10, feedback: 'correct' }, false, 'colorTap/correct');
          advanceAfterFeedback();
        } else {
          const newLives = lives - 1;
          const isDead   = newLives <= 0;
          set(
            isDead
              ? { lives: newLives, feedback: 'wrong', phase: 'dead', best: Math.max(best, score) }
              : { lives: newLives, feedback: 'wrong' },
            false,
            'colorTap/wrong',
          );
          if (!isDead) advanceAfterFeedback();
        }
      },
    };
  },
);
