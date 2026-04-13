'use client';

import { useChessStore } from '../store/useChessStore';
import ChessSquare from './ChessSquare';

const FILES = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function ChessBoard() {
  const { board } = useChessStore();

  return (
    <div className="relative border-2 border-slate-600 rounded-xl overflow-hidden shadow-2xl">
      {/* Rank labels */}
      <div className="absolute right-0 top-0 h-full flex flex-col pointer-events-none z-10">
        {RANKS.map(rank => (
          <div key={rank} className="flex-1 flex items-center justify-end pr-0.5">
            <span className="text-slate-400 text-[9px] leading-none">{rank}</span>
          </div>
        ))}
      </div>

      {/* Squares */}
      {board.map((row, r) => (
        <div key={r} className="flex">
          {row.map((_piece, c) => (
            <ChessSquare key={c} row={r} col={c} />
          ))}
        </div>
      ))}

      {/* File labels */}
      <div className="flex bg-slate-800">
        {FILES.map(f => (
          <div key={f} className="w-9 sm:w-10 flex items-center justify-center">
            <span className="text-slate-400 text-[9px]">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
