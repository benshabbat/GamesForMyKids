'use client';
import { useCallback, useMemo } from 'react';
import { WORD_WHEEL_QUESTIONS, type WordWheelQuestion } from '@/lib/quiz/data/word-wheel';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

export function useWordWheelGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<WordWheelQuestion>('word-wheel');

  const choices = useMemo(
    () => current ? shuffle([current.answer, ...current.wrongOptions]) : [],
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(WORD_WHEEL_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    answer(choice, choice === current.answer);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(WORD_WHEEL_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
