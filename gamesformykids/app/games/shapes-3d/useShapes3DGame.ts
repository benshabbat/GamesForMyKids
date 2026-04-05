'use client';

import { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS, SHAPES_3D, QUESTIONS_PER_GAME, type QuizQuestion } from './data/shapes';

import type { PhaseResult as Phase } from '@/lib/types';
import { shuffle } from '@/lib/utils';


function makeChoices(q: QuizQuestion): string[] {
  const shape = SHAPES_3D.find(s => s.id === q.shapeId);
  if (!shape) return [q.answer];
  return shuffle([q.answer, ...shape.wrongOptions]);
}

export function useShapes3DGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = questions[index] ?? null;
  const choices = current ? makeChoices(current) : [];
  const total = questions.length;
  const correctCount = Math.round(score / 10);
  const currentShape = current ? SHAPES_3D.find(s => s.id === current.shapeId) ?? null : null;

  const startGame = useCallback(() => {
    const q = shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((answer: string) => {
    if (selected !== null || !current) return;
    const correct = answer === current.answer;
    setSelected(answer);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 10);
  }, [selected, current]);

  const next = useCallback(() => {
    if (index + 1 >= total) {
      setPhase('result');
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  }, [index, total]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => { goMenu(); startGame(); }, [goMenu, startGame]);

  return { phase, index, score, selected, isCorrect, current, currentShape, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart };
}
