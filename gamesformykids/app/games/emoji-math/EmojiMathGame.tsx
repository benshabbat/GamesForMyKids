'use client';
import { useEmojiMathGame, TIME_PER_Q } from './useEmojiMathGame';
import EmojiMathMenuScreen from './components/EmojiMathMenuScreen';
import EmojiMathGameOverScreen from './components/EmojiMathGameOverScreen';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';

export default function EmojiMathGame() {
  const { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap } = useEmojiMathGame();

  if (phase === 'menu') return (
    <EmojiMathMenuScreen best={best} onStart={startGame} />
  );

  if (phase === 'dead') return (
    <EmojiMathGameOverScreen score={score} best={best} onRestart={startGame} />
  );

  return (
    <EmojiMathPlayArea
      q={q}
      feedback={feedback}
      level={level}
      timeLeft={timeLeft}
      timePerQ={TIME_PER_Q}
      score={score}
      lives={lives}
      streak={streak}
      onTap={tap}
    />
  );
}
