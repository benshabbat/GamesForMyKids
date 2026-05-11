'use client';
import { useState, useCallback, useMemo } from 'react';
import { BODY_QUESTIONS, type BodyCategory, type BodyQuestion } from '@/lib/quiz/data/body';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useHumanBodyGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<BodyQuestion>('human-body');
  const [category, setCategory] = useState<BodyCategory>('הכל');

  const choices = useMemo<string[]>(
    () => (current ? shuffle([current.function, ...current.wrongOptions]) : []),
    [current],
  );

  const buildPool = useCallback((cat: BodyCategory) =>
    shuffle(cat === 'הכל' ? BODY_QUESTIONS : BODY_QUESTIONS.filter(q => q.category === cat)).slice(0, QUESTIONS_PER_GAME),
    [],
  );

  const startGame = useCallback((cat: BodyCategory = 'הכל') => {
    setCategory(cat);
    begin(buildPool(cat));
  }, [begin, buildPool]);

  const restart = useCallback(() => {
    reset(buildPool(category));
  }, [reset, buildPool, category]);

  const selectAnswer = useCallback((ans: string) => {
    answer(ans, ans === current?.function);
  }, [answer, current]);

  return { phase, category, currentQuestion: current, choices, startGame, selectAnswer, restart };
}
