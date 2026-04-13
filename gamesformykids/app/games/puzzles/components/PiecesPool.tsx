import Image from 'next/image';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

export const PiecesPool: React.FC = () => {
  const { pieces, handleDragStart, handleTouchStart, handleTouchMove, handleTouchEnd } = usePuzzleStore();

  const availablePieces = pieces.filter(p => !p.isPlaced);
  const totalPieces = pieces.length;
  const placedOnGrid = pieces.filter(p => p.isPlaced).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">🧩 חלקי הפאזל</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {availablePieces.map((piece) => (
          <div
            key={piece.id}
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
          <p className="text-xs text-gray-500 mt-1">💡 חלקים שלא במקום הנכון נשארים על הלוח וניתנים לגרירה</p>
          <p className="text-xs text-blue-500 mt-1">📱 על מכשירים ניידים: לחץ והחזק לגרירה</p>
        </div>
      )}
    </div>
  );
};
