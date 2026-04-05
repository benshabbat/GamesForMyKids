'use client';

interface Props {
  score: number;
  best: number;
}

export default function MeteorScoreBar({ score, best }: Props) {
  return (
    <div className="flex gap-6 mb-2 text-white text-center">
      <div>
        <p className="text-2xl font-black text-yellow-300">{score}</p>
        <p className="text-xs text-yellow-500">ניקוד</p>
      </div>
      <div>
        <p className="text-2xl font-black text-gray-400">{best}</p>
        <p className="text-xs text-gray-500">שיא</p>
      </div>
    </div>
  );
}
