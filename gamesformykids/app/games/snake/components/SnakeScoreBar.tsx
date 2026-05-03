'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  level: number;
  best: number;
}

export default function SnakeScoreBar({ score, level, best }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: score, label: "ניקוד", valueClass: "text-2xl font-black text-green-300", labelClass: "text-xs text-green-500" },
        { value: level, label: "רמה",   valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
        { value: best,  label: "שיא",   valueClass: "text-2xl font-black text-gray-300",   labelClass: "text-xs text-gray-500" },
      ]}
      mb="mb-3"
      className="text-white"
    />
  );
}
