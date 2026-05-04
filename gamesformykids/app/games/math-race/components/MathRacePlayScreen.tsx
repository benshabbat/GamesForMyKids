'use client';
import { useShallow } from 'zustand/react/shallow';
import { useMathRaceStore, GAME_TIME } from '../mathRaceStore';
import MathRaceProgressBar from './MathRaceProgressBar';
import MathRaceQuestion from './MathRaceQuestion';

export default function MathRacePlayScreen() {
  const { q, score, timeLeft, feedback, streak, correct, total, tap } =
    useMathRaceStore(useShallow((s) => s));
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <MathRaceProgressBar timeLeft={timeLeft} score={score} streak={streak} gameTime={GAME_TIME} />
      <MathRaceQuestion q={q} feedback={feedback} streak={streak} onTap={tap} />
      <p className="mt-4 text-xs text-indigo-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
    </div>
  );
}
