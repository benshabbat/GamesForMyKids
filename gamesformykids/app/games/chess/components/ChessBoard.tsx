'use client';

import { useChessStore } from '../store/useChessStore';
import ChessSquare from './ChessSquare';

const FILES = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function ChessBoard() {
  const { board } = useChessStore();

  return (
    <div className="flex items-start">
      {/* Rank labels — outside the board */}
      <div className="flex flex-col ml-1 mt-0">
        {RANKS.map(rank => (
          <div key={rank} className="w-4 h-10 sm:h-12 flex items-center justify-center">
            <span className="text-slate-500 text-[10px] font-medium">{rank}</span>
          </div>
        ))}
      </div>

      {/* Board + file labels */}
      <div className="flex flex-col">
        {/* Wooden frame */}
        <div className="bg-amber-950 p-1.5 rounded-xl shadow-2xl shadow-black/70 border border-amber-900/60">
          <div className="rounded-lg overflow-hidden">
            {board.map((_row, r) => (
              <div key={r} className="flex">
                {_row.map((_piece, c) => (
                  <ChessSquare key={c} row={r} col={c} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* File labels */}
        <div className="flex mt-1">
          {FILES.map(f => (
            <div key={f} className="w-10 sm:w-12 flex items-center justify-center">
              <span className="text-slate-500 text-[10px] font-medium">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
