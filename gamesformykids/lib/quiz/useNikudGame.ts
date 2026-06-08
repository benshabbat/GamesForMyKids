'use client';
import { useCallback, useMemo } from 'react';
import { NIKUD_QUESTIONS, type NikudQuestion } from '@/lib/quiz/data/nikud';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useNikudGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<NikudQuestion>('nikud');

  const choices = useMemo(
    () => current ? shuffle([current.answer, ...current.wrongOptions]) : [],
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(NIKUD_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    answer(choice, choice === current.answer);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(NIKUD_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
