'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  BODY_QUESTIONS,
  type BodyCategory,
  type BodyQuestion,
} from './data/body';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


export function useHumanBodyGame() {
  // ── Zustand ── shared quiz session state ───────────────────
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelectAnswer } = useQuizGameStore();

  // ── Local state ── game-specific data ──────────────────────
  const [category, setCategory]   = useState<BodyCategory>('הכל');
  const [questions, setQuestions] = useState<BodyQuestion[]>([]);

  const currentQuestion = questions[index] ?? null;
  const choices = useMemo<string[]>(
    () => (currentQuestion ? shuffle([currentQuestion.function, ...currentQuestion.wrongOptions]) : []),
    [currentQuestion],
  );

  const startGame = useCallback((cat: BodyCategory = 'הכל') => {
    const pool = cat === 'הכל'
      ? BODY_QUESTIONS
      : BODY_QUESTIONS.filter(q => q.category === cat);
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(picked);
    startQuiz('human-body', picked.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((answer: string) => {
    if (selected !== null) return;
    const correct = questions[index]?.function === answer;
    storeSelectAnswer(answer, correct);
  }, [selected, questions, index, storeSelectAnswer]);

  return { phase, category, currentQuestion, choices, startGame, selectAnswer };
}
