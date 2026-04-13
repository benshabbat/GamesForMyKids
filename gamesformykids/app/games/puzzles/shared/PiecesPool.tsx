'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import PuzzlePieceItem from './PuzzlePieceItem';

export default function PiecesPool() {
  const pieces = usePuzzleStore(s => s.pieces);
  const availablePieces = pieces.filter(p => !p.isPlaced);
  const totalPieces = pieces.length;
  const placedOnGrid = pieces.filter(p => p.isPlaced).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">🧩 חלקי הפאזל</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {availablePieces.map((piece) => (
          <PuzzlePieceItem key={piece.id} piece={piece} />
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
}
