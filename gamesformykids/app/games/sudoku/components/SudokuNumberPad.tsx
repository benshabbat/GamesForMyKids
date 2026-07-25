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
  const hintTitle = !canPlay
    ? undefined
    : hintsLeft <= 0
      ? 'נגמרו הרמזים להיום'
      : 'ממלא את התא הנבחר במספר הנכון';

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div
        className="grid gap-2 justify-center"
        style={{ gridTemplateColumns: `repeat(${Math.min(size, 5)}, minmax(0, 1fr))` }}
      >
        {numbers.map((n) => (
          <button
            key={n}
            disabled={!canPlay}
            onClick={() => onInput(n)}
            aria-label={`מספר ${n}`}
            className="w-11 h-11 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-bold text-xl shadow transition-colors"
          >
            {n}
          </button>
        ))}
      </div>
      <button
        disabled={!canPlay || hintsLeft <= 0}
        onClick={onHint}
        title={hintTitle}
        className="bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-amber-900 font-bold px-4 py-2 rounded-xl shadow transition-colors"
        dir="rtl"
      >
        💡 רמז ({hintsLeft})
      </button>
    </div>
  );
}
