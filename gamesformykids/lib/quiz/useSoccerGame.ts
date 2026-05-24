'use client';

import { useCallback } from 'react';
import { SOCCER_QUESTIONS, SOCCER_CATEGORIES, type SoccerCategory } from '@/app/games/soccer/data/soccer';
import { QUESTIONS_PER_GAME } from './constants';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { shuffle } from '@/lib/utils';
import { useSoccerGameStore } from '@/app/games/soccer/soccerGameStore';

export function useSoccerGame() {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelect, restartQuiz } = useQuizGameStore();

  const { questions, category, showGoal, setQuestions, setShowGoal } = useSoccerGameStore();
  const current      = questions[index] ?? null;
  const choices      = current ? current.answers.map((_, i) => String(i)) : [];
  const correctLabel = current ? String(current.correctIndex) : '';

  const startGame = useCallback((cat: SoccerCategory = 'הכל') => {
    const pool = cat === 'הכל'
      ? SOCCER_QUESTIONS
      : SOCCER_QUESTIONS.filter(q => q.category === cat);
    const shuffled = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(shuffled, cat);
    startQuiz('soccer', shuffled.length);
    useGameStore.getState().startGame('soccer');
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [startQuiz, setQuestions]);

  const selectAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return;
    const correct = idx === current.correctIndex;
    if (correct) {
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 1500);
    }
    storeSelect(String(idx), correct);
    useGameProgressStore.getState().recordAttempt(correct);
  }, [selected, current, storeSelect, setShowGoal]);

  const restart = useCallback(() => {
    const pool = category === 'הכל'
      ? SOCCER_QUESTIONS
      : SOCCER_QUESTIONS.filter(q => q.category === category);
    const shuffled = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setQuestions(shuffled, category);
    restartQuiz();
    useGameStore.getState().startGame('soccer');
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [category, restartQuiz, setQuestions]);

  return {
    phase,
    category,
    categories: SOCCER_CATEGORIES,
    current,
    choices,
    correctLabel,
    showGoal,
    startGame,
    selectAnswer,
    restart,
  };
}
