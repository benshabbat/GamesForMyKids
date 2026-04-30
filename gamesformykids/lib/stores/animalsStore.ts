import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ANIMALS, type Animal, type AnimalCategory } from '@/app/games/animals/data/animals';
import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export type QuestionMode = 'emoji-to-name' | 'name-to-emoji';

export interface AnimalQuestion {
  animal: Animal;
  choices: Animal[];
  mode: QuestionMode;
}

export function makeAnimalQuestion(pool: Animal[]): AnimalQuestion {
  const animal = pool[Math.floor(Math.random() * pool.length)];
  if (!animal) {
    throw new Error('Cannot create animal question from empty pool');
  }
  const others = shuffle(pool.filter(a => a.id !== animal.id)).slice(0, 3);
  const choices = shuffle([animal, ...others]);
  const mode: QuestionMode = Math.random() > 0.5 ? 'emoji-to-name' : 'name-to-emoji';
  return { animal, choices, mode };
}

export function buildAnimalPool(cat: AnimalCategory | 'all'): Animal[] {
  return cat === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === cat);
}

export { QUESTIONS_PER_GAME };

export interface AnimalsState {
  category: AnimalCategory | 'all';
  questions: AnimalQuestion[];
}

export interface AnimalsActions {
  setQuestions: (cat: AnimalCategory | 'all', questions: AnimalQuestion[]) => void;
  reset: () => void;
}

const INITIAL_STATE: AnimalsState = {
  category: 'all',
  questions: [],
};

export const useAnimalsStore = create<AnimalsState & AnimalsActions>()(
  devtools(
    (set) => ({
      ...INITIAL_STATE,

      setQuestions: (category, questions) =>
        set({ category, questions }, false, 'animals/setQuestions'),

      reset: () => set(INITIAL_STATE, false, 'animals/reset'),
    }),
    { name: 'AnimalsStore' },
  ),
);
