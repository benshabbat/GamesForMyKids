'use client';

import { useCapitalsGame } from './useCapitalsGame';
import CapitalsMenuScreen from './components/CapitalsMenuScreen';
import CapitalsQuestion from './components/CapitalsQuestion';
import CapitalsResultScreen from './components/CapitalsResultScreen';

export default function CapitalsGame() {
  const { phase, correctCount, total, score, startGame, restart, goMenu } = useCapitalsGame();

  if (phase === 'menu') return <CapitalsMenuScreen onStart={startGame} />;
  if (phase === 'playing') return <CapitalsQuestion />;
  return <CapitalsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />;
}
