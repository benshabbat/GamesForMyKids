import type { QuizQuestion } from '@/lib/types';
export type { QuizQuestion };

export interface TzaddikStory {
  id: string;
  name: string;
  years: string;
  emoji: string;
  color: string;
  bgGradient: string;
  shortTitle: string;
  story: string;
  lesson: string;
  questions: QuizQuestion[];
}
