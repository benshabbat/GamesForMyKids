'use client';

import { useState, useCallback, useMemo } from 'react';
import { ANIMALS, CATEGORY_NAMES, Animal, AnimalCategory } from './data/animals';

export type AnimalsPhase = 'menu' | 'playing' | 'result';
export type QuestionMode = 'emoji-to-name' | 'name-to-emoji';

interface Question {
  animal: Animal;
  choices: Animal[];
  mode: QuestionMode;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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
  const [phase, setPhase] = useState<AnimalsPhase>('menu');
  const [category, setCategory] = useState<AnimalCategory | 'all'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const pool = useMemo(() =>
    category === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === category),
    [category]
  );

  const current = questions[index] || null;

  const startGame = useCallback((cat: AnimalCategory | 'all') => {
    const p = cat === 'all' ? ANIMALS : ANIMALS.filter(a => a.category === cat);
    const qs = Array.from({ length: QUESTIONS_PER_GAME }, () => makeQuestion(p));
    setCategory(cat);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsCorrect(null);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((id: string) => {
    if (selected || !current) return;
    setSelected(id);
    const ok = id === current.animal.id;
    setIsCorrect(ok);
    if (ok) setScore(s => s + 1);
  }, [selected, current]);

  const next = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setPhase('result');
    }
  }, [index, questions.length]);

  const goMenu = useCallback(() => setPhase('menu'), []);
  const restart = useCallback(() => startGame(category), [startGame, category]);

  return {
    phase, category, index, score, selected, isCorrect, current,
    total: QUESTIONS_PER_GAME,
    categoryNames: CATEGORY_NAMES,
    pool,
    startGame, selectAnswer, next, goMenu, restart,
  };
}
