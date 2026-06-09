'use client';
import { useCallback, useMemo } from 'react';
import { DIVISION_QUESTIONS, type DivisionQuestion } from '@/lib/quiz/data/division';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useDivisionGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<DivisionQuestion>('division');

  const choices = useMemo(
    () => current ? shuffle([String(current.quotient), ...current.wrongOptions]) : [],
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(DIVISION_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    answer(choice, choice === String(current.quotient));
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(DIVISION_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
