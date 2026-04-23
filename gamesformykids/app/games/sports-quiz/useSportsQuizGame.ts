'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type SportsQuestion, SPORTS_QUESTIONS, QUESTIONS_PER_GAME } from './data/questions';

export const useSportsQuizGame = createQuizHook<SportsQuestion>({
  gameType: 'sports-quiz',
  allQuestions: SPORTS_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => [...q.answers],
  isCorrect: (choice, q) => choice === q.answers[q.correctIndex],
  getCorrectLabel: (q) => q.answers[q.correctIndex],
});
