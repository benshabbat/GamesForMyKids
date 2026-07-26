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
      // globals.css forces `direction: rtl` on every element (`* { direction: rtl }`),
      // which overrides the `dir="ltr"` attribute's implicit direction — without this
      // inline override the grid flows right-to-left and box-boundary borders (computed
      // for left-to-right column indices) land on the wrong side of each box.
      style={{ gridTemplateColumns: `repeat(${size}, ${cellSize})`, direction: 'ltr' }}
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

          // Exactly one bg/text pair wins — never mix them, or Tailwind's
          // cascade order (not class-list order) picks a winner and can
          // leave entered digits low-contrast against the selected fill.
          let bg = isGiven ? 'bg-gray-100' : 'bg-white';
          let text = isGiven ? 'text-gray-900' : 'text-blue-700';
          if (!isSelected && isSameValue) bg = 'bg-blue-200';
          if (!isSelected && isPeer && !isSameValue) bg = 'bg-blue-50';
          if (isSelected) { bg = 'bg-blue-400'; text = 'text-white'; }
          if (isLocked && !isError) bg = 'bg-amber-200';
          if (isError) bg = 'bg-red-300';

          return (
            <button
              key={`${r}-${c}`}
              onClick={() => onSelect(r, c)}
              aria-label={`שורה ${r + 1}, עמודה ${c + 1}${value !== 0 ? `, ${value}` : ''}`}
              className={[
                'flex items-center justify-center font-bold transition-colors duration-150',
                bg,
                text,
                isSelected ? 'ring-2 ring-inset ring-blue-700 z-10' : '',
                isError || (isLocked && !isError) ? 'animate-pulse' : '',
                // Each shared edge is drawn by exactly one cell (right/bottom only) so
                // adjacent 1px borders never stack into an uneven 2px line, and box
                // separators stay a clean, consistent 2px regardless of neighbors.
                c !== size - 1
                  ? rightBorder
                    ? 'border-r-2 border-r-gray-700'
                    : 'border-r border-r-gray-300'
                  : '',
                r !== size - 1
                  ? bottomBorder
                    ? 'border-b-2 border-b-gray-700'
                    : 'border-b border-b-gray-300'
                  : '',
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
