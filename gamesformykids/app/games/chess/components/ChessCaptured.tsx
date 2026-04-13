'use client';

import { PIECE_SYMBOLS } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

// Material value for sorting captured display
const ORDER = ['Q', 'R', 'B', 'N', 'P'];

function sortPieces(pieces: (string | null)[]) {
  return [...pieces].filter(Boolean).sort((a, b) =>
    ORDER.indexOf(a![1]) - ORDER.indexOf(b![1])
  ) as string[];
}

export default function ChessCaptured() {
  const { capturedByPlayer, capturedByComputer } = useChessStore();

  const byPlayer = sortPieces(capturedByPlayer);
  const byComputer = sortPieces(capturedByComputer);

  if (byPlayer.length === 0 && byComputer.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Computer ate white pieces */}
      {byComputer.length > 0 && (
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
          <span className="text-slate-500 text-[10px] whitespace-nowrap">מחשב אכל:</span>
          <div className="flex flex-wrap gap-0.5">
            {byComputer.map((p, i) => (
              <span key={i} className="text-lg leading-none text-white/80">{PIECE_SYMBOLS[p]}</span>
            ))}
          </div>
        </div>
      )}
      {/* Player ate black pieces */}
      {byPlayer.length > 0 && (
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
          <span className="text-slate-500 text-[10px] whitespace-nowrap">אכלת:</span>
          <div className="flex flex-wrap gap-0.5">
            {byPlayer.map((p, i) => (
              <span key={i} className="text-lg leading-none text-white/80">{PIECE_SYMBOLS[p]}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
