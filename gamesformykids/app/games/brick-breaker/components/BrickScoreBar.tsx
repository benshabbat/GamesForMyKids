'use client';

import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';

interface Props {
  score: number;
  lives: number;
  level: number;
}

export default function BrickScoreBar({ score, lives, level }: Props) {
  return (
    <CanvasScoreBar
      stats={[
        { value: score,                              label: "ניקוד", valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
        { value: Array(lives).fill('❤️').join(''), label: "חיים",  valueClass: "text-lg",                             labelClass: "text-xs text-red-400" },
        { value: `Lv.${level}`,                      label: "רמה",   valueClass: "text-2xl font-black text-blue-300",   labelClass: "text-xs text-blue-500" },
      ]}
      gap="gap-5"
      className="text-white"
    />
  );
}
