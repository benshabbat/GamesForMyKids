'use client';
import { useTrueFalseGame, TIME_PER_Q } from './useTrueFalseGame';
import TrueFalseMenuScreen from './components/TrueFalseMenuScreen';
import TrueFalsePlayScreen from './components/TrueFalsePlayScreen';
import TrueFalseResultScreen from './components/TrueFalseResultScreen';

export default function TrueFalseGame() {
  const { phase, q, score, best, lives, timeLeft, feedback, startGame, answer } = useTrueFalseGame();

  if (phase === 'menu') return <TrueFalseMenuScreen best={best} timePer={TIME_PER_Q} onStart={startGame} />;

  if (phase === 'dead') return <TrueFalseResultScreen score={score} best={best} onRestart={startGame} />;

  return (
    <TrueFalsePlayScreen
      score={score}
      lives={lives}
      timeLeft={timeLeft}
      timePer={TIME_PER_Q}
      q={q}
      feedback={feedback}
      onAnswer={answer}
    />
  );
}
