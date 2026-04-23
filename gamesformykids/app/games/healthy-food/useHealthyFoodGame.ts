'use client';

import { useState, useCallback } from 'react';
import {
  NUTRITION_QUESTIONS,
  QUESTIONS_PER_GAME,
  type NutritionQuestion,
} from './data/food';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useHealthyFoodGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion: advanceQuestion } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<NutritionQuestion[]>([]);

  const startGame = useCallback(() => {
    const picked = shuffle(NUTRITION_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(picked);
    startQuiz('healthy-food', picked.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    const correct = questions[index]?.correctIndex === idx;
    storeSelectAnswer(String(idx), correct);
  }, [selected, questions, index, storeSelectAnswer]);

  const nextQuestion = useCallback(() => advanceQuestion(), [advanceQuestion]);

  const currentQuestion = questions[index] ?? null;

  return {
    phase,
    currentQuestion,
    currentIndex: index,
    total: questions.length,
    selected: selected !== null ? Number(selected) : null,
    isCorrect: isCorrect ?? false,
    score,
    startGame,
    selectAnswer,
    nextQuestion,
  };
}
