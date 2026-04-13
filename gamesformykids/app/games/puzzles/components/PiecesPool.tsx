import { PuzzlePiece } from '@/app/games/puzzles/utils/puzzleUtils';
import { usePuzzleContext } from '@/contexts';
import PieceItem from './PieceItem';

interface PiecesPoolProps {
  title?: string;
  className?: string;
  pieces?: PuzzlePiece[];
  onDragStart?: (e: React.DragEvent, piece: PuzzlePiece) => void;
  onTouchStart?: (e: React.TouchEvent, piece: PuzzlePiece) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const PiecesPool: React.FC<PiecesPoolProps> = ({
  title = "🧩 חלקי הפאזל",
  className = "",
  pieces: overridePieces,
  onDragStart: customOnDragStart,
  onTouchStart: customOnTouchStart,
  onTouchMove: customOnTouchMove,
  onTouchEnd: customOnTouchEnd
}) => {
  const {
    pieces: storePieces,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = usePuzzleContext();

  const pieces = overridePieces ?? storePieces;
  const finalOnDragStart = customOnDragStart || handleDragStart;
  const finalOnTouchStart = customOnTouchStart || handleTouchStart;
  const finalOnTouchMove = customOnTouchMove || handleTouchMove;
  const finalOnTouchEnd = customOnTouchEnd || handleTouchEnd;

  const availablePieces = pieces.filter(piece => !piece.isPlaced);
  const totalPieces = pieces.length;
  const placedOnGrid = pieces.filter(p => p.isPlaced).length;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{title}</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {availablePieces.map((piece) => (
          <PieceItem
            key={piece.id}
            piece={piece}
            onDragStart={finalOnDragStart}
            onTouchStart={finalOnTouchStart}
            onTouchMove={finalOnTouchMove}
            onTouchEnd={finalOnTouchEnd}
          />
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
          <p>נותרו {availablePieces.length} חלקים להנחה</p>
          <p className="text-xs text-gray-400 mt-1">
            ({placedOnGrid} על הלוח, {availablePieces.length} כאן, מתוך {totalPieces} סה&quot;כ)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            💡 חלקים שלא במקום הנכון נשארים על הלוח וניתנים לגרירה
          </p>
          <p className="text-xs text-blue-500 mt-1">
            📱 על מכשירים ניידים: לחץ והחזק לגרירה
          </p>
        </div>
      )}
    </div>
  );
};
