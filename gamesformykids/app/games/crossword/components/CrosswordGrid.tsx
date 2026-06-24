'use client';

import type { CellState } from '../crosswordStore';
import type { CrosswordClue, CrosswordPuzzle } from '../data/puzzles';

interface Props {
  grid: CellState[][];
  puzzle: CrosswordPuzzle;
  selectedClue: CrosswordClue | null;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

export function CrosswordGrid({ grid, puzzle, selectedClue, selectedCell, onCellClick }: Props) {
  const size = puzzle.gridSize;

  function isCellInSelectedClue(row: number, col: number) {
    if (!selectedClue) return false;
    if (selectedClue.direction === 'across') {
      return row === selectedClue.row && col >= selectedClue.col && col < selectedClue.col + selectedClue.answer.length;
    }
    return col === selectedClue.col && row >= selectedClue.row && row < selectedClue.row + selectedClue.answer.length;
  }

  return (
    <div
      className="inline-grid gap-0.5 border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-800"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      dir="ltr"
    >
      {Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, col) => {
          const cell = grid[row]?.[col];
          if (!cell) return null;

          if (cell.blocked) {
            return <div key={`${row}-${col}`} className="w-11 h-11 bg-gray-900" />;
          }

          const isActive = selectedCell?.row === row && selectedCell?.col === col;
          const isHighlighted = isCellInSelectedClue(row, col);
          const hasNumber = cell.clueNumbers.length > 0;

          let bg = 'bg-white';
          if (cell.correct === true) bg = 'bg-green-200';
          else if (cell.correct === false) bg = 'bg-red-200';
          else if (isActive) bg = 'bg-yellow-200';
          else if (isHighlighted) bg = 'bg-blue-100';

          return (
            <div
              key={`${row}-${col}`}
              className={`w-11 h-11 relative border border-gray-400 flex items-center justify-center cursor-pointer select-none ${bg} transition-colors`}
              onClick={() => onCellClick(row, col)}
            >
              {hasNumber && (
                <span className="absolute top-0.5 start-0.5 text-[9px] leading-none text-gray-600 font-bold">
                  {cell.clueNumbers[0]}
                </span>
              )}
              <span className="text-lg font-bold text-gray-900">{cell.letter}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
