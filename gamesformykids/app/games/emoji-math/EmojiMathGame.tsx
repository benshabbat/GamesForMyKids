'use client';
import { useEmojiMathGame } from './useEmojiMathGame';
import EmojiMathMenuScreen from './components/EmojiMathMenuScreen';
import EmojiMathGameOverScreen from './components/EmojiMathGameOverScreen';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';

export default function EmojiMathGame() {
  const { phase, score, best, startGame } = useEmojiMathGame();

  if (phase === 'menu') return <EmojiMathMenuScreen best={best} onStart={startGame} />;
  if (phase === 'dead') return <EmojiMathGameOverScreen score={score} best={best} onRestart={startGame} />;
  return <EmojiMathPlayArea />;
}
