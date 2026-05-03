'use client';

import { useRef, useEffect } from 'react';
import { type MoveRecord } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

const RATING_BADGE: Record<string, { label: string; cls: string }> = {
  excellent: { label: '⭐', cls: 'text-yellow-300' },
  great:     { label: '💥', cls: 'text-orange-400' },
  good:      { label: '✓',  cls: 'text-emerald-400 text-[10px]' },
  castle:    { label: '🏰', cls: 'text-blue-300' },
  normal:    { label: '',   cls: '' },
};

function MoveCell({ record, isLastRow }: { record: MoveRecord | undefined; isLastRow: boolean }) {
  if (!record) return <td className="px-2 py-1.5" />;
  const badge = RATING_BADGE[record.rating];
  const isWhite = record.by === 'w';
  return (
    <td className={`px-2 py-1.5 text-xs ${
      isLastRow
        ? isWhite ? 'text-[#f0d9b5] font-semibold' : 'text-[#d4a76d] font-semibold'
        : isWhite ? 'text-slate-300' : 'text-slate-500'
    }`}>
      <span>{record.notation}</span>
      {record.gaveCheck && <span className="text-red-400 mr-0.5 text-[9px] font-bold">+</span>}
      {badge?.label && <span className={`mr-0.5 ${badge.cls}`}>{badge.label}</span>}
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

  const pairs: [MoveRecord | undefined, MoveRecord | undefined][] = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const cur = moveHistory[i];
    const nxt = moveHistory[i + 1];
    const white = cur?.by === 'w' ? cur : nxt;
    const black = cur?.by === 'b' ? cur : nxt;
    pairs.push([white, black]);
  }
  const totalPairs = pairs.length;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ background: 'rgba(10,10,18,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.025)' }}
      >
        <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">היסטוריית מהלכים</span>
        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded-md"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}
        >
          {moveHistory.length}
        </span>
      </div>

      {/* Table */}
      <div className="max-h-44 overflow-y-auto">
        <table className="w-full text-right border-collapse">
          <thead
            className="sticky top-0"
            style={{ background: 'rgba(8,8,16,0.95)' }}
          >
            <tr>
              <th className="px-2 py-1 text-[9px] text-slate-700 w-5 text-center">#</th>
              <th className="px-2 py-1 text-[9px] text-slate-600">♙ לבן</th>
              <th className="px-2 py-1 text-[9px] text-slate-600">♟ שחור</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(([white, black], i) => {
              const isLastRow = i === totalPairs - 1;
              return (
                <tr
                  key={i}
                  style={
                    isLastRow
                      ? { background: 'rgba(240,217,181,0.07)' }
                      : i % 2 === 0
                        ? { background: 'rgba(255,255,255,0.015)' }
                        : {}
                  }
                >
                  <td className="px-2 py-1.5 text-[9px] text-slate-700 text-center font-mono">{i + 1}</td>
                  <MoveCell record={white} isLastRow={isLastRow} />
                  <MoveCell record={black} isLastRow={isLastRow && !!black} />
                </tr>
              );
            })}
          </tbody>
        </table>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
