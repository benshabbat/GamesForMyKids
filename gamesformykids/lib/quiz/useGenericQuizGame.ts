'use client';

import { useState, useCallback, useMemo } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { shuffle } from '@/lib/utils';
import type { QuizGameConfig } from './quizGameConfigs';

export function useGenericQuizGame<Q>(config: QuizGameConfig<Q>) {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer, restartQuiz } = useQuizGameStore();

  const [questions, setQuestions] = useState<Q[]>([]);
  const current = questions[index] ?? null;

  const choices = useMemo(
    () => (current ? config.getChoices(current) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current],
  );

  const startGame = useCallback(() => {
    const q = shuffle([...config.questions]).slice(0, config.questionsPerGame);
    setQuestions(q);
    startQuiz(config.gameType, q.length);
  }, [startQuiz, config]);

  const selectAnswer = useCallback(
    (choice: string) => {
      if (selected !== null || !current) return;
      storeSelectAnswer(choice, config.isCorrect(choice, current));
    },
    [selected, current, storeSelectAnswer, config],
  );

  const restart = useCallback(() => {
    const q = shuffle([...config.questions]).slice(0, config.questionsPerGame);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz, config]);

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
