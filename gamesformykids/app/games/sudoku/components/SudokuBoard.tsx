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
  onSelect: (row: number, col: number) => void;
}

export default function SudokuBoard({
  puzzle, given, size, boxRows, boxCols, selected, errorCell, onSelect,
}: Props) {
  const cellPx = size === 9 ? 36 : 48;

  return (
    <div
      dir="ltr"
      className="grid bg-gray-700 rounded-xl p-1 select-none shadow-lg"
      style={{ gridTemplateColumns: `repeat(${size}, ${cellPx}px)` }}
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

          const rightBorder = (c + 1) % boxCols === 0 && c !== size - 1;
          const bottomBorder = (r + 1) % boxRows === 0 && r !== size - 1;

          return (
            <button
              key={`${r}-${c}`}
              onClick={() => onSelect(r, c)}
              className={[
                'flex items-center justify-center font-bold transition-colors duration-150 border border-gray-300',
                isGiven ? 'bg-gray-100 text-gray-900' : 'bg-white text-blue-700',
                isSelected ? 'bg-blue-300 text-blue-900' : '',
                !isSelected && isSameValue ? 'bg-blue-100' : '',
                !isSelected && isPeer && !isSameValue ? 'bg-blue-50' : '',
                isError ? 'bg-red-300 animate-pulse' : '',
                rightBorder ? 'border-r-2 border-r-gray-700' : '',
                bottomBorder ? 'border-b-2 border-b-gray-700' : '',
                size === 9 ? 'text-lg' : 'text-2xl',
              ].join(' ')}
              style={{ width: cellPx, height: cellPx }}
            >
              {value !== 0 ? value : ''}
            </button>
          );
        }),
      )}
    </div>
  );
}
