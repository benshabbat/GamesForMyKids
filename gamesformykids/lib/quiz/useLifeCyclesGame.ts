'use client';
import { useCallback, useMemo } from 'react';
import { LIFE_CYCLE_QUESTIONS, type LifeCycleQuestion } from '@/lib/quiz/data/life-cycles';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

const CYCLES_PER_GAME = 5;

export function useLifeCyclesGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<LifeCycleQuestion>('life-cycles');

  // choices not used — sequencing mechanic handles answer internally
  const choices = useMemo(() => [] as string[], []);

  const startGame = useCallback(() => {
    begin(shuffle(LIFE_CYCLE_QUESTIONS).slice(0, CYCLES_PER_GAME));
  }, [begin]);

  const completeLifeCycle = useCallback(() => {
    answer('correct', true);
  }, [answer]);

  const restart = useCallback(() => {
    reset(shuffle(LIFE_CYCLE_QUESTIONS).slice(0, CYCLES_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, completeLifeCycle, restart };
}
