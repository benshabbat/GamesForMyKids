'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type OppositeWord, OPPOSITE_WORDS, QUESTIONS_PER_GAME } from './data/words';
import { shuffle } from '@/lib/utils';

export const useOppositesGame = createQuizHook<OppositeWord>({
  gameType: 'opposites',
  allQuestions: OPPOSITE_WORDS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.opposite, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.opposite,
  getCorrectLabel: (q) => q.opposite,
});
