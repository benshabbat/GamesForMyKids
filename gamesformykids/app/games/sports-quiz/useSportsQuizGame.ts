'use client';

import { useState, useCallback } from 'react';
import { SPORTS_QUESTIONS, QUESTIONS_PER_GAME, type SportsQuestion } from './data/questions';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useSportsQuizGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<SportsQuestion[]>([]);

  const current = questions[index] ?? null;
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const q = shuffle(SPORTS_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    startQuiz('sports-quiz', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(String(idx), idx === current.correctIndex);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const q = shuffle(SPORTS_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10,
    selected: selected !== null ? Number(selected) : null,
    isCorrect, current, total, correctCount: score,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
