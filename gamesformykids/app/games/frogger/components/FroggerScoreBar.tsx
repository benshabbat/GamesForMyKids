'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  lives: number;
}

export default function FroggerScoreBar({ score, lives }: Props) {
  const heartsDisplay = (
    <div className="flex gap-1 items-center justify-center">
      {[0, 1, 2].map(i => (
        <span key={i} className={`text-xl ${i < lives ? '' : 'opacity-20'}`}>❤️</span>
      ))}
    </div>
  );

  return (
    <CanvasScoreBar
      stats={[
        { value: score,        label: "ניקוד", valueClass: "text-xl font-black text-green-300", labelClass: "text-xs text-green-600" },
        { value: heartsDisplay },
      ]}
    />
  );
}
