import Image from 'next/image';
import { Star } from 'lucide-react';
import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';

interface PlacedPieceContentProps {
  piece: PuzzlePiece;
  row: number;
  col: number;
  onDragStart?: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export default function PlacedPieceContent({
  piece,
  row,
  col,
  onDragStart,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: PlacedPieceContentProps) {
  return (
    <>
      <Image
        src={piece.canvas.toDataURL()}
        alt={`Piece ${piece.id} at ${row},${col}`}
        width={100}
        height={100}
        className={`w-full h-full object-cover cursor-grab active:cursor-grabbing transition-all duration-300 ${
          piece.isCorrect
            ? 'ring-4 ring-green-400 shadow-lg transform scale-105'
            : 'ring-2 ring-red-400 opacity-80'
        }`}
        draggable={!piece.isCorrect}
        onDragStart={onDragStart ? (e) => onDragStart(e, piece) : undefined}
        onTouchStart={onTouchStart ? (e) => { e.stopPropagation(); onTouchStart(e, piece); } : undefined}
        onTouchMove={onTouchMove ? (e) => { e.stopPropagation(); onTouchMove(e); } : undefined}
        onTouchEnd={onTouchEnd ? (e) => { e.stopPropagation(); onTouchEnd(e); } : undefined}
        style={{
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
        unoptimized
      />
      {piece.isCorrect && (
        <div className="absolute top-1 right-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
        </div>
      )}
      {!piece.isCorrect && piece.isPlaced && (
        <div className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </>
  );
}
