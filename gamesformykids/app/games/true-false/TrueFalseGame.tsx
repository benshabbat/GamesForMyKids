'use client';
import { useEffect } from 'react';
import { useTrueFalseGame } from './useTrueFalseGame';
import { useTrueFalseStore } from './trueFalseStore';
import TrueFalseMenuScreen from './components/TrueFalseMenuScreen';
import TrueFalsePlayScreen from './components/TrueFalsePlayScreen';
import TrueFalseResultScreen from './components/TrueFalseResultScreen';

export default function TrueFalseGame() {
  const { phase } = useTrueFalseGame();

  // The countdown interval lives at module level — stop it (and reset to the menu) when the
  // player leaves, or lives keep draining in the background and the next visit starts mid-game.
  useEffect(() => () => useTrueFalseStore.getState().abandonGame(), []);

  if (phase === 'menu') return <TrueFalseMenuScreen />;
  if (phase === 'dead') return <TrueFalseResultScreen />;
  return <TrueFalsePlayScreen />;
}
