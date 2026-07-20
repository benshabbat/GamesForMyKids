'use client';

import type { CrosswordClue } from '../data/puzzles';

interface Props {
  title: string;
  clues: CrosswordClue[];
  selectedClue: CrosswordClue | null;
  completedClues: Set<number>;
  onSelectClue: (clue: CrosswordClue) => void;
}

export function ClueList({ title, clues, selectedClue, completedClues, onSelectClue }: Props) {
  return (
    <div>
      <h3 className="font-bold text-indigo-700 mb-2 text-sm">{title}</h3>
      <div className="space-y-1">
        {clues.map((c) => (
          <button
            key={c.number}
            onClick={() => onSelectClue(c)}
            className={`w-full text-right text-xs px-2 py-1.5 rounded-lg transition-colors ${
              selectedClue?.number === c.number && selectedClue.direction === c.direction
                ? 'bg-indigo-500 text-white font-bold'
                : completedClues.has(c.number)
                ? 'bg-green-100 text-green-700 line-through'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <span className="font-bold">{c.number}.</span> {c.emoji} {c.clue}
          </button>
        ))}
      </div>
    </div>
  );
}
