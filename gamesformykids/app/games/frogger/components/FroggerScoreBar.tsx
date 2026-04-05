'use client';

interface Props {
  score: number;
  lives: number;
}

export default function FroggerScoreBar({ score, lives }: Props) {
  return (
    <div className="flex gap-6 mb-2 text-center">
      <div>
        <p className="text-xl font-black text-green-300">{score}</p>
        <p className="text-xs text-green-600">ניקוד</p>
      </div>
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map(i => (
          <span key={i} className={`text-xl ${i < lives ? '' : 'opacity-20'}`}>❤️</span>
        ))}
      </div>
    </div>
  );
}
