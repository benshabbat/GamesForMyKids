'use client';

import { useFlappyBirdGame } from '../useFlappyBirdGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function FlappyGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useFlappyBirdGame();
  return (
    <CanvasGameOverOverlay
      emoji="💥"
      title="נפלת!"
      score={score}
      scoreBgClass="bg-sky-50"
      scoreTextClass="text-sky-600"
      scoreLabelClass="text-sky-400"
      best={best}
      buttonClass="bg-gradient-to-l from-sky-500 to-blue-600"
      onRestart={onRestart}
      backdropClass="bg-black/40"
    />
  );
}
