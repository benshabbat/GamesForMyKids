'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type SpellingWord, SPELLING_WORDS, QUESTIONS_PER_GAME } from './data/words';
import { shuffle } from '@/lib/utils';

export const useSpellingGame = createQuizHook<SpellingWord>({
  gameType: 'spelling',
  allQuestions: SPELLING_WORDS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.word, ...q.wrong]),
  isCorrect: (choice, q) => choice === q.word,
  getCorrectLabel: (q) => q.word,
});
