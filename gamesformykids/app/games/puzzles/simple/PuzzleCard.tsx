'use client';

import Image from 'next/image';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';
import type { SimplePuzzle } from '../constants/simplePuzzlesData';

const DIFFICULTY_TEXT: Record<string, string> = { easy: 'קל', medium: 'בינוני', hard: 'קשה' };
const DIFFICULTY_COLOR: Record<string, string> = { easy: 'bg-green-500', medium: 'bg-yellow-500', hard: 'bg-red-500' };

export default function PuzzleCard({ puzzle }: { puzzle: SimplePuzzle }) {
  const { handlePuzzleSelect } = usePuzzleStore();
  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform"
      style={{ borderTop: `6px solid ${puzzle.color}` }}
      onClick={() => handlePuzzleSelect(puzzle)}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">{puzzle.emoji}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{puzzle.name}</h3>
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)}
          </span>
          <span className={`text-sm px-3 py-1 rounded-full text-white ${DIFFICULTY_COLOR[puzzle.difficulty] ?? 'bg-gray-500'}`}>
            {DIFFICULTY_TEXT[puzzle.difficulty] ?? puzzle.difficulty}
          </span>
        </div>
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={puzzle.imageUrl}
            alt={puzzle.name}
            width={200}
            height={200}
            className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
          התחל לשחק
        </button>
      </div>
    </div>
  );
}
