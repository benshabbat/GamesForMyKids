import Image from 'next/image';
import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';

interface PieceItemProps {
  piece: PuzzlePiece;
  onDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export default function PieceItem({ piece, onDragStart, onTouchStart, onTouchMove, onTouchEnd }: PieceItemProps) {
  return (
    <div
      className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg touch-none min-w-[80px] min-h-[80px]"
      draggable
      onDragStart={(e) => onDragStart(e, piece)}
      onTouchStart={onTouchStart ? (e) => onTouchStart(e, piece) : undefined}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      title={`חלק ${piece.id} - מיועד לעמדה: ${piece.expectedPosition.row},${piece.expectedPosition.col}`}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Image
        src={piece.canvas.toDataURL()}
        alt={`Puzzle piece ${piece.id}`}
        width={80}
        height={80}
        className="w-20 h-20 object-cover border-2 border-gray-300 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:scale-110"
        unoptimized
      />
    </div>
  );
}
