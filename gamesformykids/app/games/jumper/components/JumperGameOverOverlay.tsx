'use client';

import { useJumperGame } from '../useJumperGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function JumperGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useJumperGame();
  return (
    <CanvasGameOverOverlay
      emoji="😵"
      title="נפלת!"
      score={score}
      scoreSuffix="m"
      scoreLabel="גובה"
      scoreBgClass="bg-indigo-50"
      scoreTextClass="text-indigo-600"
      scoreLabelClass="text-indigo-400"
      best={best}
      bestSuffix="m"
      buttonClass="bg-indigo-600"
      onRestart={onRestart}
      backdropClass="bg-black/70"
      cardClass="p-7 w-64"
    />
  );
}
