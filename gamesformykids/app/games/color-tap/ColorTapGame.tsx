'use client';
import { useColorTapGame, TIME_PER_Q } from './useColorTapGame';
import ColorTapMenuScreen from './components/ColorTapMenuScreen';
import ColorTapGameOverScreen from './components/ColorTapGameOverScreen';
import ColorTapPlayArea from './components/ColorTapPlayArea';

export default function ColorTapGame() {
  const { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap } = useColorTapGame();

  if (phase === 'menu') return (
    <ColorTapMenuScreen best={best} onStart={startGame} />
  );

  if (phase === 'dead') return (
    <ColorTapGameOverScreen score={score} best={best} onRestart={startGame} />
  );

  return (
    <ColorTapPlayArea
      question={question}
      feedback={feedback}
      timeLeft={timeLeft}
      timePerQ={TIME_PER_Q}
      score={score}
      lives={lives}
      onTap={handleTap}
    />
  );
}
