'use client';

import { useCallback, useMemo } from 'react';
import { useQuizSession } from '@/lib/quiz/useQuizSession';
import { shuffle } from '@/lib/utils';
import type { QuizGameConfig } from './quizGameConfigs';

export function useGenericQuizGame<Q>(config: QuizGameConfig<Q>) {
  const { phase, current, begin, answer, reset } = useQuizSession<Q>(config.gameType);

  const choices = useMemo(
    () => (current ? config.getChoices(current) : []),
    // intentionally omit `config` — it is a static game-config object created outside the
    // component and never changes; including it would cause unnecessary recomputation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current],
  );

  const startGame = useCallback(() => {
    begin(shuffle([...config.questions]).slice(0, config.questionsPerGame));
  }, [begin, config]);

  const selectAnswer = useCallback(
    (choice: string) => {
      if (!current) return;
      answer(choice, config.isCorrect(choice, current));
    },
    [answer, current, config],
  );

  const restart = useCallback(() => {
    reset(shuffle([...config.questions]).slice(0, config.questionsPerGame));
  }, [reset, config]);

  return {
    phase,
    current,
    choices,
    correctLabel: current ? config.getCorrectLabel(current) : '',
    startGame,
    selectAnswer,
    restart,
  };
}
