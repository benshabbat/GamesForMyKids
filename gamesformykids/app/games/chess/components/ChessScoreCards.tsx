'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessScoreCards() {
  const { playerScore, computerScore } = useChessStore();

  return (
    <div className="flex gap-3 w-full">
      <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
        <div className="text-3xl leading-none mb-1">♙</div>
        <div className="text-amber-300 font-extrabold text-lg leading-none">{playerScore}</div>
        <div className="text-slate-400 text-[11px] mt-0.5">ניצחונות</div>
      </div>
      <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
        <div className="text-3xl leading-none mb-1">♟</div>
        <div className="text-amber-300 font-extrabold text-lg leading-none">{computerScore}</div>
        <div className="text-slate-400 text-[11px] mt-0.5">ניצחונות</div>
      </div>
    </div>
  );
}
