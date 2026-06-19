'use client';

const ROWS = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
] as const;

interface Props {
  onKey: (letter: string) => void;
  targetLetter: string;
}

export default function HebrewKeyboard({ onKey, targetLetter }: Props) {
  return (
    <div dir="rtl" className="mt-4 flex flex-col gap-1.5 items-center select-none">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1.5 justify-center flex-wrap">
          {row.map((letter) => {
            const isTarget = letter === targetLetter;
            return (
              <button
                key={letter}
                onClick={() => onKey(letter)}
                className={`
                  w-9 h-10 sm:w-10 sm:h-11 rounded-lg text-base font-bold
                  border-2 transition-all duration-100 active:scale-90
                  ${isTarget
                    ? 'bg-blue-500 border-blue-600 text-white shadow-md shadow-blue-300'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-indigo-50 hover:border-indigo-300'
                  }
                `}
                aria-label={`אות ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
