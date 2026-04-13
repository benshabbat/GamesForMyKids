'use client';
import { useState, useCallback, useMemo } from 'react';
import { OPPOSITE_WORDS, OppositeWord, QUESTIONS_PER_GAME } from './data/words';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useOppositesGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state ───────────────────────────────────────────
  const [questions, setQuestions] = useState<OppositeWord[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo<string[]>(
    () => (current ? shuffle([current.opposite, ...current.wrongOptions]) : []),
    [current],
  );

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const qs = shuffle(OPPOSITE_WORDS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    startQuiz('opposites', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((word: string) => {
    if (!current || selected !== null) return;
    storeSelectAnswer(word, word === current.opposite);
  }, [current, selected, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const qs = shuffle(OPPOSITE_WORDS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10, selected, isCorrect: isCorrect ?? false, current, choices,
    total: questions.length, correctCount: score,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
