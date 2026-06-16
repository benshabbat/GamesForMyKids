'use client';
import type { Level, LetterTile } from './LevelData';

type Props = {
  level: Level;
  robotPos: { row: number; col: number };
  collectedLetters: string[];
  animStep: number;
};

export default function RobotGrid({ level, robotPos, collectedLetters }: Props) {
  const { gridSize, letters, start } = level;

  const isCollected = (tile: LetterTile) => {
    const idx = letters.indexOf(tile);
    return idx < collectedLetters.length;
  };

  const isStartTile = (row: number, col: number) =>
    row === start.row && col === start.col;

  const letterAt = (row: number, col: number): LetterTile | null =>
    letters.find(t => t.row === row && t.col === col) ?? null;

  const isRobot = (row: number, col: number) =>
    robotPos.row === row && robotPos.col === col;

  const cellSize = gridSize <= 4 ? 'w-14 h-14 sm:w-16 sm:h-16 text-xl' : gridSize === 5 ? 'w-11 h-11 sm:w-14 sm:h-14 text-lg' : 'w-10 h-10 sm:w-12 sm:h-12 text-base';

  return (
    <div className="flex flex-col gap-1 items-center">
      {Array.from({ length: gridSize }, (_, row) => (
        <div key={row} className="flex gap-1">
          {Array.from({ length: gridSize }, (_, col) => {
            const tile = letterAt(row, col);
            const robot = isRobot(row, col);
            const collected = tile ? isCollected(tile) : false;
            const isStart = isStartTile(row, col) && !tile;

            return (
              <div
                key={col}
                className={`${cellSize} rounded-xl border-2 flex items-center justify-center font-bold relative transition-all duration-200 ${
                  tile
                    ? collected
                      ? 'border-gray-300 bg-gray-100 text-gray-400'
                      : 'border-amber-400 bg-amber-50 text-amber-700 shadow-md'
                    : isStart
                    ? 'border-dashed border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white/60'
                }`}
              >
                {tile && (
                  <span className={collected ? 'line-through opacity-40' : ''}>
                    {tile.letter}
                  </span>
                )}
                {robot && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce"
                    style={{ animationDuration: '0.6s' }}
                  >
                    🤖
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
