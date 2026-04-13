// dot positions in a 3×3 grid [row, col]
const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 2], [2, 0]],
  3: [[0, 2], [1, 1], [2, 0]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]],
};

interface DieChipProps {
  face: number;
  used: boolean;
}

export function DieChip({ face, used }: DieChipProps) {
  const dots = DOT_POSITIONS[face] ?? [];
  return (
    <div className={[
      'w-11 h-11 rounded-xl border-2 p-1.5 transition-all duration-300 select-none',
      used
        ? 'bg-gray-800 border-gray-700 opacity-25 scale-90'
        : 'bg-white border-gray-200 scale-100 shadow-[0_4px_0_#111,0_2px_10px_rgba(0,0,0,0.6)]',
    ].join(' ')}>
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const hasDot = dots.some(([r, c]) => r === row && c === col);
          return (
            <div key={i} className="flex items-center justify-center">
              {hasDot && (
                <div className={`w-2 h-2 rounded-full ${used ? 'bg-gray-500' : 'bg-gray-900'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
