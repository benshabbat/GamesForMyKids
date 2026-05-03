'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  aiScore: number;
  playerScore: number;
}

export default function PongScoreBar({ aiScore, playerScore }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: aiScore,     label: "מחשב 🤖", valueClass: "text-3xl font-black text-red-400",   labelClass: "text-xs text-red-600" },
        { value: playerScore, label: "אתה 🎮",  valueClass: "text-3xl font-black text-green-400", labelClass: "text-xs text-green-600" },
      ]}
      gap="gap-8"
      separator={<div className="text-white/30 text-2xl font-bold self-center">:</div>}
    />
  );
}
