'use client';

import { useState, useCallback } from 'react';
import { useTimedQuizGame } from '@/hooks/games/useTimedQuizGame';

export const COLORS = [
  { name: 'אדום',  bg: 'bg-red-500',    hex: '#ef4444', emoji: '🔴' },
  { name: 'כחול',  bg: 'bg-blue-500',   hex: '#3b82f6', emoji: '🔵' },
  { name: 'ירוק',  bg: 'bg-green-500',  hex: '#22c55e', emoji: '🟢' },
  { name: 'צהוב',  bg: 'bg-yellow-400', hex: '#facc15', emoji: '🟡' },
  { name: 'סגול',  bg: 'bg-purple-500', hex: '#a855f7', emoji: '🟣' },
  { name: 'כתום',  bg: 'bg-orange-500', hex: '#f97316', emoji: '🟠' },
  { name: 'ורוד',  bg: 'bg-pink-400',   hex: '#f472b6', emoji: '🩷' },
  { name: 'תכלת',  bg: 'bg-cyan-400',   hex: '#22d3ee', emoji: '🩵' },
];

export type ColorItem = typeof COLORS[0];

export const TIME_PER_Q = 5;

function makeQuestion() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  const target = shuffled[0];
  const options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
  return { target, options };
}

export function useColorTapGame() {
  const [question, setQuestion] = useState(makeQuestion);

  const {
    phase, score, best, lives, timeLeft, feedback,
    phaseRef, startGame: startBase, handleCorrect, handleWrong,
  } = useTimedQuizGame({
    timePerQ: TIME_PER_Q,
    feedbackDelay: 700,
    onNextQuestion: () => setQuestion(makeQuestion()),
  });

  const startGame = useCallback(() => {
    startBase(() => setQuestion(makeQuestion()));
  }, [startBase]);

  const handleTap = useCallback((color: ColorItem) => {
    if (phaseRef.current !== 'playing' || feedback) return;
    if (color === question.target) {
      handleCorrect(10);
    } else {
      handleWrong();
    }
  }, [feedback, question, phaseRef, handleCorrect, handleWrong]);

  return { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap };
}
