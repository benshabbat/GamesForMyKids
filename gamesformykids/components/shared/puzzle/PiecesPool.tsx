import React from 'react';
import Image from 'next/image';
import { PuzzlePiece } from '@/lib/utils/puzzleUtils';

interface PiecesPoolProps {
  pieces: PuzzlePiece[];
  onDragStart: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  title?: string;
  className?: string;
}

/**
 * Shared pieces pool component for displaying available puzzle pieces
 */
export const PiecesPool: React.FC<PiecesPoolProps> = ({
  pieces,
  onDragStart,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  title = "🧩 חלקי הפאזל",
  className = ""
}) => {
  // Show pieces that are not placed correctly (not placed at all or placed incorrectly)
  const availablePieces = pieces.filter(piece => !piece.isPlaced || (piece.isPlaced && !piece.isCorrect));
  
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {availablePieces.map((piece) => (
          <div
            key={piece.id}
            className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg touch-none"
            draggable
            onDragStart={(e) => onDragStart(e, piece)}
            onTouchStart={onTouchStart ? (e) => onTouchStart(e, piece) : undefined}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            title={`חלק ${piece.id} - בדק עמדה: ${piece.expectedPosition.row},${piece.expectedPosition.col}`}
            style={{ 
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <Image
              src={piece.canvas.toDataURL()}
              alt={`Puzzle piece ${piece.id}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover border-2 border-gray-300 hover:border-blue-400 transition-colors"
              unoptimized
            />
          </div>
        ))}
        {availablePieces.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg font-semibold">כל הכבוד! 🎉</p>
            <p>כל החלקים במקומם הנכון!</p>
          </div>
        )}
      </div>
      {availablePieces.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>נותרו {availablePieces.length} חלקים</p>
          <p className="text-xs text-gray-500 mt-1">
            💡 ניתן לגרור חלקים גם מהלוח אם הם לא במקום הנכון
          </p>
        </div>
      )}
    </div>
  );
};
