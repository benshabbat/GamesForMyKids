'use client';

interface Props {
  score: number;
  lives: number;
  timeLeft: number;
}

export default function SpaceDefenderHUD({ score, lives, timeLeft }: Props) {
  return (
    <div className="flex gap-5 mb-2 text-white text-center">
      <div>
        <p className="text-2xl font-black text-yellow-300">{score}</p>
        <p className="text-xs text-yellow-500">ניקוד</p>
      </div>
      <div>
        <p className="text-2xl font-black text-red-300">{'❤️'.repeat(Math.max(0, lives))}</p>
        <p className="text-xs text-red-400">חיים</p>
      </div>
      <div>
        <p className="text-2xl font-black text-blue-200">{timeLeft}s</p>
        <p className="text-xs text-blue-400">זמן</p>
      </div>
    </div>
  );
}
