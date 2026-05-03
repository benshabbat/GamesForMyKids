'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  best: number;
}

export default function JumperScoreBar({ score, best }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: `${score}m`, label: "גובה", valueClass: "text-2xl font-black text-green-300", labelClass: "text-xs text-green-600" },
        { value: `${best}m`,  label: "שיא",  valueClass: "text-2xl font-black text-gray-400",  labelClass: "text-xs text-gray-600" },
      ]}
    />
  );
}
