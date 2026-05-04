'use client';
import { useColorTapGame } from './useColorTapGame';
import ColorTapMenuScreen from './components/ColorTapMenuScreen';
import ColorTapGameOverScreen from './components/ColorTapGameOverScreen';
import ColorTapPlayArea from './components/ColorTapPlayArea';

export default function ColorTapGame() {
  const { phase, score, best, startGame } = useColorTapGame();

  if (phase === 'menu') return <ColorTapMenuScreen best={best} onStart={startGame} />;
  if (phase === 'dead') return <ColorTapGameOverScreen score={score} best={best} onRestart={startGame} />;
  return <ColorTapPlayArea />;
}
