'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  best: number;
}

export default function DinoScoreBar({ score, best }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: score, label: "מפגש", valueClass: "text-2xl font-black text-amber-700", labelClass: "text-xs text-amber-500" },
        { value: best,  label: "שיא",  valueClass: "text-2xl font-black text-gray-600",  labelClass: "text-xs text-gray-400" },
      ]}
      mb="mb-4"
    />
  );
}
