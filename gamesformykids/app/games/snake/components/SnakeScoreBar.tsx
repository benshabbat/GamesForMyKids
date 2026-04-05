'use client';

interface Props {
  score: number;
  level: number;
  best: number;
}

export default function SnakeScoreBar({ score, level, best }: Props) {
  return (
    <div className="flex gap-6 mb-3 text-white text-center">
      <div>
        <p className="text-2xl font-black text-green-300">{score}</p>
        <p className="text-xs text-green-500">ניקוד</p>
      </div>
      <div>
        <p className="text-2xl font-black text-yellow-300">{level}</p>
        <p className="text-xs text-yellow-500">רמה</p>
      </div>
      <div>
        <p className="text-2xl font-black text-gray-300">{best}</p>
        <p className="text-xs text-gray-500">שיא</p>
      </div>
    </div>
  );
}
