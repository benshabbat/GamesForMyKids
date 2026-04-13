'use client';

import { PIECE_SYMBOLS } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

interface Props {
  row: number;
  col: number;
}

export default function ChessSquare({ row, col }: Props) {
  const { board, selected, validMoves, lastMove, phase, turn, selectSquare } = useChessStore();

  const piece = board[row][col];
  const isSelected = selected?.row === row && selected?.col === col;
  const isValidDest = validMoves.some(m => m.to.row === row && m.to.col === col);
  const isLastMove = !!lastMove && (
    (lastMove.from.row === row && lastMove.from.col === col) ||
    (lastMove.to.row === row && lastMove.to.col === col)
  );
  const isKingInCheck = phase === 'check' && piece === 'wK' && turn === 'w';
  const isLight = (row + col) % 2 === 0;
  const isWhite = piece ? piece[0] === 'w' : false;

  let bg = isLight ? 'bg-amber-100' : 'bg-amber-700';
  if (isKingInCheck) bg = 'bg-red-400';
  else if (isSelected) bg = 'bg-yellow-300';
  else if (isLastMove) bg = isLight ? 'bg-yellow-200' : 'bg-yellow-600';

  return (
    <div
      onClick={() => selectSquare({ row, col })}
      className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer relative ${bg} transition-colors`}
    >
      {piece && (
        <span className={[
          'text-2xl sm:text-3xl leading-none',
          isWhite
            ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
            : 'text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]',
          isSelected ? 'scale-110 inline-block' : '',
        ].join(' ')}>
          {PIECE_SYMBOLS[piece]}
        </span>
      )}
      {isValidDest && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {piece
            ? <div className="absolute inset-0 border-4 border-green-500 rounded-sm opacity-80" />
            : <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
          }
        </div>
      )}
    </div>
  );
}
