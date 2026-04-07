'use client';
import { useEffect } from 'react';
import { useArithmeticGame } from './useArithmeticGame';
import { stopArithmeticTimer } from './arithmeticGameStore';
import ArithmeticMenuScreen from './components/ArithmeticMenuScreen';
import ArithmeticQuestion from './components/ArithmeticQuestion';
import ArithmeticResultScreen from './components/ArithmeticResultScreen';

export default function ArithmeticGame() {
  const { phase, level, correct, totalQuestions, score, levels, startGame, goMenu } = useArithmeticGame();

  // Stop timer if user navigates away before the game ends
  useEffect(() => stopArithmeticTimer, []);

  if (phase === 'menu') return <ArithmeticMenuScreen levels={levels} onStart={startGame} />;
  if (phase === 'playing') return <ArithmeticQuestion />;
  return <ArithmeticResultScreen level={level} correct={correct} totalQuestions={totalQuestions} score={score} onRestart={() => startGame(level)} onMenu={goMenu} />;
}
