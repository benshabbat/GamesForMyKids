'use client';
import { useColorTapGame } from './useColorTapGame';
import ColorTapMenuScreen from './components/ColorTapMenuScreen';
import ColorTapPlayArea from './components/ColorTapPlayArea';
import ColorTapResultScreen from './components/ColorTapResultScreen';

export default function ColorTapGame() {
  const { phase } = useColorTapGame();

  if (phase === 'menu') return <ColorTapMenuScreen />;
  if (phase === 'dead') return <ColorTapResultScreen />;
  return <ColorTapPlayArea />;
}
