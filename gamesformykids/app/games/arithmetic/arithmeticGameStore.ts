import { create } from 'zustand';
import {
  LEVELS, generateQuestion, QUESTIONS_PER_GAME, TIME_PER_QUESTION,
  ArithmeticLevel, ArithmeticQuestion,
} from './data/questions';
import type { PhaseResult as Phase } from '@/lib/types';

// Module-level timer — safe on client (consuming components are all 'use client')
let timerRef: ReturnType<typeof setInterval> | null = null;

function clearTimer() {
  if (timerRef) { clearInterval(timerRef); timerRef = null; }
}

export { clearTimer as stopArithmeticTimer };

interface ArithmeticState {
  phase: Phase;
  level: ArithmeticLevel;
  question: ArithmeticQuestion | null;
  questionNum: number;
  score: number;
  correct: number;
  selected: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
}

interface ArithmeticActions {
  startGame: (level: ArithmeticLevel) => void;
  selectAnswer: (val: number) => void;
  advance: () => void;
  goMenu: () => void;
}

export const useArithmeticGameStore = create<ArithmeticState & ArithmeticActions>()((set, get) => {
  function startTimer() {
    clearTimer();
    if (typeof window === 'undefined') return;
    timerRef = setInterval(() => {
      const { timeLeft, selected } = get();
      if (selected !== null) { clearTimer(); return; }
      if (timeLeft <= 1) {
        clearTimer();
        set({ selected: -1, isCorrect: false, timeLeft: 0 });
      } else {
        set({ timeLeft: timeLeft - 1 });
      }
    }, 1000);
  }

  return {
    phase: 'menu',
    level: LEVELS[0],
    question: null,
    questionNum: 0,
    score: 0,
    correct: 0,
    selected: null,
    isCorrect: null,
    timeLeft: TIME_PER_QUESTION,

    startGame: (lv: ArithmeticLevel) => {
      clearTimer();
      set({
        phase: 'playing',
        level: lv,
        question: generateQuestion(lv),
        questionNum: 0,
        score: 0,
        correct: 0,
        selected: null,
        isCorrect: null,
        timeLeft: TIME_PER_QUESTION,
      });
      startTimer();
    },

    selectAnswer: (val: number) => {
      const { selected, question, timeLeft, score, correct } = get();
      if (selected !== null || !question) return;
      clearTimer();
      const ok = val === question.answer;
      set({
        selected: val,
        isCorrect: ok,
        score: ok ? score + Math.max(1, timeLeft) * 10 : score,
        correct: ok ? correct + 1 : correct,
      });
    },

    advance: () => {
      const { questionNum, level } = get();
      const next = questionNum + 1;
      if (next >= QUESTIONS_PER_GAME) {
        clearTimer();
        set({ phase: 'result' });
      } else {
        set({
          questionNum: next,
          question: generateQuestion(level),
          selected: null,
          isCorrect: null,
          timeLeft: TIME_PER_QUESTION,
        });
        startTimer();
      }
    },

    goMenu: () => {
      clearTimer();
      set({ phase: 'menu' });
    },
  };
});
