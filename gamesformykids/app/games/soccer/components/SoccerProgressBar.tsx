'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';

export default function SoccerProgressBar() {
  const { currentIndex, total, progressPct } = useSoccerQuestion();

  return (
    <>
      <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
        <div
          className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p className="text-green-200 text-xs text-center mb-4">שאלה {currentIndex + 1} מתוך {total}</p>
    </>
  );
}
