'use client';
import { useCallback } from 'react';
import { COLOR_MIXES, ColorMix } from './data/mixes';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';

interface ColorMixQuestion {
  mix: ColorMix;
  choices: string[]; // result labels
}

function buildQuestion(mix: ColorMix): ColorMixQuestion {
  const pool = [mix.resultLabel, ...mix.wrongOptions.slice(0, 3)];
  const choices = pool.sort(() => Math.random() - 0.5);
  return { mix, choices };
}

function buildQuestions(): ColorMixQuestion[] {
  return [...COLOR_MIXES]
    .sort(() => Math.random() - 0.5)
    .slice(0, QUESTIONS_PER_GAME)
    .map(buildQuestion);
}

export function useColorMixGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<ColorMixQuestion>('color-mix');

  const startGame = useCallback(() => {
    begin(buildQuestions());
  }, [begin]);

  const selectAnswer = useCallback((label: string) => {
    answer(label, label === current?.mix.resultLabel);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(buildQuestions());
  }, [reset]);

  return { phase, current, startGame, selectAnswer, restart };
}
