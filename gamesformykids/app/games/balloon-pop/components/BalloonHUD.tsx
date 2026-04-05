'use client';

interface Props {
  score: number;
  lives: number;
  timeLeft: number;
  pct: number;
}

export default function BalloonHUD({ score, lives, timeLeft, pct }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 w-full max-w-sm">
      <div className="text-center">
        <p className="text-2xl font-black text-white">{score}</p>
        <p className="text-xs text-white/70">ניקוד</p>
      </div>
      <div className="flex-1 space-y-1">
        <div className="h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-300' : 'bg-red-400'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-center text-xs text-white/80">{timeLeft}s</p>
      </div>
      <div className="text-center">
        <p className="text-lg">{Array(Math.max(0, lives)).fill('❤️').join('')}</p>
        <p className="text-xs text-white/70">חיים</p>
      </div>
    </div>
  );
}
