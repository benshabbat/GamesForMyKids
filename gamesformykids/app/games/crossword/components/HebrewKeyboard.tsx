'use client';

interface Props {
  onLetter: (letter: string) => void;
  onDelete: () => void;
}

const ROWS = [
  ['פ', 'ו', 'ט', 'א', 'ר', 'ק'],
  ['ל', 'ח', 'י', 'כ', 'ע', 'ג'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ'],
  ['ת', 'צ', 'ש', 'ד', 'ף', 'ן'],
  ['ם', 'ך', 'ץ'],
];

export function HebrewKeyboard({ onLetter, onDelete }: Props) {
  return (
    <div className="flex flex-col items-center gap-1.5 mt-3" dir="rtl">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onLetter(letter)}
              className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-800 hover:bg-blue-50 hover:border-blue-400 active:scale-95 transition-all shadow-sm"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={onDelete}
        className="mt-1 px-6 h-10 bg-red-100 border-2 border-red-300 rounded-lg text-sm font-bold text-red-700 hover:bg-red-200 active:scale-95 transition-all"
      >
        ← מחק
      </button>
    </div>
  );
}
