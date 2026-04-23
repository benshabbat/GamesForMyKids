'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type InstrumentQuestion, INSTRUMENTS, QUESTIONS_PER_GAME } from './data/instruments';
import { shuffle } from '@/lib/utils';

export const useInstrumentsGame = createQuizHook<InstrumentQuestion>({
  gameType: 'instruments',
  allQuestions: INSTRUMENTS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.instrument, ...q.wrongInstruments]),
  isCorrect: (choice, q) => choice === q.instrument,
  getCorrectLabel: (q) => q.instrument,
});
