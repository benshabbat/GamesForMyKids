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

  let bg = isLight ? 'bg-amber-100' : 'bg-amber-800';
  if (isKingInCheck) bg = 'bg-red-500';
  else if (isSelected) bg = 'bg-yellow-300';
  else if (isLastMove) bg = isLight ? 'bg-yellow-100' : 'bg-yellow-700';

  return (
    <div
      onClick={() => selectSquare({ row, col })}
      className={[
        'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer relative',
        'transition-all duration-150',
        bg,
        isKingInCheck ? 'animate-pulse' : '',
      ].join(' ')}
    >
      {piece && (
        <span className={[
          'text-3xl sm:text-4xl leading-none select-none',
          isWhite
            ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]'
            : 'text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]',
          isSelected ? 'scale-110 inline-block drop-shadow-lg' : '',
        ].join(' ')}>
          {PIECE_SYMBOLS[piece]}
        </span>
      )}
      {isValidDest && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {piece
            ? <div className="absolute inset-0 border-[3px] border-emerald-400 opacity-90" />
            : <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
          }
        </div>
      )}
    </div>
  );
}
