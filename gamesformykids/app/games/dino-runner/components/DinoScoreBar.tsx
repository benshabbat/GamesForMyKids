'use client';

interface Props {
  score: number;
  best: number;
}

export default function DinoScoreBar({ score, best }: Props) {
  return (
    <div className="flex gap-6 mb-4 text-center">
      <div>
        <p className="text-2xl font-black text-amber-700">{score}</p>
        <p className="text-xs text-amber-500">מפגש</p>
      </div>
      <div>
        <p className="text-2xl font-black text-gray-600">{best}</p>
        <p className="text-xs text-gray-400">שיא</p>
      </div>
    </div>
  );
}
