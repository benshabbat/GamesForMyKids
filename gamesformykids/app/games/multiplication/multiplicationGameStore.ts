import { create } from 'zustand';
import {
  generateQuestion, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION,
  MultiplicationQuestion,
} from './data/tables';
import type { PhaseResult as Phase } from '@/lib/types';

let timerRef: ReturnType<typeof setInterval> | null = null;

function clearTimer() {
  if (timerRef) { clearInterval(timerRef); timerRef = null; }
}

export { clearTimer as stopMultiplicationTimer };

interface MultiplicationState {
  phase: Phase;
  level: number;
  question: MultiplicationQuestion | null;
  questionNum: number;
  score: number;
  correct: number;
  selected: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
}

interface MultiplicationActions {
  startGame: (level: number) => void;
  selectAnswer: (val: number) => void;
  advance: () => void;
  goMenu: () => void;
}

export const useMultiplicationGameStore = create<MultiplicationState & MultiplicationActions>()((set, get) => {
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
    level: 1,
    question: null,
    questionNum: 0,
    score: 0,
    correct: 0,
    selected: null,
    isCorrect: null,
    timeLeft: TIME_PER_QUESTION,

    startGame: (lv: number) => {
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
        score: ok ? score + timeLeft : score,
        correct: ok ? correct + 1 : correct,
      });
    },

    advance: () => {
      const { questionNum, level } = get();
      const next = questionNum + 1;
      if (next >= QUESTIONS_PER_LEVEL) {
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
