'use client';
import { useEffect } from 'react';
import { useEmojiMathGame } from './useEmojiMathGame';
import { useEmojiMathStore } from './emojiMathStore';
import EmojiMathMenuScreen from './components/EmojiMathMenuScreen';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';
import EmojiMathResultScreen from './components/EmojiMathResultScreen';

export default function EmojiMathGame() {
  const { phase } = useEmojiMathGame();

  // The countdown interval lives at module level — stop it (and reset to the menu) when the
  // player leaves, or lives keep draining in the background and the next visit starts mid-game.
  useEffect(() => () => useEmojiMathStore.getState().abandonGame(), []);

  if (phase === 'menu') return <EmojiMathMenuScreen />;
  if (phase === 'dead') return <EmojiMathResultScreen />;
  return <EmojiMathPlayArea />;
}
