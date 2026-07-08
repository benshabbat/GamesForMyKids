'use client';

import TimerProgressBar from '@/components/game/shared/TimerProgressBar';

interface Props {
  timeLeft: number;
  score: number;
  streak: number;
  gameTime: number;
}

export default function MathRaceProgressBar({ timeLeft, score, streak, gameTime }: Props) {
  return (
    <div className="w-full max-w-sm mb-4">
      <div className="flex justify-between text-sm text-indigo-600 font-bold mb-1">
        <span>⏱️ {timeLeft}s</span>
        <span>🏆 {score}</span>
        {streak >= 2 && <span className="text-yellow-500">🔥×{streak}</span>}
      </div>
      <TimerProgressBar
        pct={(timeLeft / gameTime) * 100}
        trackClass="h-3 bg-white shadow-inner"
        barClass={timeLeft > 10 ? 'bg-blue-500' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-orange-400'}
      />
    </div>
  );
}
