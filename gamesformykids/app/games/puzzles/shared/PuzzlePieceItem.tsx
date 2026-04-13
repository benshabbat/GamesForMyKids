'use client';

import Image from 'next/image';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import type { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';

export default function PuzzlePieceItem({ piece }: { piece: PuzzlePiece }) {
  const { handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd } = usePuzzleStore();
  return (
    <div
      className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg touch-none min-w-[80px] min-h-[80px]"
      draggable
      onDragStart={(e) => handleDragStart(e, piece)}
      onTouchStart={(e) => handleTouchStart(e, piece)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      title={`חלק ${piece.id} - מיועד לעמדה: ${piece.expectedPosition.row},${piece.expectedPosition.col}`}
      style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', WebkitTapHighlightColor: 'transparent' }}
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
