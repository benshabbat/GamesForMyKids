'use client';
import { useTrueFalseGame } from './useTrueFalseGame';
import TrueFalseMenuScreen from './components/TrueFalseMenuScreen';
import TrueFalsePlayScreen from './components/TrueFalsePlayScreen';
import TrueFalseResultScreen from './components/TrueFalseResultScreen';

export default function TrueFalseGame() {
  const { phase } = useTrueFalseGame();

  if (phase === 'menu') return <TrueFalseMenuScreen />;
  if (phase === 'dead') return <TrueFalseResultScreen />;
  return <TrueFalsePlayScreen />;
}
