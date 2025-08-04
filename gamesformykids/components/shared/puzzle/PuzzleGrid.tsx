import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { PuzzlePiece } from '@/lib/utils/puzzleUtils';

interface PuzzleGridProps {
  gridSize: number;
  pieces: (PuzzlePiece | null)[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragStart?: (e: React.DragEvent, piece: PuzzlePiece) => void;
  title?: string;
  showPositionNumbers?: boolean;
  showDebugInfo?: boolean;
}

/**
 * Shared puzzle grid component
 */
export const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  gridSize,
  pieces,
  onDragOver,
  onDrop,
  onDragStart,
  title = "🎯 לוח הפאזל",
  showPositionNumbers = true,
  showDebugInfo = false
}) => {
  const gridSide = Math.sqrt(gridSize);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        {title}
      </h3>
      <div 
        className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg shadow-inner"
        style={{ 
          gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
          maxWidth: '400px',
          direction: 'ltr' // Force left-to-right layout for proper grid positioning
        }}
      >
        {Array.from({ length: gridSize }, (_, index) => {
          const row = Math.floor(index / gridSide);
          const col = index % gridSide;
          const piece = pieces[index];
          
          if (showDebugInfo) {
            console.log(`Grid slot ${index}: (${row},${col}) LEFT-TO-RIGHT - has piece: ${piece?.id || 'none'}`);
          }
          
          return (
            <div
              key={`grid-${index}-${piece?.id || 'empty'}`}
              className="aspect-square border-2 border-gray-300 rounded-lg relative overflow-hidden bg-gray-100 hover:bg-gray-50 transition-colors"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
              data-grid-index={index}
              title={piece ? `מקום ${index + 1} - תפוס` : `מקום ${index + 1} - ריק`}
            >
              {piece && (
                <>
                  <Image
                    src={piece.canvas.toDataURL()}
                    alt={`Piece ${piece.id} at ${row},${col}`}
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover cursor-grab active:cursor-grabbing ${
                      piece.isCorrect ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400'
                    }`}
                    draggable={!piece.isCorrect}
                    onDragStart={onDragStart ? (e) => onDragStart(e, piece) : undefined}
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
              )}
              {!piece && showPositionNumbers && (
                <div className="text-gray-400 text-2xl font-bold">
                  {index + 1}
                </div>
              )}
              {/* Position indicator for debugging */}
              {showDebugInfo && (
                <div className="absolute bottom-0 left-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-tr-lg font-mono">
                  {row},{col}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
