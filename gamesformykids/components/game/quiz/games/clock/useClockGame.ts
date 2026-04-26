'use client';
import { useCallback, useMemo } from 'react';
import { CLOCK_QUESTIONS, ClockQuestion } from './data/times';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: ClockQuestion, all: ClockQuestion[]): ClockQuestion[] {
  const others = shuffle(all.filter(q => q.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useClockGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<ClockQuestion>('clock');

  const choices = useMemo(
    () => (current ? makeChoices(current, CLOCK_QUESTIONS) : []),
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((qId: number) => {
    answer(String(qId), qId === current?.id);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
