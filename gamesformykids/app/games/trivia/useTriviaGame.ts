'use client';
import { useState, useCallback } from 'react';
import {
  TRIVIA_QUESTIONS, QUESTIONS_PER_GAME, TriviaQuestion, TriviaCategory,
} from './data/questions';
import { useQuizGameStore } from '@/lib/stores';

export function useTriviaGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [category, setCategory]   = useState<TriviaCategory | 'all'>('all');

  const current = questions[index] ?? null;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((cat: TriviaCategory | 'all' = 'all') => {
    setCategory(cat);
    const pool = cat === 'all'
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter(q => q.category === cat);
    const qs = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    startQuiz('trivia', qs.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((i: number) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(String(i), i === current.correctIndex);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const pool = category === 'all'
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter(q => q.category === category);
    const qs = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(qs);
    restartQuiz();
  }, [category, restartQuiz]);

  return {
    phase, index, score, selected: selected !== null ? Number(selected) : null,
    isCorrect, current, category,
    total: questions.length || QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
