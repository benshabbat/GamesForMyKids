'use client';

import { useState, useCallback } from 'react';
import {
  BODY_QUESTIONS,
  BODY_CATEGORIES,
  QUESTIONS_PER_GAME,
  type BodyCategory,
  type BodyQuestion,
} from './data/body';

import type { PhaseQuiz as Phase } from '@/lib/types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useHumanBodyGame() {
  const [phase, setPhase]             = useState<Phase>('menu');
  const [category, setCategory]       = useState<BodyCategory>('הכל');
  const [questions, setQuestions]     = useState<BodyQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices]         = useState<string[]>([]);
  const [selected, setSelected]       = useState<string | null>(null);
  const [isCorrect, setIsCorrect]     = useState(false);
  const [score, setScore]             = useState(0);

  const categories = BODY_CATEGORIES;

  const startGame = useCallback((cat: BodyCategory = 'הכל') => {
    const pool = cat === 'הכל'
      ? BODY_QUESTIONS
      : BODY_QUESTIONS.filter(q => q.category === cat);
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    const first = picked[0];
    setCategory(cat);
    setQuestions(picked);
    setCurrentIndex(0);
    setChoices(shuffle([first.function, ...first.wrongOptions]));
    setSelected(null);
    setIsCorrect(false);
    setScore(0);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((answer: string) => {
    if (phase !== 'playing') return;
    const correct = questions[currentIndex].function === answer;
    setSelected(answer);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setPhase('answered');
  }, [phase, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    const next = currentIndex + 1;
    if (next >= questions.length) {
      setPhase('finished');
      return;
    }
    const q = questions[next];
    setCurrentIndex(next);
    setChoices(shuffle([q.function, ...q.wrongOptions]));
    setSelected(null);
    setIsCorrect(false);
    setPhase('playing');
  }, [currentIndex, questions]);

  const goToMenu = useCallback(() => {
    setPhase('menu');
    setScore(0);
    setCurrentIndex(0);
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;

  return {
    phase,
    category,
    categories,
    currentQuestion,
    currentIndex,
    total: questions.length,
    choices,
    selected,
    isCorrect,
    score,
    startGame,
    selectAnswer,
    nextQuestion,
    goToMenu,
  };
}
