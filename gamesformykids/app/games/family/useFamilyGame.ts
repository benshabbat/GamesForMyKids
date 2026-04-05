'use client';

import { useState, useCallback } from 'react';
import {
  FAMILY_QUESTIONS,
  QUESTIONS_PER_GAME,
  type FamilyQuestion,
} from './data/family';

import type { PhaseQuiz as Phase } from '@/lib/types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useFamilyGame() {
  const [phase, setPhase]               = useState<Phase>('menu');
  const [questions, setQuestions]       = useState<FamilyQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState<number | null>(null);
  const [isCorrect, setIsCorrect]       = useState(false);
  const [score, setScore]               = useState(0);

  const startGame = useCallback(() => {
    const picked = shuffle(FAMILY_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
    setQuestions(picked);
    setCurrentIndex(0);
    setSelected(null);
    setIsCorrect(false);
    setScore(0);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((idx: number) => {
    if (phase !== 'playing') return;
    const correct = questions[currentIndex].correctIndex === idx;
    setSelected(idx);
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
    setCurrentIndex(next);
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
    currentQuestion,
    currentIndex,
    total: questions.length,
    selected,
    isCorrect,
    score,
    startGame,
    selectAnswer,
    nextQuestion,
    goToMenu,
  };
}
