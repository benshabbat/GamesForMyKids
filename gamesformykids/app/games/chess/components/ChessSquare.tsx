'use client';

import { PIECE_SYMBOLS } from '../logic/chessTypes';
import { useChessStore } from '../store/useChessStore';

interface Props {
  row: number;
  col: number;
}

export default function ChessSquare({ row, col }: Props) {
  const { board, selected, validMoves, lastMove, phase, turn, selectSquare } = useChessStore();

  const piece = board[row]?.[col] ?? null;
  const isSelected = selected?.row === row && selected?.col === col;
  const isValidDest = validMoves.some(m => m.to.row === row && m.to.col === col);
  const isLastMove = !!lastMove && (
    (lastMove.from.row === row && lastMove.from.col === col) ||
    (lastMove.to.row === row && lastMove.to.col === col)
  );
  const isKingInCheck = phase === 'check' && piece === 'wK' && turn === 'w';
  const isLight = (row + col) % 2 === 0;
  const isWhite = piece ? piece[0] === 'w' : false;

  let bg = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
  if (isKingInCheck) bg = isLight ? 'bg-red-300' : 'bg-red-600';
  else if (isSelected) bg = isLight ? 'bg-[#f6f669]' : 'bg-[#baca2b]';
  else if (isLastMove) bg = isLight ? 'bg-[#cdd16f]' : 'bg-[#aaa23a]';

  return (
    <div
      onClick={() => selectSquare({ row, col })}
      className={[
        'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer relative',
        'transition-all duration-100',
        bg,
        !isSelected && !isKingInCheck ? 'hover:brightness-110' : '',
        isKingInCheck ? 'animate-pulse' : '',
      ].join(' ')}
    >
      {piece && (
        <span className={[
          'text-3xl sm:text-[34px] leading-none select-none transition-transform duration-100',
          isWhite
            ? 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]'
            : 'text-[#1a1a1a] drop-shadow-[0_1px_3px_rgba(255,255,255,0.5)]',
          isSelected ? 'scale-110 inline-block' : '',
        ].join(' ')}>
          {PIECE_SYMBOLS[piece]}
        </span>
      )}
      {isSelected && (
        <div className="absolute inset-0 ring-[3px] ring-inset ring-black/20 pointer-events-none" />
      )}
      {isValidDest && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {piece
            ? <div className="absolute inset-0 ring-[3px] ring-inset ring-black/40" />
            : <div className="w-[34%] h-[34%] rounded-full bg-black/18" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)' }} />
          }
        </div>
      )}
    </div>
  );
}
