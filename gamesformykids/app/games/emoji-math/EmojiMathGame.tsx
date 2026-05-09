'use client';
import { useEmojiMathGame } from './useEmojiMathGame';
import EmojiMathMenuScreen from './components/EmojiMathMenuScreen';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';
import EmojiMathResultScreen from './components/EmojiMathResultScreen';

export default function EmojiMathGame() {
  const { phase } = useEmojiMathGame();

  if (phase === 'menu') return <EmojiMathMenuScreen />;
  if (phase === 'dead') return <EmojiMathResultScreen />;
  return <EmojiMathPlayArea />;
}
