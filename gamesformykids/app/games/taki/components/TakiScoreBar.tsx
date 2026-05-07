'use client';

import { useTakiGame } from '../useTakiGame';

export default function TakiScoreBar() {
  const { playerScore, computerScore, currentTurn } = useTakiGame();

  return (
    <div className="flex justify-between items-center text-white text-sm font-semibold px-1">
      <span>🧑 אתה: {playerScore}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        currentTurn === 'player' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-gray-300'
      }`}>
        {currentTurn === 'player' ? '← תורך' : 'תור המחשב...'}
      </span>
      <span>🤖 מחשב: {computerScore}</span>
    </div>
  );
}
