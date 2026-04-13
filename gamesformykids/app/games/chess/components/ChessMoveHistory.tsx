'use client';

import { useRef, useEffect } from 'react';
import { type MoveRecord } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

const RATING_BADGE: Record<string, { label: string; cls: string }> = {
  excellent: { label: '⭐', cls: 'text-yellow-300 font-bold' },
  great:     { label: '💥', cls: 'text-orange-400 font-bold' },
  good:      { label: '✓',  cls: 'text-emerald-400' },
  castle:    { label: '🏰', cls: 'text-blue-300' },
  normal:    { label: '·',  cls: 'text-slate-600' },
};

function MoveCell({ record }: { record: MoveRecord | undefined }) {
  if (!record) return <td className="px-2 py-1" />;
  const badge = RATING_BADGE[record.rating];
  const isWhite = record.by === 'w';
  return (
    <td className={`px-2 py-1 text-xs ${isWhite ? 'text-slate-200' : 'text-slate-400'}`}>
      <span className="font-mono">{record.notation}</span>
      {record.gaveCheck && <span className="text-red-400 ml-1 text-[10px]">שח</span>}
      <span className={`ml-1 ${badge.cls}`}>{badge.label}</span>
    </td>
  );
}

export default function ChessMoveHistory() {
  const { moveHistory } = useChessStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [moveHistory.length]);

  if (moveHistory.length === 0) return null;

  // Group into pairs [white, black]
  const pairs: [MoveRecord, MoveRecord | undefined][] = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const white = moveHistory[i].by === 'w' ? moveHistory[i] : moveHistory[i + 1];
    const black = moveHistory[i].by === 'b' ? moveHistory[i] : moveHistory[i + 1];
    pairs.push([white, black]);
  }

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
        <span className="text-[10px] text-slate-400 font-semibold tracking-wide">היסטוריית מהלכים</span>
        <span className="text-[10px] text-slate-600">{Math.ceil(moveHistory.length / 2)} מהלכים</span>
      </div>
      <div className="max-h-36 overflow-y-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-2 py-1 text-[9px] text-slate-600 w-6">#</th>
              <th className="px-2 py-1 text-[9px] text-slate-500">לבן ♙</th>
              <th className="px-2 py-1 text-[9px] text-slate-500">שחור ♟</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(([white, black], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                <td className="px-2 py-1 text-[9px] text-slate-600">{i + 1}</td>
                <MoveCell record={white} />
                <MoveCell record={black} />
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
