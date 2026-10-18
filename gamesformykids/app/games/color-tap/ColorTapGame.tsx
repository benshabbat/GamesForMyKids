'use client';
import { useEffect } from 'react';
import { useColorTapGame } from './useColorTapGame';
import { useColorTapStore } from './colorTapStore';
import ColorTapMenuScreen from './components/ColorTapMenuScreen';
import ColorTapPlayArea from './components/ColorTapPlayArea';
import ColorTapResultScreen from './components/ColorTapResultScreen';

export default function ColorTapGame() {
  const { phase } = useColorTapGame();

  // The countdown interval lives at module level — stop it (and reset to the menu) when the
  // player leaves, or lives keep draining in the background and the next visit starts mid-game.
  useEffect(() => () => useColorTapStore.getState().abandonGame(), []);

  if (phase === 'menu') return <ColorTapMenuScreen />;
  if (phase === 'dead') return <ColorTapResultScreen />;
  return <ColorTapPlayArea />;
}
