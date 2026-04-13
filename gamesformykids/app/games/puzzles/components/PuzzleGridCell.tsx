import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';
import PlacedPieceContent from './PlacedPieceContent';

interface PuzzleGridCellProps {
  index: number;
  row: number;
  col: number;
  piece: PuzzlePiece | null;
  showPositionNumbers: boolean;
  showDebugInfo: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragStart?: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export default function PuzzleGridCell({
  index,
  row,
  col,
  piece,
  showPositionNumbers,
  showDebugInfo,
  onDragOver,
  onDrop,
  onDragStart,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: PuzzleGridCellProps) {
  return (
    <div
      key={`grid-${index}-${piece?.id || 'empty'}`}
      className={`puzzle-grid-cell aspect-square border-2 rounded-lg relative overflow-hidden transition-all duration-200 min-h-[60px] min-w-[60px] ${
        piece
          ? 'border-gray-300 bg-gray-100'
          : 'border-dashed border-gray-400 bg-gray-50 hover:bg-blue-50 hover:border-blue-300'
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      data-grid-index={index}
      title={piece ? `מקום ${index + 1} - תפוס` : `מקום ${index + 1} - ריק`}
      style={{
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {piece && (
        <PlacedPieceContent
          piece={piece}
          row={row}
          col={col}
          onDragStart={onDragStart}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      )}
      {!piece && showPositionNumbers && (
        <div className="text-gray-400 text-2xl font-bold">
          {index + 1}
        </div>
      )}
      {showDebugInfo && (
        <div className="absolute bottom-0 left-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-tr-lg font-mono">
          {row},{col}
        </div>
      )}
    </div>
  );
}
