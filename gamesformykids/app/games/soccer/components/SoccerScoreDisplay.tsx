'use client';

import { useSoccerResult } from '../hooks/useSoccerResult';

export default function SoccerScoreDisplay() {
  const { score, total, pct } = useSoccerResult();

  return (
    <>
      <div className="bg-white bg-opacity-20 rounded-2xl px-8 py-5 mb-8 text-center">
        <p className="text-2xl text-white font-bold">{score} / {total}</p>
        <p className="text-green-200 text-lg">{pct}% הצלחה</p>
      </div>
      <div className="w-full max-w-xs bg-white bg-opacity-20 rounded-full h-4 mb-8">
        <div
          className="h-4 rounded-full bg-yellow-400 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </>
  );
}
