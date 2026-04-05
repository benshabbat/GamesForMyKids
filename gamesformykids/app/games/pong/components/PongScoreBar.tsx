'use client';

interface Props {
  aiScore: number;
  playerScore: number;
}

export default function PongScoreBar({ aiScore, playerScore }: Props) {
  return (
    <div className="flex gap-8 mb-2 text-center">
      <div>
        <p className="text-3xl font-black text-red-400">{aiScore}</p>
        <p className="text-xs text-red-600">מחשב 🤖</p>
      </div>
      <div className="text-white/30 text-2xl font-bold self-center">:</div>
      <div>
        <p className="text-3xl font-black text-green-400">{playerScore}</p>
        <p className="text-xs text-green-600">אתה 🎮</p>
      </div>
    </div>
  );
}
