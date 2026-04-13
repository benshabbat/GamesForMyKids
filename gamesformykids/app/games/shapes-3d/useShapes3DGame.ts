'use client';

import { useState, useCallback, useMemo } from 'react';
import { QUIZ_QUESTIONS, SHAPES_3D, QUESTIONS_PER_GAME, type QuizQuestion } from './data/shapes';
import { useQuizGameStore } from '@/lib/stores';
import { shuffle } from '@/lib/utils';


function makeChoices(q: QuizQuestion): string[] {
  const shape = SHAPES_3D.find(s => s.id === q.shapeId);
  if (!shape) return [q.answer];
  return shuffle([q.answer, ...shape.wrongOptions]);
}

export function useShapes3DGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const current = questions[index] ?? null;
  const choices = useMemo(() => (current ? makeChoices(current) : []), [current]);
  const currentShape = current ? SHAPES_3D.find(s => s.id === current.shapeId) ?? null : null;
  const total = questions.length;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback(() => {
    const q = shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    startQuiz('shapes-3d', q.length);
  }, [startQuiz]);

  const selectAnswer = useCallback((answer: string) => {
    if (selected !== null || !current) return;
    storeSelectAnswer(answer, answer === current.answer);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const q = shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    restartQuiz();
  }, [restartQuiz]);

  return {
    phase, index, score: score * 10, selected, isCorrect, current, currentShape, choices, total,
    correctCount: score,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
