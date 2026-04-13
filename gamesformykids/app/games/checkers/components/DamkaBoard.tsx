'use client';

import type { Board, Pos, DamkaMove } from '../useDamkaGame';

const isDark = (r: number, c: number) => (r + c) % 2 === 1;

interface DamkaBoardProps {
  board: Board;
  selected: Pos | null;
  validMoves: DamkaMove[];
  onCellClick: (pos: Pos) => void;
}

export default function DamkaBoard({ board, selected, validMoves, onCellClick }: DamkaBoardProps) {
  const validDests   = new Set(validMoves.map(m => `${m.to.row},${m.to.col}`));
  const captureDests = new Set(validMoves.filter(m => m.captures.length > 0).map(m => `${m.to.row},${m.to.col}`));

  return (
    <div className="border-4 border-amber-700 rounded-xl overflow-hidden shadow-2xl">
      {board.map((row, r) => (
        <div key={r} className="flex">
          {row.map((cell, c) => {
            const key     = `${r},${c}`;
            const isLight = !isDark(r, c);
            const isSel   = selected?.row === r && selected?.col === c;
            const isValid = validDests.has(key);
            const isCapture = captureDests.has(key);

            let bg = isLight ? 'bg-amber-100' : 'bg-amber-800';
            if (isSel)       bg = 'bg-yellow-400';
            else if (isCapture) bg = 'bg-red-500/70';
            else if (isValid)   bg = 'bg-green-500/70';

            return (
              <div
                key={c}
                onClick={() => onCellClick({ row: r, col: c })}
                className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer ${bg} transition-colors`}
              >
                {cell.color && (
                  <div className={[
                    'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2',
                    cell.color === 'player'
                      ? 'bg-red-500 border-red-300 text-white'
                      : 'bg-gray-100 border-gray-400 text-gray-800',
                    isSel ? 'ring-4 ring-yellow-300 scale-110' : '',
                  ].join(' ')}>
                    {cell.isKing ? '♔' : ''}
                  </div>
                )}
                {isValid && !cell.color && (
                  <div className={`w-3 h-3 rounded-full ${isCapture ? 'bg-red-400' : 'bg-green-400'} opacity-80`} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
