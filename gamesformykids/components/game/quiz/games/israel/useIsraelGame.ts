'use client';

import { useState, useCallback } from 'react';
import { ISRAEL_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES, type IsraelQuestion, type IsraelCategory } from './data/questions';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useIsraelGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<IsraelQuestion[]>([]);
  const [category, setCategory]   = useState<IsraelCategory>('הכל');

  const current = questions[index] ?? null;
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((cat: IsraelCategory = 'הכל') => {
    const pool = cat === 'הכל' ? ISRAEL_QUESTIONS : ISRAEL_QUESTIONS.filter(q => q.category === cat);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(q);
    startQuiz('israel', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(String(idx), idx === current.correctIndex);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const restart = useCallback(() => {
    const pool = category === 'הכל' ? ISRAEL_QUESTIONS : ISRAEL_QUESTIONS.filter(q => q.category === category);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [category, restartQuiz]);

  return {
    phase, category, categories: CATEGORIES, index, score: score * 10,
    selected: selected !== null ? Number(selected) : null,
    isCorrect, current, total, correctCount: score,
    startGame, selectAnswer, next, restart,
  };
}
