'use client';

import { useRiddlesGame } from './useRiddlesGame';
import RiddlesMenuScreen from './components/RiddlesMenuScreen';
import RiddlesQuestion from './components/RiddlesQuestion';
import RiddlesResultScreen from './components/RiddlesResultScreen';

export default function RiddlesGame() {
  const { phase, correctCount, total, score, startGame, restart } = useRiddlesGame();

  if (phase === 'menu') return <RiddlesMenuScreen onStart={startGame} />;
  if (phase === 'playing') return <RiddlesQuestion />;
  return <RiddlesResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} />;
}

