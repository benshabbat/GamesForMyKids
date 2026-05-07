'use client';
import { useMathRaceGame } from './useMathRaceGame';
import MathRaceMenuScreen from './components/MathRaceMenuScreen';
import MathRaceResultScreen from './components/MathRaceResultScreen';
import MathRacePlayScreen from './components/MathRacePlayScreen';

export default function MathRaceGame() {
  const { phase } = useMathRaceGame();

  if (phase === 'menu') return <MathRaceMenuScreen />;
  if (phase === 'dead') return <MathRaceResultScreen />;
  return <MathRacePlayScreen />;
}
