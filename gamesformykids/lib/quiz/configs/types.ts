import { type ReactNode } from 'react';
import type { QuizTheme } from '@/components/game/quiz/quizTheme';

/** Type-safe factory — infers Q from the config object so q is properly typed in callbacks. */
export function defineConfig<Q>(config: QuizGameConfig<Q>): QuizGameConfig<Q> {
  return config;
}

export interface QuizGameConfig<Q = unknown> {
  gameType: string;
  emoji: string;
  title: string;
  description: string;
  theme: QuizTheme;
  buttonLabel?: string;
  preview?: ReactNode;
  questions: Q[];
  questionsPerGame: number;
  getChoices: (q: Q) => string[];
  isCorrect: (choice: string, q: Q) => boolean;
  getCorrectLabel: (q: Q) => string;
  renderQuestion: (q: Q) => ReactNode;
  correctMsg?: string;
  wrongMsg?: (q: Q) => string;
}
