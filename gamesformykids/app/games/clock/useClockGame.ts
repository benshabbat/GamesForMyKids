'use client';
import { useState, useCallback, useMemo } from 'react';
import { CLOCK_QUESTIONS, ClockQuestion, QUESTIONS_PER_GAME } from './data/times';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(correct: ClockQuestion, all: ClockQuestion[]): ClockQuestion[] {
  const others = shuffle(all.filter(q => q.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...others]);
}

export function useClockGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

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

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const qs = shuffle(CLOCK_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10,
    selected: selected !== null ? Number(selected) : null,
    isCorrect: isCorrect ?? false, current,
    choices, total: questions.length,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
