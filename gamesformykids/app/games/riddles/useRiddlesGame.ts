'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type Riddle, RIDDLES, QUESTIONS_PER_GAME } from './data/riddles';
import { shuffle } from '@/lib/utils';

export const useRiddlesGame = createQuizHook<Riddle>({
  gameType: 'riddles',
  allQuestions: RIDDLES,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.answer,
  getCorrectLabel: (q) => q.answer,
});
