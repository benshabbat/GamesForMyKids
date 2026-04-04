'use client';

import { useState, useCallback } from 'react';
import {
  SOCCER_QUESTIONS,
  SOCCER_CATEGORIES,
  QUESTIONS_PER_GAME,
  type SoccerCategory,
  type SoccerQuestion,
} from './data/soccer';

type Phase = 'menu' | 'playing' | 'answered' | 'finished';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useSoccerGame() {
  const [phase, setPhase]               = useState<Phase>('menu');
  const [category, setCategory]         = useState<SoccerCategory>('הכל');
  const [questions, setQuestions]       = useState<SoccerQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState<number | null>(null);
  const [isCorrect, setIsCorrect]       = useState(false);
  const [score, setScore]               = useState(0);
  const [showGoal, setShowGoal]         = useState(false);

  const categories = SOCCER_CATEGORIES;

  const startGame = useCallback((cat: SoccerCategory = 'הכל') => {
    const pool = cat === 'הכל'
      ? SOCCER_QUESTIONS
      : SOCCER_QUESTIONS.filter(q => q.category === cat);
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setCategory(cat);
    setQuestions(picked);
    setCurrentIndex(0);
    setSelected(null);
    setIsCorrect(false);
    setScore(0);
    setShowGoal(false);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback((idx: number) => {
    if (phase !== 'playing') return;
    const correct = questions[currentIndex].correctIndex === idx;
    setSelected(idx);
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 1500);
    }
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
    setShowGoal(false);
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;

  return {
    phase,
    category,
    categories,
    currentQuestion,
    currentIndex,
    total: questions.length,
    selected,
    isCorrect,
    score,
    showGoal,
    startGame,
    selectAnswer,
    nextQuestion,
    goToMenu,
  };
}
