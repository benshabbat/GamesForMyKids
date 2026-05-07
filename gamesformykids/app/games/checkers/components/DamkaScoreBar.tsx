'use client';

import { useDamkaGame } from '../useDamkaGame';

export default function DamkaScoreBar() {
  const { board, playerScore, computerScore, currentTurn, message } = useDamkaGame();

  const playerPieces = board.flat().filter(c => c.color === 'player').length;
  const compPieces   = board.flat().filter(c => c.color === 'computer').length;

  return (
    <>
      <div className="flex justify-between w-full text-white text-sm font-semibold px-1">
        <span>🔴 {playerPieces} אסימונים</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          currentTurn === 'player' ? 'bg-amber-400 text-gray-900' : 'bg-gray-700 text-gray-300'
        }`}>
          {currentTurn === 'player' ? '← תורך' : 'תור המחשב...'}
        </span>
        <span>⚪ {compPieces} אסימונים</span>
      </div>

      <p className="text-amber-200 text-sm font-medium bg-black/30 rounded-xl py-2 px-4 text-center max-w-xs">
        {message}
      </p>

      <div className="flex gap-4 text-white text-sm">
        <span>🔴 ניצחונות: {playerScore}</span>
        <span>⚪ ניצחונות: {computerScore}</span>
      </div>
    </>
  );
}
