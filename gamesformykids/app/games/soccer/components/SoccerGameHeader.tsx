'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';
import { CATEGORY_ICONS } from './SoccerShared';

export default function SoccerGameHeader() {
  const { score, currentQuestion } = useSoccerQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <span className="bg-white bg-opacity-20 text-white font-bold px-3 py-1 rounded-full text-sm">
          {CATEGORY_ICONS[currentQuestion.category] ?? '⚽'} {currentQuestion.category}
        </span>
        <span className="bg-yellow-400 text-green-900 font-black px-3 py-1 rounded-full text-sm">
          ⚽ {score}
        </span>
      </div>
    </div>
  );
}
