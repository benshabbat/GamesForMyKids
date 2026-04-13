'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import GridCell from './GridCell';

export default function PuzzleGrid() {
  const { selectedPuzzle, difficulty, placedPieces } = usePuzzleStore();

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
        {Array.from({ length: gridSize }, (_, index) => (
          <GridCell
            key={`grid-${index}-${placedPieces[index]?.id || 'empty'}`}
            index={index}
            row={Math.floor(index / gridSide)}
            col={index % gridSide}
            piece={placedPieces[index] ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}
