'use client';

interface Props {
  size: number;
  hintsLeft: number;
  canPlay: boolean;
  onInput: (n: number) => void;
  onHint: () => void;
}

export default function SudokuNumberPad({ size, hintsLeft, canPlay, onInput, onHint }: Props) {
  const numbers = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div className="flex gap-2 flex-wrap justify-center max-w-xs">
        {numbers.map((n) => (
          <button
            key={n}
            disabled={!canPlay}
            onClick={() => onInput(n)}
            className="w-11 h-11 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-bold text-xl shadow transition-colors"
          >
            {n}
          </button>
        ))}
      </div>
      <button
        disabled={!canPlay || hintsLeft <= 0}
        onClick={onHint}
        className="bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-amber-900 font-bold px-4 py-2 rounded-xl shadow transition-colors"
        dir="rtl"
      >
        💡 רמז ({hintsLeft})
      </button>
    </div>
  );
}
