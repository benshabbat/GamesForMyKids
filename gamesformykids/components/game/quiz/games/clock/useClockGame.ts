'use client';
import { useState, useCallback, useMemo } from 'react';
import { CLOCK_QUESTIONS, ClockQuestion } from './data/times';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: ClockQuestion, all: ClockQuestion[]): ClockQuestion[] {
  const others = shuffle(all.filter(q => q.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useClockGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<ClockQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo(
    () => (current ? makeChoices(current, CLOCK_QUESTIONS) : []),
    [current],
  );

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const qs = shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    startQuiz('clock', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((qId: number) => {
    if (!current || selected !== null) return;
    storeSelectAnswer(String(qId), qId === current.id);
  }, [current, selected, storeSelectAnswer]);

  const restart = useCallback(() => {
    const qs = shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [restartQuiz]);

  return { phase, current, choices, startGame, selectAnswer, restart };
}
