import { shuffle } from '@/lib/utils';

export interface MultiplicationQuestion {
  a: number;
  b: number;
  answer: number;
  choices: number[];
}

export const MIXED_LEVEL = 0;

export function generateQuestion(level: number): MultiplicationQuestion {
  const a = level === MIXED_LEVEL ? Math.floor(Math.random() * 10) + 1 : level;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a * b;

  // Generate 3 wrong answers near the correct one
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const delta = Math.floor(Math.random() * 10) - 5;
    const wrong = answer + (delta === 0 ? 6 : delta);
    if (wrong > 0 && wrong !== answer) wrongs.add(wrong);
  }

  const choices = shuffle([answer, ...Array.from(wrongs)]);
  return { a, b, answer, choices };
}

export const LEVELS = [MIXED_LEVEL, ...Array.from({ length: 10 }, (_, i) => i + 1)];
export const TIME_PER_QUESTION = 10; // seconds
export const QUESTIONS_PER_LEVEL = 8;

// Harder tables (and the mixed mode, which draws from all of them) get a few extra seconds.
const HARD_LEVELS = new Set([6, 7, 8, 9, MIXED_LEVEL]);
export function getTimeForLevel(level: number): number {
  return HARD_LEVELS.has(level) ? TIME_PER_QUESTION + 4 : TIME_PER_QUESTION;
}
