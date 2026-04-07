import { create } from 'zustand';
import { SpellingWord, SPELLING_WORDS, QUESTIONS_PER_GAME } from './data/words';
import { shuffle } from '@/lib/utils';
import type { PhaseResult as Phase } from '@/lib/types';

function makeChoices(q: SpellingWord): string[] {
  return shuffle([q.word, ...q.wrong]);
}

interface SpellingState {
  phase: Phase;
  questions: SpellingWord[];
  index: number;
  score: number;
  selected: string | null;
  isCorrect: boolean;
  choices: string[];
}

interface SpellingActions {
  startGame: () => void;
  selectAnswer: (word: string) => void;
  next: () => void;
  goMenu: () => void;
  restart: () => void;
}

export const useSpellingGameStore = create<SpellingState & SpellingActions>()((set, get) => ({
  phase: 'menu',
  questions: [],
  index: 0,
  score: 0,
  selected: null,
  isCorrect: false,
  choices: [],

  startGame: () => {
    const questions = shuffle(SPELLING_WORDS).slice(0, QUESTIONS_PER_GAME);
    const choices = questions[0] ? makeChoices(questions[0]) : [];
    set({ phase: 'playing', questions, index: 0, score: 0, selected: null, isCorrect: false, choices });
  },

  selectAnswer: (word: string) => {
    const { selected, questions, index, score } = get();
    const current = questions[index];
    if (!current || selected !== null) return;
    const correct = word === current.word;
    set({ selected: word, isCorrect: correct, score: correct ? score + 10 : score });
  },

  next: () => {
    const { index, questions } = get();
    const newIndex = index + 1;
    if (newIndex < questions.length) {
      const q = questions[newIndex];
      set({ index: newIndex, selected: null, isCorrect: false, choices: makeChoices(q) });
    } else {
      set({ phase: 'result' });
    }
  },

  goMenu: () => set({ phase: 'menu', selected: null }),
  restart: () => get().startGame(),
}));
