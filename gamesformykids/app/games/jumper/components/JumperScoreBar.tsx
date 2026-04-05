'use client';

interface Props {
  score: number;
  best: number;
}

export default function JumperScoreBar({ score, best }: Props) {
  return (
    <div className="flex gap-6 mb-2 text-center">
      <div>
        <p className="text-2xl font-black text-green-300">{score}m</p>
        <p className="text-xs text-green-600">גובה</p>
      </div>
      <div>
        <p className="text-2xl font-black text-gray-400">{best}m</p>
        <p className="text-xs text-gray-600">שיא</p>
      </div>
    </div>
  );
}
