import { makeStore } from './createStore';
import type { PhaseResult as Phase } from '@/lib/types';

interface TimedQuizConfig<Level, Question extends { answer: number }> {
  initialLevel: Level;
  questionsPerGame: number;
  timePerQuestion: number;
  generateQuestion: (level: Level) => Question;
  calcScore: (currentScore: number, timeLeft: number) => number;
}

interface TimedQuizState<Level, Question> {
  phase: Phase;
  level: Level;
  question: Question | null;
  questionNum: number;
  score: number;
  correct: number;
  selected: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
}

interface TimedQuizActions<Level> {
  startGame: (level: Level) => void;
  selectAnswer: (val: number) => void;
  advance: () => void;
  tick: () => void;
  goMenu: () => void;
}

export function createTimedQuizStore<Level, Question extends { answer: number }>(
  config: TimedQuizConfig<Level, Question>
) {
  const useStore = makeStore<TimedQuizState<Level, Question> & TimedQuizActions<Level>>('TimedQuizStore', (set, get) => ({
    phase: 'menu',
    level: config.initialLevel,
    question: null,
    questionNum: 0,
    score: 0,
    correct: 0,
    selected: null,
    isCorrect: null,
    timeLeft: config.timePerQuestion,

    startGame: (lv: Level) => {
      set({
        phase: 'playing',
        level: lv,
        question: config.generateQuestion(lv),
        questionNum: 0,
        score: 0,
        correct: 0,
        selected: null,
        isCorrect: null,
        timeLeft: config.timePerQuestion,
      });
    },

    selectAnswer: (val: number) => {
      const { selected, question, timeLeft, score, correct } = get();
      if (selected !== null || !question) return;
      const ok = val === question.answer;
      set({
        selected: val,
        isCorrect: ok,
        score: ok ? config.calcScore(score, timeLeft) : score,
        correct: ok ? correct + 1 : correct,
      });
    },

    advance: () => {
      const { questionNum, level } = get();
      const next = questionNum + 1;
      if (next >= config.questionsPerGame) {
        set({ phase: 'result' });
      } else {
        set({
          questionNum: next,
          question: config.generateQuestion(level),
          selected: null,
          isCorrect: null,
          timeLeft: config.timePerQuestion,
        });
      }
    },

    tick: () => {
      const { timeLeft, selected, phase } = get();
      if (phase !== 'playing' || selected !== null) return;
      if (timeLeft <= 1) {
        set({ selected: -1, isCorrect: false, timeLeft: 0 });
      } else {
        set({ timeLeft: timeLeft - 1 });
      }
    },

    goMenu: () => {
      set({ phase: 'menu' });
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const stopTimer = () => {};

  return { useStore, stopTimer };
}
