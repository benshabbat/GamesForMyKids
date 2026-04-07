import { create } from 'zustand';
import { CapitalQuestion, CAPITAL_QUESTIONS, QUESTIONS_PER_GAME } from './data/capitals';
import { shuffle } from '@/lib/utils';
import type { PhaseResult as Phase } from '@/lib/types';

function makeChoices(q: CapitalQuestion): string[] {
  return shuffle([q.capital, ...q.wrongOptions]);
}

interface CapitalsState {
  phase: Phase;
  questions: CapitalQuestion[];
  index: number;
  score: number;
  selected: string | null;
  isCorrect: boolean | null;
  choices: string[];
}

interface CapitalsActions {
  startGame: () => void;
  selectAnswer: (capital: string) => void;
  next: () => void;
  goMenu: () => void;
  restart: () => void;
}

export const useCapitalsGameStore = create<CapitalsState & CapitalsActions>()((set, get) => ({
  phase: 'menu',
  questions: [],
  index: 0,
  score: 0,
  selected: null,
  isCorrect: null,
  choices: [],

  startGame: () => {
    const questions = shuffle(CAPITAL_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    const choices = questions[0] ? makeChoices(questions[0]) : [];
    set({ phase: 'playing', questions, index: 0, score: 0, selected: null, isCorrect: null, choices });
  },

  selectAnswer: (capital: string) => {
    const { selected, questions, index, score } = get();
    const current = questions[index];
    if (!current || selected !== null) return;
    const correct = capital === current.capital;
    set({ selected: capital, isCorrect: correct, score: correct ? score + 10 : score });
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
