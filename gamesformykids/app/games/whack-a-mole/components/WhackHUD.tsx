'use client';

interface Props {
  score: number;
  timeLeft: number;
  pct: number;
  combo: number;
}

export default function WhackHUD({ score, timeLeft, pct, combo }: Props) {
  return (
    <div className="flex items-center gap-4 mb-4 w-full max-w-sm">
      <div className="text-center">
        <p className="text-2xl font-black text-amber-700">{score}</p>
        <p className="text-xs text-amber-500">ניקוד</p>
      </div>
      <div className="flex-1">
        <div className="h-4 bg-white/50 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-center text-xs text-amber-600 mt-0.5">{timeLeft}s</p>
      </div>
      {combo >= 3 && (
        <div className="bg-orange-400 text-white rounded-xl px-2 py-1 text-center">
          <p className="text-sm font-black">x{combo}</p>
          <p className="text-xs">קומבו!</p>
        </div>
      )}
    </div>
  );
}
