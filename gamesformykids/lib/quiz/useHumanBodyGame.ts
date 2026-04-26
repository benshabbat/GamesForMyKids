'use client';
import { useState, useCallback, useMemo } from 'react';
import { BODY_QUESTIONS, type BodyCategory, type BodyQuestion } from '@/lib/quiz/data/body';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useHumanBodyGame() {
  const { phase, current, begin, answer } = useQuizSession<BodyQuestion>('human-body');
  const [category, setCategory] = useState<BodyCategory>('הכל');

  const choices = useMemo<string[]>(
    () => (current ? shuffle([current.function, ...current.wrongOptions]) : []),
    [current],
  );

  const startGame = useCallback((cat: BodyCategory = 'הכל') => {
    const pool = cat === 'הכל' ? BODY_QUESTIONS : BODY_QUESTIONS.filter(q => q.category === cat);
    setCategory(cat);
    begin(shuffle(pool).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((ans: string) => {
    answer(ans, ans === current?.function);
  }, [answer, current]);

  return { phase, category, currentQuestion: current, choices, startGame, selectAnswer };
}
