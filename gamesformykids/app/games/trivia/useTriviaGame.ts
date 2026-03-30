'use client';
import { useState, useCallback } from 'react';
import {
  TRIVIA_QUESTIONS, QUESTIONS_PER_GAME, TriviaQuestion, TriviaCategory,
} from './data/questions';

export type TriviaPhase = 'menu' | 'playing' | 'result';

export function useTriviaGame() {
  const [phase, setPhase] = useState<TriviaPhase>('menu');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [category, setCategory] = useState<TriviaCategory | 'all'>('all');

  const startGame = useCallback((cat: TriviaCategory | 'all' = 'all') => {
    setCategory(cat);
    const pool = cat === 'all'
      ? TRIVIA_QUESTIONS
      : TRIVIA_QUESTIONS.filter(q => q.category === cat);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME);
    setQuestions(shuffled);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const current = questions[index] ?? null;

  const selectAnswer = useCallback((i: number) => {
    if (selected !== null || !current) return;
    const ok = i === current.correctIndex;
    setSelected(i);
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
  }, [selected, current]);

  const next = useCallback(() => {
    const n = index + 1;
    if (n >= questions.length) setPhase('result');
    else { setIndex(n); setSelected(null); setIsCorrect(null); }
  }, [index, questions.length]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(category), [startGame, category]);

  return {
    phase, index, score, selected, isCorrect, current, category,
    total: questions.length || QUESTIONS_PER_GAME,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
