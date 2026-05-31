'use client';
import { useCallback } from 'react';
import { PATTERN_QUESTIONS, type PatternQuestion } from '@/lib/quiz/data/patterns';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export interface PatternQuestionWithChoices {
  question: PatternQuestion;
  choices: string[];
}

function buildQuestions(): PatternQuestionWithChoices[] {
  return [...PATTERN_QUESTIONS]
    .sort(() => Math.random() - 0.5)
    .slice(0, QUESTIONS_PER_GAME)
    .map(q => ({ question: q, choices: shuffle([q.answer, ...q.wrongOptions]) }));
}

export function usePatternsGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<PatternQuestionWithChoices>('patterns');

  const startGame = useCallback(() => begin(buildQuestions()), [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    answer(choice, choice === current.question.answer);
  }, [answer, current]);

  const restart = useCallback(() => reset(buildQuestions()), [reset]);

  return { phase, current, startGame, selectAnswer, restart };
}
