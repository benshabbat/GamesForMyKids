/**
 * ===============================================
 * Animals Store — Zustand
 * ===============================================
 * מנהל את הסטייט הספציפי למשחק בעלי-חיים:
 * - קטגוריה נבחרת (all / farm / wild / sea / …)
 * - רשימת השאלות של הסבב הנוכחי
 * - כל פעולות המשחק (startGame, selectAnswer, restart)
 *
 * הסטייט המשותף לכל משחקי-החידון (phase, index, score …)
 * מנוהל ב-quizGameStore ומתעדכן ישירות מתוך הסטור הזה.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ANIMALS, type Animal, type AnimalCategory } from '@/app/games/animals/data/animals';
import { shuffle } from '@/lib/utils';
import { useQuizGameStore } from './quizGameStore';

// ── Constants & helpers ────────────────────────────────────
export const QUESTIONS_PER_GAME = 10;

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

// ── State ──────────────────────────────────────────────────
export interface AnimalsState {
  category: AnimalCategory | 'all';
  questions: AnimalQuestion[];
}

// ── Actions ────────────────────────────────────────────────
export interface AnimalsActions {
  /** מתחיל סבב חדש — בונה שאלות ומפעיל את quizGameStore */
  startGame: (cat: AnimalCategory | 'all') => void;
  /** בחירת תשובה — בודק נכונות ומעביר ל-quizGameStore */
  selectAnswer: (id: string) => void;
  /** מאתחל סבב חדש באותה קטגוריה */
  restart: () => void;
  reset: () => void;
}

const INITIAL_STATE: AnimalsState = {
  category: 'all',
  questions: [],
};

// ── Store ──────────────────────────────────────────────────
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
      },

      selectAnswer: (id) => {
        const { questions } = get();
        const { selected, index } = useQuizGameStore.getState();
        const current = questions[index] ?? null;
        if (selected || !current) return;
        useQuizGameStore.getState().selectAnswer(id, id === current.animal.id);
      },

      restart: () => {
        const { category } = get();
        const questions = Array.from(
          { length: QUESTIONS_PER_GAME },
          () => makeQuestion(buildPool(category)),
        );
        set({ questions }, false, 'animals/restart');
        useQuizGameStore.getState().restartQuiz();
      },

      reset: () => set(INITIAL_STATE, false, 'animals/reset'),
    }),
    { name: 'AnimalsStore' },
  ),
);

