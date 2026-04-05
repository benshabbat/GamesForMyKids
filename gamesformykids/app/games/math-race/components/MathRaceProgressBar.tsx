'use client';

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
      <div className="bg-white rounded-full h-3 shadow-inner">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${
            timeLeft > 10 ? 'bg-blue-500' : timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'
          }`}
          style={{ width: `${(timeLeft / gameTime) * 100}%` }}
        />
      </div>
    </div>
  );
}
