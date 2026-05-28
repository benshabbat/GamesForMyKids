'use client';
import { useCallback, useMemo } from 'react';
import { PHONICS_QUESTIONS, type PhonicsQuestion } from '@/lib/quiz/data/phonics';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';

function makeChoices(correct: PhonicsQuestion): string[] {
  return shuffle([correct.letter, ...correct.wrongOptions]);
}

export function usePhonicsGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<PhonicsQuestion>('phonics');

  const choices = useMemo(
    () => (current ? makeChoices(current) : []),
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle(PHONICS_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [begin]);

  const selectAnswer = useCallback((choice: string) => {
    answer(choice, choice === current?.letter);
  }, [answer, current]);

  const restart = useCallback(() => {
    reset(shuffle(PHONICS_QUESTIONS).slice(0, QUESTIONS_PER_GAME));
  }, [reset]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
