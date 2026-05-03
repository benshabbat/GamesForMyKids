'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  best: number;
}

export default function MeteorScoreBar({ score, best }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: score, label: "ניקוד", valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
        { value: best,  label: "שיא",   valueClass: "text-2xl font-black text-gray-400",   labelClass: "text-xs text-gray-500" },
      ]}
      className="text-white"
    />
  );
}
