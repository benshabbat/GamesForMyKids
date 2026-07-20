'use client';
import { useState } from 'react';
import { useSudoku } from './useSudoku';
import SudokuBoard from './components/SudokuBoard';
import SudokuNumberPad from './components/SudokuNumberPad';
import type { Size, Difficulty } from './sudokuLogic';

const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: 6, label: '6×6 (קליל)' },
  { value: 9, label: '9×9 (קלאסי)' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'קל' },
  { value: 'medium', label: 'בינוני' },
  { value: 'hard', label: 'קשה' },
];

export default function SudokuClient() {
  const {
    puzzle, given, size, boxRows, boxCols, selected, phase, mistakes, hintsLeft, errorCell,
    chooseSetup, selectCell, inputNumber, useHint, reset,
  } = useSudoku();

  const [pickedSize, setPickedSize] = useState<Size>(9);
  const [pickedDifficulty, setPickedDifficulty] = useState<Difficulty>('easy');

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}
    >
      <h1 className="text-3xl font-bold text-sky-900 mb-1" dir="rtl">🔢 סודוקו</h1>
      <p className="text-sky-700 text-sm mb-4" dir="rtl">מלאו כל שורה, עמודה וריבוע במספרים ללא חזרות!</p>

      {phase === 'idle' && (
        <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl max-w-xs text-center">
          <p className="text-sky-800 font-bold mb-2" dir="rtl">גודל לוח</p>
          <div className="flex gap-2 justify-center mb-4">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPickedSize(opt.value)}
                className={`px-3 py-2 rounded-xl font-bold transition-colors ${
                  pickedSize === opt.value ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-sky-800 font-bold mb-2" dir="rtl">רמת קושי</p>
          <div className="flex gap-2 justify-center mb-6">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPickedDifficulty(opt.value)}
                className={`px-3 py-2 rounded-xl font-bold transition-colors ${
                  pickedDifficulty === opt.value ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => chooseSetup(pickedSize, pickedDifficulty)}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg transition-colors"
          >
            🚀 התחל משחק
          </button>
        </div>
      )}

      {phase === 'generating' && (
        <div className="mt-6 text-center bg-white bg-opacity-90 rounded-2xl p-8 shadow-xl">
          <div className="text-5xl mb-3 animate-spin">🧩</div>
          <p className="text-sky-800 font-bold" dir="rtl">בונים לוח סודוקו...</p>
        </div>
      )}

      {(phase === 'playing' || phase === 'won') && (
        <>
          <div className="flex gap-4 mb-3">
            <div className="bg-white bg-opacity-80 rounded-2xl px-5 py-2 shadow">
              <p className="text-center text-xs text-gray-500 font-medium" dir="rtl">טעויות</p>
              <p className="text-center text-2xl font-bold text-sky-700">{mistakes}</p>
            </div>
          </div>

          <SudokuBoard
            puzzle={puzzle}
            given={given}
            size={size}
            boxRows={boxRows}
            boxCols={boxCols}
            selected={selected}
            errorCell={errorCell}
            onSelect={selectCell}
          />

          <SudokuNumberPad
            size={size}
            hintsLeft={hintsLeft}
            canPlay={phase === 'playing'}
            onInput={inputNumber}
            onHint={useHint}
          />
        </>
      )}

      {phase === 'won' && (
        <div className="mt-6 text-center bg-white bg-opacity-90 rounded-2xl p-6 shadow-xl max-w-xs">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-2xl font-bold text-green-700 mb-1" dir="rtl">כל הכבוד! פתרת את הסודוקו!</p>
          <p className="text-gray-600 text-sm mb-4" dir="rtl">טעויות: {mistakes}</p>
          <button
            onClick={reset}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl transition-colors"
          >
            משחק חדש
          </button>
        </div>
      )}
    </div>
  );
}
