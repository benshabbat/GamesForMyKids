'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessStatusBar() {
  const { turn, playerScore, computerScore } = useChessStore();

  return (
    <div className="flex justify-between w-full text-white text-sm font-semibold px-1">
      <span>♙ אתה: {playerScore}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${turn === 'w' ? 'bg-slate-200 text-slate-900' : 'bg-slate-700 text-slate-300'}`}>
        {turn === 'w' ? '← תורך (לבן)' : 'תור המחשב (שחור)...'}
      </span>
      <span>♟ מחשב: {computerScore}</span>
    </div>
  );
}
