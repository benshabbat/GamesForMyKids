'use client';

import { PIECE_SYMBOLS } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

const ORDER = ['Q', 'R', 'B', 'N', 'P'];
const PIECE_VALUE: Record<string, number> = { Q: 9, R: 5, B: 3, N: 3, P: 1 };

function sortPieces(pieces: (string | null)[]) {
  return [...pieces].filter(Boolean).sort((a, b) =>
    ORDER.indexOf(a![1]) - ORDER.indexOf(b![1])
  ) as string[];
}

function materialSum(pieces: string[]) {
  return pieces.reduce((sum, p) => sum + (PIECE_VALUE[p[1]] ?? 0), 0);
}

export default function ChessCaptured() {
  const { capturedByPlayer, capturedByComputer } = useChessStore();

  const byPlayer = sortPieces(capturedByPlayer);
  const byComputer = sortPieces(capturedByComputer);

  if (byPlayer.length === 0 && byComputer.length === 0) return null;

  const playerMat = materialSum(byPlayer);
  const compMat = materialSum(byComputer);
  const diff = playerMat - compMat;

  return (
    <div
      className="w-full rounded-xl px-3 py-2 flex items-center gap-2 text-sm"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Computer's captures (white pieces eaten by computer) */}
      <div className="flex flex-wrap gap-px min-w-0 flex-1">
        {byComputer.length === 0
          ? <span className="text-[10px] text-slate-700">—</span>
          : byComputer.map((p, i) => (
              <span key={i} className="text-base leading-none" style={{ opacity: 0.65 }}>{PIECE_SYMBOLS[p]}</span>
            ))}
      </div>

      {/* Material advantage badge */}
      <div className="flex flex-col items-center gap-0.5 shrink-0">
        <span className="text-[9px] text-slate-600 uppercase tracking-wider">יתרון</span>
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
          diff > 0 ? 'text-emerald-400 bg-emerald-400/10' :
          diff < 0 ? 'text-red-400 bg-red-400/10' :
          'text-slate-600 bg-white/5'
        }`}>
          {diff === 0 ? '=' : diff > 0 ? `+${diff}` : diff}
        </span>
      </div>

      {/* Player's captures (black pieces eaten by player) */}
      <div className="flex flex-wrap gap-px min-w-0 flex-1 justify-end">
        {byPlayer.length === 0
          ? <span className="text-[10px] text-slate-700">—</span>
          : byPlayer.map((p, i) => (
              <span key={i} className="text-base leading-none" style={{ opacity: 0.85 }}>{PIECE_SYMBOLS[p]}</span>
            ))}
      </div>
    </div>
  );
}
