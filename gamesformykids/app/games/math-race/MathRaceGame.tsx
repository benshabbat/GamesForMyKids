'use client';
import { useMathRaceGame, GAME_TIME } from './useMathRaceGame';
import MathRaceMenuScreen from './components/MathRaceMenuScreen';
import MathRaceResultScreen from './components/MathRaceResultScreen';
import MathRacePlayScreen from './components/MathRacePlayScreen';

export default function MathRaceGame() {
  const { phase, q, score, best, timeLeft, feedback, streak, total, correct, accuracy, startGame, tap } = useMathRaceGame();

  if (phase === 'menu') return (
    <MathRaceMenuScreen best={best} gameTime={GAME_TIME} onStart={startGame} />
  );

  if (phase === 'dead') return (
    <MathRaceResultScreen
      score={score}
      best={best}
      correct={correct}
      total={total}
      accuracy={accuracy}
      onRestart={startGame}
    />
  );

  return (
    <MathRacePlayScreen
      q={q}
      score={score}
      timeLeft={timeLeft}
      feedback={feedback}
      streak={streak}
      correct={correct}
      total={total}
      accuracy={accuracy}
      gameTime={GAME_TIME}
      onTap={tap}
    />
  );
}
