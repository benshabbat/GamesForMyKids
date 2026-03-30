'use client';

import { useState, useCallback } from 'react';
import {
  CONTINENT_QUESTIONS,
  CONTINENTS,
  QUESTIONS_PER_GAME,
  type ContinentQuestion,
} from './data/continents';

type Phase = 'menu' | 'playing' | 'answered' | 'finished';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useContinentsGame() {
  const [phase, setPhase]               = useState<Phase>('menu');
  const [questions, setQuestions]       = useState<ContinentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState<number | null>(null);
  const [isCorrect, setIsCorrect]       = useState(false);
  const [score, setScore]               = useState(0);

  const startGame = useCallback(() => {
    const picked = shuffle(CONTINENT_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
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
    continents: CONTINENTS,
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
