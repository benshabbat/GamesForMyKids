'use client';

import type { CellState } from '../crosswordTypes';
import { CrosswordGrid } from './CrosswordGrid';
import { HebrewKeyboard } from './HebrewKeyboard';
import { ClueList } from './ClueList';
import type { CrosswordClue, CrosswordPuzzle } from '../data/puzzles';
import { speakHebrew } from '@/lib/utils/speech/speaker';

interface Props {
  puzzle: CrosswordPuzzle;
  grid: CellState[][];
  selectedClue: CrosswordClue | null;
  selectedCell: { row: number; col: number } | null;
  completedClues: Set<number>;
  onCellClick: (row: number, col: number) => void;
  onLetter: (letter: string) => void;
  onDelete: () => void;
  onSelectClue: (clue: CrosswordClue) => void;
  onRestart: () => void;
}

export default function CrosswordPlayScreen({
  puzzle, grid, selectedClue, selectedCell, completedClues,
  onCellClick, onLetter, onDelete, onSelectClue, onRestart,
}: Props) {
  const totalClues = puzzle.clues.length;
  const acrossClues = puzzle.clues.filter((c) => c.direction === 'across');
  const downClues = puzzle.clues.filter((c) => c.direction === 'down');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onRestart} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          ← תפריט
        </button>
        <h1 className="text-2xl font-bold text-indigo-800">תשבץ: {puzzle.title}</h1>
        <div className="text-sm font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow">
          {completedClues.size}/{totalClues}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedClues.size / totalClues) * 100}%` }}
        />
      </div>

      {/* Selected clue banner */}
      {selectedClue && (
        <div
          className="bg-white rounded-xl p-3 mb-4 shadow-md border-2 border-indigo-200 flex items-center gap-3 cursor-pointer"
          onClick={() => speakHebrew(selectedClue.clue)}
        >
          <span className="text-3xl">{selectedClue.emoji}</span>
          <div>
            <div className="text-xs text-gray-500 font-medium">
              {selectedClue.number} {selectedClue.direction === 'across' ? 'אופקי' : 'אנכי'}
            </div>
            <div className="font-bold text-gray-800">{selectedClue.clue}</div>
          </div>
          <span className="ms-auto text-2xl">🔊</span>
        </div>
      )}

      {/* Grid */}
      <div className="flex justify-center mb-4">
        <CrosswordGrid
          grid={grid}
          puzzle={puzzle}
          selectedClue={selectedClue}
          selectedCell={selectedCell}
          onCellClick={onCellClick}
        />
      </div>

      {/* Keyboard */}
      <HebrewKeyboard onLetter={onLetter} onDelete={onDelete} />

      {/* Clue lists */}
      <div className="mt-4 grid grid-cols-2 gap-3 max-w-lg mx-auto">
        <ClueList
          title="אופקי"
          clues={acrossClues}
          selectedClue={selectedClue}
          completedClues={completedClues}
          onSelectClue={onSelectClue}
        />
        <ClueList
          title="אנכי"
          clues={downClues}
          selectedClue={selectedClue}
          completedClues={completedClues}
          onSelectClue={onSelectClue}
        />
      </div>
    </div>
  );
}
