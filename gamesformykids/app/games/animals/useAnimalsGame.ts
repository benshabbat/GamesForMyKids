'use client';

import { useState, useCallback, useMemo } from 'react';
import { ANIMALS, CATEGORY_NAMES, Animal, AnimalCategory } from './data/animals';
import { shuffle } from '@/lib/utils';
import { useQuizGameStore } from '@/lib/stores';

export type QuestionMode = 'emoji-to-name' | 'name-to-emoji';

interface Question {
  animal: Animal;
  choices: Animal[];
  mode: QuestionMode;
}

function makeQuestion(pool: Animal[]): Question {
  const animal = pool[Math.floor(Math.random() * pool.length)];
  const others = shuffle(pool.filter(a => a.id !== animal.id)).slice(0, 3);
  const choices = shuffle([animal, ...others]);
  const mode: QuestionMode = Math.random() > 0.5 ? 'emoji-to-name' : 'name-to-emoji';
  return { animal, choices, mode };
}

const QUESTIONS_PER_GAME = 10;

export function useAnimalsGame() {
  // ── Zustand — shared quiz session state ───────────────────
  const phase      = useQuizGameStore(s => s.phase);
  const index      = useQuizGameStore(s => s.index);
  const score      = useQuizGameStore(s => s.score);
  const selected   = useQuizGameStore(s => s.selected);
  const isCorrect  = useQuizGameStore(s => s.isCorrect);
  const { startQuiz, selectAnswer: storeSelectAnswer, nextQuestion, goToMenu, restartQuiz } = useQuizGameStore();

  // ── Local state — game-specific data ──────────────────────
  const [category, setCategory]   = useState<AnimalCategory | 'all'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);

  const pool = useMemo(() =>
    category === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === category),
    [category],
  );

  const current = questions[index] ?? null;

  // ── Actions ───────────────────────────────────────────────
  const startGame = useCallback((cat: AnimalCategory | 'all') => {
    const p  = cat === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === cat);
    const qs = Array.from({ length: QUESTIONS_PER_GAME }, () => makeQuestion(p));
    setCategory(cat);
    setQuestions(qs);
    startQuiz('animals', QUESTIONS_PER_GAME);
  }, [startQuiz]);

  const selectAnswer = useCallback((id: string) => {
    if (selected || !current) return;
    storeSelectAnswer(id, id === current.animal.id);
  }, [selected, current, storeSelectAnswer]);

  const next    = useCallback(() => nextQuestion(), [nextQuestion]);
  const goMenu  = useCallback(() => goToMenu(), [goToMenu]);
  const restart = useCallback(() => {
    const p  = category === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === category);
    const qs = Array.from({ length: QUESTIONS_PER_GAME }, () => makeQuestion(p));
    setQuestions(qs);
    restartQuiz();
  }, [category, restartQuiz]);

  return {
    phase, category, index, score, selected, isCorrect, current,
    total: QUESTIONS_PER_GAME,
    categoryNames: CATEGORY_NAMES,
    pool,
    startGame, selectAnswer, next, goMenu, restart,
  };
}

