'use client';

import { useChessStore } from '../store/useChessStore';
import ChessSquare from './ChessSquare';

const FILES = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function ChessBoard() {
  const { board } = useChessStore();

  return (
    <div className="flex items-start gap-1">
      {/* Rank labels */}
      <div className="flex flex-col">
        {RANKS.map(rank => (
          <div key={rank} className="w-4 h-10 sm:h-12 flex items-center justify-center">
            <span className="text-amber-800/60 text-[10px] font-semibold">{rank}</span>
          </div>
        ))}
      </div>

      {/* Board */}
      <div className="flex flex-col">
        <div
          className="rounded-xl overflow-hidden shadow-2xl shadow-black/80"
          style={{
            padding: '6px',
            background: 'linear-gradient(145deg, #6b3a1f 0%, #3d1f0a 50%, #6b3a1f 100%)',
            boxShadow: '0 0 0 1px rgba(255,200,100,0.15), 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,100,0.2)',
          }}
        >
          <div className="rounded-lg overflow-hidden" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)' }}>
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
        <div className="flex mt-1 px-1.5">
          {FILES.map(f => (
            <div key={f} className="w-10 sm:w-12 flex items-center justify-center">
              <span className="text-amber-800/60 text-[10px] font-semibold">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
