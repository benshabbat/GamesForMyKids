'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type LanguageQuestion, LANGUAGE_QUESTIONS, QUESTIONS_PER_GAME } from './data/languages';
import { shuffle } from '@/lib/utils';

export const useWorldLanguagesGame = createQuizHook<LanguageQuestion>({
  gameType: 'world-languages',
  allQuestions: LANGUAGE_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.language, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.language,
  getCorrectLabel: (q) => q.language,
});
