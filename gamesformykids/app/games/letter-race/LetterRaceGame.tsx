'use client';
import { useLetterRaceGame } from './useLetterRaceGame';
import LetterRaceMenuScreen from './components/LetterRaceMenuScreen';
import LetterRaceResultScreen from './components/LetterRaceResultScreen';
import LetterRacePlayScreen from './components/LetterRacePlayScreen';

export default function LetterRaceGame() {
  const { phase } = useLetterRaceGame();

  if (phase === 'menu') return <LetterRaceMenuScreen />;
  if (phase === 'dead') return <LetterRaceResultScreen />;
  return <LetterRacePlayScreen />;
}
