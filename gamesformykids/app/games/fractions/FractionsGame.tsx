'use client';

import { useFractionsGame } from './useFractionsGame';
import FractionsMenuScreen from './components/FractionsMenuScreen';
import FractionsQuestion from './components/FractionsQuestion';
import FractionsResultScreen from './components/FractionsResultScreen';

export default function FractionsGame() {
  const { phase, correctCount, total, score, startGame, restart } = useFractionsGame();

  if (phase === 'menu') return <FractionsMenuScreen onStart={startGame} />;
  if (phase === 'playing') return <FractionsQuestion />;
  return <FractionsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} />;
}
