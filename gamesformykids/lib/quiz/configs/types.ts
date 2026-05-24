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
  /** Full-page override for the menu screen. Receives startGame and must render the entire menu. */
  menuScreen?: (onStart: () => void) => ReactNode;
  questions: Q[];
  questionsPerGame: number;
  // Method-syntax declarations are bivariant in TypeScript, allowing concrete
  // QuizGameConfig<Q> values to be stored in a QuizGameConfig<unknown> map.
  getChoices(q: Q): string[];
  isCorrect(choice: string, q: Q): boolean;
  getCorrectLabel(q: Q): string;
  renderQuestion(q: Q): ReactNode;
  correctMsg?: string;
  wrongMsg?(q: Q): string;
}
