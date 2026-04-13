import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';
import { usePuzzleContext } from '@/contexts';
import PuzzleGridCell from './PuzzleGridCell';

interface PuzzleGridProps {
  title?: string;
  // Allow optional overrides for special cases
  gridSize?: number;
  pieces?: (PuzzlePiece | null)[];
  showPositionNumbers?: boolean;
  showDebugInfo?: boolean;
  // Event handlers can still be passed for customization
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragStart?: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

/**
 * Shared puzzle grid component - now uses Context for data and handlers
 */
export const PuzzleGrid: React.FC<PuzzleGridProps> = ({
  title,
  gridSize: overrideGridSize,
  pieces: overridePieces,
  showPositionNumbers: overrideShowPositionNumbers,
  showDebugInfo: overrideShowDebugInfo,
  onDragOver: customOnDragOver,
  onDrop: customOnDrop,
  onDragStart: customOnDragStart,
  onTouchStart: customOnTouchStart,
  onTouchMove: customOnTouchMove,
  onTouchEnd: customOnTouchEnd
}) => {
  const { 
    state, 
    handleDragOver,
    handleDrop,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = usePuzzleContext();
  
  // Use context values unless overridden
  const gridSize = overrideGridSize ?? (state.selectedPuzzle?.gridSize || state.difficulty);
  const pieces = overridePieces ?? state.placedPieces;
  const showPositionNumbers = overrideShowPositionNumbers ?? state.showHints;
  const showDebugInfo = overrideShowDebugInfo ?? state.showDebug;
  
  // Generate title from context if not provided
  const puzzleTitle = title || 
    (state.selectedPuzzle ? `🎯 ${state.selectedPuzzle.name}` : "🎯 לוח הפאזל");
  
  // Use custom handlers if provided, otherwise use context handlers
  const finalOnDragOver = customOnDragOver || handleDragOver;
  const finalOnDrop = customOnDrop || handleDrop;
  const finalOnDragStart = customOnDragStart || handleDragStart;
  const finalOnTouchStart = customOnTouchStart || handleTouchStart;
  const finalOnTouchMove = customOnTouchMove || handleTouchMove;
  const finalOnTouchEnd = customOnTouchEnd || handleTouchEnd;

  const gridSide = Math.sqrt(gridSize);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        {puzzleTitle}
      </h3>
      <div 
        className="grid gap-2 mx-auto bg-gray-200 p-4 rounded-lg shadow-inner"
        style={{ 
          gridTemplateColumns: `repeat(${gridSide}, 1fr)`,
          maxWidth: 'min(400px, 90vw)',
          width: '100%',
          direction: 'ltr' // Force left-to-right layout for proper grid positioning
        }}
      >
        {Array.from({ length: gridSize }, (_, index) => {
          const row = Math.floor(index / gridSide);
          const col = index % gridSide;
          const piece = pieces[index];

          return (
            <PuzzleGridCell
              key={`grid-${index}-${piece?.id || 'empty'}`}
              index={index}
              row={row}
              col={col}
              piece={piece}
              showPositionNumbers={showPositionNumbers}
              showDebugInfo={showDebugInfo}
              onDragOver={finalOnDragOver}
              onDrop={finalOnDrop}
              onDragStart={finalOnDragStart}
              onTouchStart={finalOnTouchStart}
              onTouchMove={finalOnTouchMove}
              onTouchEnd={finalOnTouchEnd}
            />
          );
        })}
      </div>
    </div>
  );
};
