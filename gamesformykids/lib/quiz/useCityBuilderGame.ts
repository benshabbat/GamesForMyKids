'use client';
import { useCallback, useMemo } from 'react';
import { CITY_BUILDER_QUESTIONS, type CityBuilderQuestion } from '@/lib/quiz/data/city-builder';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { shuffle } from '@/lib/utils';

export function useCityBuilderGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<CityBuilderQuestion>('city-builder');

  const buildingsBuilt = useQuizGameStore(s => s.score);
  const isCorrect      = useQuizGameStore(s => s.isCorrect);
  const questionIndex  = useQuizGameStore(s => s.index);
  const total          = useQuizGameStore(s => s.total);

  const choices = useMemo(
    () => current ? shuffle([current.answer, ...current.wrongOptions]) : [],
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(CITY_BUILDER_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    answer(choice, choice === current.answer);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(CITY_BUILDER_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, buildingsBuilt, isCorrect, questionIndex, total, startGame, selectAnswer, restart };
}
