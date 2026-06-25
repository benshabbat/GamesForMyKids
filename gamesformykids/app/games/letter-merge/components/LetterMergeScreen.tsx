'use client';
import { useLetterMergeStore, ALEF_BET } from '../letterMergeStore';

const LETTER_COLORS: Record<number, string> = {
  0: 'bg-blue-200 text-blue-800',
  1: 'bg-green-200 text-green-800',
  2: 'bg-yellow-200 text-yellow-800',
  3: 'bg-orange-200 text-orange-800',
  4: 'bg-red-200 text-red-800',
  5: 'bg-pink-200 text-pink-800',
  6: 'bg-purple-200 text-purple-800',
  7: 'bg-indigo-200 text-indigo-800',
  8: 'bg-teal-200 text-teal-800',
  9: 'bg-cyan-200 text-cyan-800',
  10: 'bg-lime-200 text-lime-800',
  11: 'bg-amber-200 text-amber-800',
  12: 'bg-rose-200 text-rose-800',
  13: 'bg-fuchsia-200 text-fuchsia-800',
  14: 'bg-violet-200 text-violet-800',
  15: 'bg-sky-200 text-sky-800',
  16: 'bg-emerald-200 text-emerald-800',
  17: 'bg-red-300 text-red-900',
  18: 'bg-orange-300 text-orange-900',
  19: 'bg-yellow-300 text-yellow-900',
  20: 'bg-green-300 text-green-900',
  21: 'bg-gradient-to-br from-yellow-300 to-orange-400 text-orange-900 font-black shadow-md',
};

function letterColor(letter: string): string {
  const idx = ALEF_BET.indexOf(letter);
  return LETTER_COLORS[idx] ?? 'bg-gray-200 text-gray-800';
}

export default function LetterMergeScreen() {
  const { columns, nextLetterVal, score, dropLetter } = useLetterMergeStore();

  return (
    <div className="min-h-screen flex flex-col items-center bg-linear-to-br from-blue-100 to-purple-100 p-3" dir="rtl">
      {/* Header */}
      <div className="flex justify-between w-full max-w-sm mb-3 px-1">
        <span className="text-blue-700 font-black text-lg">⭐ {score}</span>
        <span className="text-blue-500 text-sm font-bold">מזג אותיות — הגע לתָּו!</span>
      </div>

      {/* Next letter preview */}
      <div className="mb-3 flex flex-col items-center">
        <p className="text-xs text-blue-400 mb-1">הבאה:</p>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl font-black ${letterColor(nextLetterVal)}`}>
          {nextLetterVal}
        </div>
      </div>

      {/* Game board */}
      <div className="bg-white rounded-2xl p-3 shadow-lg w-full max-w-sm">
        <div className="flex gap-2 justify-center">
          {columns.map((col, colIdx) => (
            <button
              key={colIdx}
              onClick={() => dropLetter(colIdx)}
              className="flex flex-col-reverse gap-1 items-center w-14 min-h-48 bg-blue-50 rounded-xl p-1 hover:bg-blue-100 active:scale-95 transition-all"
            >
              {col.map((letter, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl font-black transition-all ${letterColor(letter)}`}
                >
                  {letter}
                </div>
              ))}
              {col.length === 0 && (
                <span className="text-blue-200 text-2xl mt-auto">↓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alef-bet progress */}
      <div className="mt-3 flex flex-wrap gap-1 justify-center max-w-sm">
        {ALEF_BET.map((l) => (
          <span key={l} className={`text-xs w-6 h-6 flex items-center justify-center rounded ${
            columns.flat().includes(l)
              ? letterColor(l)
              : 'bg-gray-100 text-gray-300'
          }`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
