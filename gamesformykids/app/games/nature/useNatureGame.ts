'use client';

import { useState, useCallback } from 'react';
import { NATURE_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES, type NatureQuestion, type NatureCategory } from './data/questions';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useNatureGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<NatureQuestion[]>([]);
  const [category, setCategory]   = useState<NatureCategory>('הכל');

  const current = questions[index] ?? null;
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((cat: NatureCategory = 'הכל') => {
    const pool = cat === 'הכל' ? NATURE_QUESTIONS : NATURE_QUESTIONS.filter(q => q.category === cat);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(q);
    startQuiz('nature', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(String(idx), idx === current.correctIndex);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const pool = category === 'הכל' ? NATURE_QUESTIONS : NATURE_QUESTIONS.filter(q => q.category === category);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [category, restartQuiz]);

  return {
    phase, category, categories: CATEGORIES, index, score: score * 10,
    selected: selected !== null ? Number(selected) : null,
    isCorrect, current, total, correctCount: score,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
