'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type EmotionQuestion, EMOTION_QUESTIONS, QUESTIONS_PER_GAME } from './data/emotions';
import { shuffle } from '@/lib/utils';

export const useEmotionsGame = createQuizHook<EmotionQuestion>({
  gameType: 'emotions',
  allQuestions: EMOTION_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.emotion, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.emotion,
  getCorrectLabel: (q) => q.emotion,
});
