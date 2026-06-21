'use client';

interface Props {
  word: string;
  typedCount: number;
  hasError: boolean;
  wordNumber: number;
  total: number;
}

export default function TypingDisplay({ word, typedCount, hasError, wordNumber, total }: Props) {
  return (
    <div dir="rtl" className="text-center">
      {/* Progress indicator */}
      <p className="text-sm font-semibold text-indigo-500 mb-3">
        מילה {wordNumber} מתוך {total}
      </p>

      {/* Letter boxes */}
      <div className="flex justify-center gap-2 flex-wrap">
        {word.split('').map((letter, i) => {
          const isDone    = i < typedCount;
          const isCurrent = i === typedCount;
          const isError   = isCurrent && hasError;

          return (
            <div
              key={i}
              className={`
                w-12 h-14 rounded-xl border-2 flex items-center justify-center
                text-2xl font-black transition-all duration-150 select-none
                ${isDone    ? 'bg-green-100 border-green-400 text-green-700 scale-105' : ''}
                ${isCurrent && !isError ? 'bg-blue-50 border-blue-400 text-blue-800 animate-pulse' : ''}
                ${isError   ? 'bg-red-100 border-red-400 text-red-700 animate-bounce' : ''}
                ${!isDone && !isCurrent ? 'bg-gray-50 border-gray-200 text-gray-400' : ''}
              `}
            >
              {letter}
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <p className="mt-3 text-xs text-gray-400">
        לחץ על האות הבאה: <span className="font-bold text-blue-600 text-base">{word[typedCount] ?? '✅'}</span>
      </p>
    </div>
  );
}
