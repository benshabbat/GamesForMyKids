'use client';

import { useSoccerResult } from '../hooks/useSoccerResult';

export default function SoccerResultActions() {
  const { category, startGame, goToMenu } = useSoccerResult();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => startGame(category)}
        className="px-6 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-lg active:scale-95"
      >
        שחק שוב ⚽
      </button>
      <button
        onClick={goToMenu}
        className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-xl font-bold shadow active:scale-95"
      >
        תפריט
      </button>
    </div>
  );
}
