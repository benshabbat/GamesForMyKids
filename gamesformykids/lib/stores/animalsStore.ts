import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ANIMALS, type Animal, type AnimalCategory } from '@/app/games/animals/data/animals';
import { shuffle } from '@/lib/utils';
import { useQuizGameStore } from './quizGameStore';
import { useGameStore } from './gameStore';
import { useGameProgressStore } from './gameProgressStore';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export type QuestionMode = 'emoji-to-name' | 'name-to-emoji';

export interface AnimalQuestion {
  animal: Animal;
  choices: Animal[];
  mode: QuestionMode;
}

function makeQuestion(pool: Animal[]): AnimalQuestion {
  const animal = pool[Math.floor(Math.random() * pool.length)];
  const others = shuffle(pool.filter(a => a.id !== animal.id)).slice(0, 3);
  const choices = shuffle([animal, ...others]);
  const mode: QuestionMode = Math.random() > 0.5 ? 'emoji-to-name' : 'name-to-emoji';
  return { animal, choices, mode };
}

function buildPool(cat: AnimalCategory | 'all'): Animal[] {
  return cat === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === cat);
}

export interface AnimalsState {
  category: AnimalCategory | 'all';
  questions: AnimalQuestion[];
}

export interface AnimalsActions {
  startGame: (cat: AnimalCategory | 'all') => void;
  selectAnswer: (id: string) => void;
  restart: () => void;
  reset: () => void;
}

const INITIAL_STATE: AnimalsState = {
  category: 'all',
  questions: [],
};

export const useAnimalsStore = create<AnimalsState & AnimalsActions>()(
  devtools(
    (set, get) => ({
      ...INITIAL_STATE,

      startGame: (cat) => {
        const questions = Array.from(
          { length: QUESTIONS_PER_GAME },
          () => makeQuestion(buildPool(cat)),
        );
        set({ category: cat, questions }, false, 'animals/startGame');
        useQuizGameStore.getState().startQuiz('animals', QUESTIONS_PER_GAME);
        useGameStore.getState().startGame('animals');
        useGameProgressStore.getState().resetProgress();
        useGameProgressStore.getState().setGameActive(true);
      },

      selectAnswer: (id) => {
        const { questions } = get();
        const { selected, index } = useQuizGameStore.getState();
        const current = questions[index] ?? null;
        if (selected || !current) return;
        const isCorrect = id === current.animal.id;
        useQuizGameStore.getState().selectAnswer(id, isCorrect);
        useGameProgressStore.getState().recordAttempt(isCorrect);
      },

      restart: () => {
        const { category } = get();
        const questions = Array.from(
          { length: QUESTIONS_PER_GAME },
          () => makeQuestion(buildPool(category)),
        );
        set({ questions }, false, 'animals/restart');
        useQuizGameStore.getState().restartQuiz();
        useGameStore.getState().startGame('animals');
        useGameProgressStore.getState().resetProgress();
        useGameProgressStore.getState().setGameActive(true);
      },

      reset: () => set(INITIAL_STATE, false, 'animals/reset'),
    }),
    { name: 'AnimalsStore' },
  ),
);
