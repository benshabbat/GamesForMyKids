'use client';
import type { Grid } from '../numberSlideStore';

const TILE_COLORS: Record<number, string> = {
  0:   'bg-gray-100 text-transparent',
  1:   'bg-gray-200 text-gray-700',
  2:   'bg-yellow-200 text-yellow-800',
  3:   'bg-orange-200 text-orange-800',
  4:   'bg-orange-300 text-orange-900',
  6:   'bg-red-300 text-red-900',
  8:   'bg-red-400 text-white',
  12:  'bg-pink-400 text-white',
  16:  'bg-green-400 text-white',
  24:  'bg-green-500 text-white',
  32:  'bg-teal-400 text-white',
  48:  'bg-teal-500 text-white',
  64:  'bg-blue-500 text-white',
  128: 'bg-blue-600 text-white',
  256: 'bg-purple-500 text-white',
};

function tileColor(v: number): string {
  return TILE_COLORS[v] ?? 'bg-purple-600 text-white';
}

function fontSize(v: number): string {
  if (v >= 100) return 'text-xl';
  if (v >= 10)  return 'text-2xl';
  return 'text-3xl';
}

interface Props {
  grid: Grid;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export default function NumberSlideBoard({ grid, onTouchStart, onTouchEnd }: Props) {
  return (
    <div
      className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-gray-300 select-none touch-none"
      style={{ width: 280, height: 280 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {grid.flat().map((value, i) => (
        <div
          key={i}
          className={`flex items-center justify-center rounded-xl font-bold transition-colors duration-150 ${tileColor(value)} ${fontSize(value)}`}
          style={{ width: 60, height: 60 }}
        >
          {value !== 0 ? value : ''}
        </div>
      ))}
    </div>
  );
}
