'use client';

import { useState, useCallback } from 'react';
import { NATURE_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES, type NatureQuestion, type NatureCategory } from './data/questions';

import type { PhaseResult as Phase } from '@/lib/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useNatureGame() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [questions, setQuestions] = useState<NatureQuestion[]>([]);
  const [category, setCategory] = useState<NatureCategory>('הכל');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = questions[index] ?? null;
  const total = questions.length;
  const correctCount = Math.round(score / 10);

  const startGame = useCallback((cat: NatureCategory = 'הכל') => {
    const pool = cat === 'הכל' ? NATURE_QUESTIONS : NATURE_QUESTIONS.filter(q => q.category === cat);
    const q = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return;
    const correct = idx === current.correctIndex;
    setSelected(idx);
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
  const restart = useCallback(() => startGame(category), [category, startGame]);

  return { phase, category, categories: CATEGORIES, index, score, selected, isCorrect, current, total, correctCount, startGame, selectAnswer, next, goMenu, restart };
}
