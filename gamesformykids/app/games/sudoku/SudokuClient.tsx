'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSudoku } from './useSudoku';
import SudokuBoard from './components/SudokuBoard';
import SudokuNumberPad from './components/SudokuNumberPad';
import { GameTutorial } from '@/components/game/GameTutorial';
import { SIZE_CONFIGS, type Size, type Difficulty } from './sudokuLogic';

const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: 6, label: '6×6 (קליל)' },
  { value: 9, label: '9×9 (קלאסי)' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'קל' },
  { value: 'medium', label: 'בינוני' },
  { value: 'hard', label: 'קשה' },
];

const SUDOKU_TUTORIAL = [
  { emoji: '🔢', title: 'משחק הסודוקו', body: 'הלוח מחולק לשורות, עמודות וריבועים. המטרה: למלא כל תא במספר.' },
  { emoji: '🚫', title: 'בלי חזרות', body: 'בכל שורה, בכל עמודה ובכל ריבוע מודגש - כל מספר יכול להופיע פעם אחת בלבד.' },
  { emoji: '💡', title: 'תקועים? יש רמזים', body: 'בחרו תא ולחצו על מספר כדי למלא אותו. אם נתקעתם, כפתור הרמז ימלא תא בשבילכם.' },
];

function MiniBoardPreview({ size }: { size: Size }) {
  const { boxRows, boxCols } = SIZE_CONFIGS[size];
  const cells = Array.from({ length: size * size });
  return (
    <div
      className="grid gap-px bg-sky-300 rounded p-0.5 mx-auto mb-1"
      style={{ gridTemplateColumns: `repeat(${size}, 5px)` }}
    >
      {cells.map((_, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        const shade = (Math.floor(r / boxRows) + Math.floor(c / boxCols)) % 2 === 0
          ? 'bg-white'
          : 'bg-sky-100';
        return <div key={i} className={shade} style={{ width: 5, height: 5 }} />;
      })}
    </div>
  );
}

export default function SudokuClient() {
  const {
    puzzle, given, size, difficulty, boxRows, boxCols, selected, phase, mistakes, hintsLeft, errorCell, lockedCell,
    chooseSetup, selectCell, inputNumber, useHint, reset,
  } = useSudoku();

  const [pickedSize, setPickedSize] = useState<Size>(9);
  const [pickedDifficulty, setPickedDifficulty] = useState<Difficulty>('easy');

  const totalCells = size * size;
  const filledCells = puzzle.reduce((sum, row) => sum + row.filter((v) => v !== 0).length, 0);
  const progressPct = totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)' }}
    >
      <GameTutorial steps={SUDOKU_TUTORIAL} storageKey="gfk_tutorial_sudoku" />

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
                <MiniBoardPreview size={opt.value} />
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

          <Link href="/" className="mt-4 block text-sm text-sky-400 hover:text-sky-600" dir="rtl">
            ← חזרה לבית
          </Link>
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
          <div className="flex gap-3 mb-3 items-stretch">
            <Link
              href="/"
              className="flex items-center justify-center bg-white bg-opacity-80 rounded-2xl px-4 shadow text-sky-700 font-bold hover:bg-opacity-100 transition-colors"
              dir="rtl"
            >
              🏠 בית
            </Link>
            <button
              onClick={reset}
              className="flex items-center justify-center bg-white bg-opacity-80 rounded-2xl px-4 shadow text-sky-700 font-bold hover:bg-opacity-100 transition-colors"
              dir="rtl"
            >
              🔁 תפריט
            </button>
            <div className="bg-white bg-opacity-80 rounded-2xl px-5 py-2 shadow">
              <p className="text-center text-xs text-gray-500 font-medium" dir="rtl">טעויות</p>
              <p className="text-center text-2xl font-bold text-sky-700">{mistakes}</p>
            </div>
            <div className="bg-white bg-opacity-80 rounded-2xl px-5 py-2 shadow min-w-[88px]">
              <p className="text-center text-xs text-gray-500 font-medium" dir="rtl">הושלם</p>
              <p className="text-center text-2xl font-bold text-sky-700">{progressPct}%</p>
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
            lockedCell={lockedCell}
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
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => chooseSetup(size, difficulty)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2 rounded-xl transition-colors"
            >
              🔁 שוב, אותה רמה
            </button>
            <button
              onClick={reset}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded-xl transition-colors"
            >
              משחק חדש
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
