'use client';
import type { CellPos } from '../sudokuStore';
import type { SudokuGrid } from '../sudokuLogic';

interface Props {
  puzzle: SudokuGrid;
  given: boolean[][];
  size: number;
  boxRows: number;
  boxCols: number;
  selected: CellPos | null;
  errorCell: CellPos | null;
  lockedCell: CellPos | null;
  onSelect: (row: number, col: number) => void;
}

export default function SudokuBoard({
  puzzle, given, size, boxRows, boxCols, selected, errorCell, lockedCell, onSelect,
}: Props) {
  // clamp() keeps cells at a real touch-target size (44px+) on tablets/desktop
  // while still fitting a 9-wide board on a narrow phone screen.
  const cellSize = size === 9 ? 'clamp(38px, 9vw, 50px)' : 'clamp(46px, 13vw, 62px)';

  return (
    <div
      dir="ltr"
      className="grid bg-gray-700 rounded-xl p-1 select-none shadow-lg"
      style={{ gridTemplateColumns: `repeat(${size}, ${cellSize})` }}
    >
      {puzzle.map((row, r) =>
        row.map((value, c) => {
          const isGiven = given[r]?.[c] ?? false;
          const isSelected = selected?.row === r && selected?.col === c;
          const isPeer =
            !!selected &&
            !isSelected &&
            (selected.row === r ||
              selected.col === c ||
              (Math.floor(selected.row / boxRows) === Math.floor(r / boxRows) &&
                Math.floor(selected.col / boxCols) === Math.floor(c / boxCols)));
          const isSameValue =
            !!selected && value !== 0 && puzzle[selected.row]?.[selected.col] === value;
          const isError = errorCell?.row === r && errorCell?.col === c;
          const isLocked = lockedCell?.row === r && lockedCell?.col === c;

          const rightBorder = (c + 1) % boxCols === 0 && c !== size - 1;
          const bottomBorder = (r + 1) % boxRows === 0 && r !== size - 1;

          return (
            <button
              key={`${r}-${c}`}
              onClick={() => onSelect(r, c)}
              aria-label={`שורה ${r + 1}, עמודה ${c + 1}${value !== 0 ? `, ${value}` : ''}`}
              className={[
                'flex items-center justify-center font-bold transition-colors duration-150 border border-gray-300',
                isGiven ? 'bg-gray-100 text-gray-900' : 'bg-white text-blue-700',
                isSelected ? 'bg-blue-400 text-white ring-2 ring-inset ring-blue-700' : '',
                !isSelected && isSameValue ? 'bg-blue-200' : '',
                !isSelected && isPeer && !isSameValue ? 'bg-blue-50' : '',
                isError ? 'bg-red-300 animate-pulse' : '',
                isLocked && !isError ? 'bg-amber-200 animate-pulse' : '',
                rightBorder ? 'border-r-2 border-r-gray-700' : '',
                bottomBorder ? 'border-b-2 border-b-gray-700' : '',
                size === 9 ? 'text-lg' : 'text-2xl',
              ].join(' ')}
              style={{ width: cellSize, height: cellSize }}
            >
              {value !== 0 ? value : ''}
            </button>
          );
        }),
      )}
    </div>
  );
}
