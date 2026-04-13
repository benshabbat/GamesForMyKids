import Image from 'next/image';
import { Star } from 'lucide-react';
import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

export const PuzzleGrid: React.FC = () => {
  const {
    selectedPuzzle, difficulty, placedPieces,
    showHints, showDebug,
    handleDragOver, handleDrop, handleDragStart,
    handleTouchStart, handleTouchMove, handleTouchEnd,
  } = usePuzzleStore();

  const gridSize = selectedPuzzle?.gridSize || difficulty;
  const gridSide = Math.sqrt(gridSize);
  const puzzleTitle = selectedPuzzle ? `🎯 ${selectedPuzzle.name}` : '🎯 לוח הפאזל';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{puzzleTitle}</h3>
      <div
        className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
          maxWidth: 'min(400px, 90vw)',
          width: '100%',
          direction: 'ltr',
        }}
      >
        {Array.from({ length: gridSize }, (_, index) => {
          const row = Math.floor(index / gridSide);
          const col = index % gridSide;
          const piece = placedPieces[index];

          return (
            <div
              key={`grid-${index}-${piece?.id || 'empty'}`}
              className={`puzzle-grid-cell aspect-square border-2 rounded-lg relative overflow-hidden transition-all duration-200 min-h-[60px] min-w-[60px] ${
                piece
                  ? 'border-gray-300 bg-gray-100'
                  : 'border-dashed border-gray-400 bg-gray-50 hover:bg-blue-50 hover:border-blue-300'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              data-grid-index={index}
              title={piece ? `מקום ${index + 1} - תפוס` : `מקום ${index + 1} - ריק`}
              style={{
                touchAction: 'manipulation',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {piece && (
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
                    onDragStart={(e) => handleDragStart(e, piece)}
                    onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(e, piece); }}
                    onTouchMove={(e) => { e.stopPropagation(); handleTouchMove(e); }}
                    onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd(e); }}
                    style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
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
              {!piece && showHints && (
                <div className="text-gray-400 text-2xl font-bold">{index + 1}</div>
              )}
              {showDebug && (
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

