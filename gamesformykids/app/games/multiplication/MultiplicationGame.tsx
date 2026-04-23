'use client';
import { useEffect } from 'react';
import { useMultiplicationGame } from './useMultiplicationGame';
import { stopMultiplicationTimer } from './multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from './data/tables';
import MultiplicationMenuScreen from './components/MultiplicationMenuScreen';
import MultiplicationQuestion from './components/MultiplicationQuestion';
import MultiplicationResultScreen from './components/MultiplicationResultScreen';

export default function MultiplicationGame() {
  const { phase, level, correct, totalQuestions, score, startGame } = useMultiplicationGame();

  // Stop timer if user navigates away before the game ends
  useEffect(() => stopMultiplicationTimer, []);

  if (phase === 'menu') return <MultiplicationMenuScreen levels={LEVELS} questionsPerLevel={QUESTIONS_PER_LEVEL} timePerQuestion={TIME_PER_QUESTION} onStart={startGame} />;
  if (phase === 'playing') return <MultiplicationQuestion />;
  return <MultiplicationResultScreen level={level} correct={correct} totalQuestions={totalQuestions} score={score} onRestart={startGame} />;
}
