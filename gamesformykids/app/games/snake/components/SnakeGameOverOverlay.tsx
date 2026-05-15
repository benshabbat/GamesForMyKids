'use client';

import { useGameProgressStore, useGameStore } from '@/lib/stores';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function SnakeGameOverOverlay({ onRestart }: Props) {
  const score = useGameProgressStore(s => s.score);
  const best = useGameStore(s => s.highScores['snake'] ?? 0);
  return (
    <CanvasGameOverOverlay
      emoji="💀"
      title="נגמר!"
      score={score}
      scoreBgClass="bg-green-50"
      scoreTextClass="text-green-600"
      scoreLabelClass="text-green-400"
      best={best}
      buttonClass="bg-gradient-to-l from-green-500 to-emerald-600"
      onRestart={onRestart}
      backdropClass="bg-black/50"
      cardClass="p-7 w-64"
    />
  );
}
