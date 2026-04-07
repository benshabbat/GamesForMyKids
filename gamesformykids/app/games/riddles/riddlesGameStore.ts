import { create } from 'zustand';
import { Riddle, RIDDLES, QUESTIONS_PER_GAME } from './data/riddles';
import { shuffle } from '@/lib/utils';
import type { PhaseResult as Phase } from '@/lib/types';

function makeChoices(q: Riddle): string[] {
  return shuffle([q.answer, ...q.wrongOptions]);
}

interface RiddlesState {
  phase: Phase;
  questions: Riddle[];
  index: number;
  score: number;
  selected: string | null;
  isCorrect: boolean | null;
  choices: string[];
}

interface RiddlesActions {
  startGame: () => void;
  selectAnswer: (answer: string) => void;
  next: () => void;
  goMenu: () => void;
  restart: () => void;
}

export const useRiddlesGameStore = create<RiddlesState & RiddlesActions>()((set, get) => ({
  phase: 'menu',
  questions: [],
  index: 0,
  score: 0,
  selected: null,
  isCorrect: null,
  choices: [],

  startGame: () => {
    const questions = shuffle(RIDDLES).slice(0, QUESTIONS_PER_GAME);
    const choices = questions[0] ? makeChoices(questions[0]) : [];
    set({ phase: 'playing', questions, index: 0, score: 0, selected: null, isCorrect: null, choices });
  },

  selectAnswer: (answer: string) => {
    const { selected, questions, index, score } = get();
    const current = questions[index];
    if (!current || selected !== null) return;
    const correct = answer === current.answer;
    set({ selected: answer, isCorrect: correct, score: correct ? score + 10 : score });
  },

  next: () => {
    const { index, questions } = get();
    const newIndex = index + 1;
    if (newIndex < questions.length) {
      const q = questions[newIndex];
      set({ index: newIndex, selected: null, isCorrect: null, choices: makeChoices(q) });
    } else {
      set({ phase: 'result' });
    }
  },

  goMenu: () => set({ phase: 'menu' }),
  restart: () => get().startGame(),
}));
