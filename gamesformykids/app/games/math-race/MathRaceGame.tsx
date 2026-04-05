'use client';
import { useMathRaceGame, GAME_TIME } from './useMathRaceGame';
import MathRaceMenuScreen from './components/MathRaceMenuScreen';
import MathRaceResultScreen from './components/MathRaceResultScreen';
import MathRaceProgressBar from './components/MathRaceProgressBar';
import MathRaceQuestion from './components/MathRaceQuestion';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <MathRaceProgressBar timeLeft={timeLeft} score={score} streak={streak} gameTime={GAME_TIME} />
      <MathRaceQuestion q={q} feedback={feedback} streak={streak} onTap={tap} />
      <p className="mt-4 text-xs text-indigo-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
    </div>
  );
}
