'use client';
import { useCandyMatch, GRID_SIZE, CANDIES } from '../useCandyMatch';

export default function CandyMatchBoard() {
  const { grid, selected, clearing, invalidSwap, busy, score, best, movesLeft, combo, selectCell } =
    useCandyMatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4 select-none">
      <div className="flex gap-8 mb-4 text-center">
        <div>
          <p className="text-2xl font-black text-pink-600">{score}</p>
          <p className="text-xs text-pink-400">ניקוד</p>
        </div>
        <div>
          <p className="text-2xl font-black text-purple-600">{movesLeft}</p>
          <p className="text-xs text-purple-400">מהלכים</p>
        </div>
        <div>
          <p className="text-2xl font-black text-fuchsia-600">{best}</p>
          <p className="text-xs text-fuchsia-400">שיא</p>
        </div>
      </div>

      <p className="mb-2 h-7 text-lg font-black text-orange-500">
        {combo > 1 ? `🔥 שרשרת x${combo}!` : ' '}
      </p>

      <div
        className="grid gap-1 sm:gap-1.5 bg-white/60 rounded-3xl p-2 sm:p-3 shadow-xl w-full max-w-md aspect-square"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        {grid.map((cell, index) => {
          const isSelected = selected === index;
          const isClearing = clearing.includes(index);
          const isInvalid = invalidSwap?.includes(index) ?? false;
          return (
            <button
              key={index}
              onClick={() => selectCell(index)}
              disabled={busy}
              aria-label={`ממתק ${CANDIES[cell.type]}`}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-xl sm:text-3xl
                bg-white shadow-md transition-all duration-200
                ${isSelected ? 'ring-4 ring-yellow-400 scale-110 z-10' : 'hover:scale-105'}
                ${isClearing ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
                ${isInvalid ? 'animate-shake ring-4 ring-red-400' : ''}
                ${busy ? 'cursor-default' : 'cursor-pointer active:scale-90'}
              `}
            >
              {CANDIES[cell.type]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
