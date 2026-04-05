'use client';

interface Props {
  score: number;
  lives: number;
  level: number;
}

export default function BrickScoreBar({ score, lives, level }: Props) {
  return (
    <div className="flex gap-5 mb-2 text-white text-center">
      <div>
        <p className="text-2xl font-black text-yellow-300">{score}</p>
        <p className="text-xs text-yellow-500">ניקוד</p>
      </div>
      <div>
        <p className="text-lg">{Array(lives).fill('❤️').join('')}</p>
        <p className="text-xs text-red-400">חיים</p>
      </div>
      <div>
        <p className="text-2xl font-black text-blue-300">Lv.{level}</p>
        <p className="text-xs text-blue-500">רמה</p>
      </div>
    </div>
  );
}
