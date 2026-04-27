'use client';

import { useCallback, useEffect } from 'react';
import { useAnimalsStore, makeAnimalQuestion, buildAnimalPool, QUESTIONS_PER_GAME } from '@/lib/stores/animalsStore';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import type { AnimalCategory } from '@/app/games/animals/data/animals';

export function useAnimalsSession() {
  const questions    = useAnimalsStore(s => s.questions);
  const setQuestions = useAnimalsStore(s => s.setQuestions);

  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const score    = useQuizGameStore(s => s.score);

  const current = questions[index] ?? null;

  const startGame = useCallback((cat: AnimalCategory | 'all') => {
    const qs = Array.from({ length: QUESTIONS_PER_GAME }, () =>
      makeAnimalQuestion(buildAnimalPool(cat)),
    );
    setQuestions(cat, qs);
    useQuizGameStore.getState().startQuiz('animals', QUESTIONS_PER_GAME);
    useGameStore.getState().startGame('animals');
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [setQuestions]);

  const selectAnswer = useCallback((id: string) => {
    if (selected !== null || !current) return;
    const correct = id === current.animal.id;
    useQuizGameStore.getState().selectAnswer(id, correct);
    useGameProgressStore.getState().recordAttempt(correct);
  }, [selected, current]);

  const restart = useCallback(() => {
    const cat = useAnimalsStore.getState().category;
    const qs = Array.from({ length: QUESTIONS_PER_GAME }, () =>
      makeAnimalQuestion(buildAnimalPool(cat)),
    );
    setQuestions(cat, qs);
    useQuizGameStore.getState().restartQuiz();
    useGameStore.getState().startGame('animals');
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [setQuestions]);

  useEffect(() => {
    if (phase === 'result') {
      useGameStore.getState().endGame();
      useGameProgressStore.getState().setGameActive(false);
    }
  }, [phase]);

  return { phase, index, selected, isCorrect, score, current, questions, startGame, selectAnswer, restart };
}
