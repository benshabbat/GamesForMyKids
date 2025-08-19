'use client';

import Image from 'next/image';
import { usePuzzleContext } from '@/contexts';
import { SIMPLE_PUZZLES, type SimplePuzzle } from '@/lib/constants/simplePuzzlesData';

interface PuzzleSelectorProps {
  // Optional overrides - if not provided, will use context defaults
  puzzles?: SimplePuzzle[];
  onPuzzleSelect?: (puzzle: SimplePuzzle) => void;
  title?: string;
  subtitle?: string;
}

export default function PuzzleSelector({ 
  puzzles, 
  onPuzzleSelect, 
  title = "🧩 פאזלים פשוטים",
  subtitle = "בחר פאזל ותתחיל לשחק!"
}: PuzzleSelectorProps) {
  const { handlePuzzleSelect } = usePuzzleContext();
  
  // Use context defaults if props not provided
  const actualPuzzles = puzzles || SIMPLE_PUZZLES;
  const actualOnPuzzleSelect = onPuzzleSelect || handlePuzzleSelect;
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'קל';
      case 'medium': return 'בינוני';
      case 'hard': return 'קשה';
      default: return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      {/* Puzzle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actualPuzzles.map((puzzle) => (
          <div
            key={puzzle.id}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform"
            style={{ borderTop: `6px solid ${puzzle.color}` }}
            onClick={() => actualOnPuzzleSelect(puzzle)}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{puzzle.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {puzzle.name}
              </h3>
              <div className="flex justify-center items-center gap-2 mb-4">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {Math.sqrt(puzzle.gridSize)}x{Math.sqrt(puzzle.gridSize)}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full text-white ${getDifficultyColor(puzzle.difficulty)}`}>
                  {getDifficultyText(puzzle.difficulty)}
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
        ))}
      </div>
    </div>
  );
}
