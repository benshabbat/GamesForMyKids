'use client';

type Props = {
  revealedDigits: string[];
  puzzleCount: number;
};

export default function DoorCodePanel({ revealedDigits, puzzleCount }: Props) {
  const slots = Array.from({ length: puzzleCount }, (_, i) => revealedDigits[i] ?? null);
  const allRevealed = revealedDigits.length >= puzzleCount;

  return (
    <div className="flex flex-col items-center gap-2 bg-white/90 rounded-2xl shadow-lg px-4 py-3 border-2 border-amber-300">
      <p className="text-xs font-bold text-amber-700" dir="rtl">קוד הדלת</p>
      <div className="flex gap-2 dir-ltr">
        {slots.map((digit, i) => (
          <div
            key={i}
            className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition duration-500 ${
              digit
                ? 'border-green-400 bg-green-100 text-green-700 scale-110'
                : 'border-amber-300 bg-amber-50 text-amber-200'
            }`}
          >
            {digit ?? '?'}
          </div>
        ))}
      </div>
      {allRevealed && (
        <p className="text-xs text-green-600 font-semibold animate-pulse" dir="rtl">
          🔓 הקוד מוכן!
        </p>
      )}
      {!allRevealed && (
        <p className="text-xs text-gray-500" dir="rtl">
          {revealedDigits.length}/{puzzleCount} ספרות
        </p>
      )}
    </div>
  );
}
