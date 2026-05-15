'use client';

import { useMeteorDodgeGame } from '../useMeteorDodgeGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function MeteorGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useMeteorDodgeGame();
  return (
    <CanvasGameOverOverlay
      emoji="💥"
      title="הוכית!"
      score={score}
      scoreBgClass="bg-violet-50"
      scoreTextClass="text-violet-600"
      scoreLabelClass="text-violet-400"
      best={best}
      buttonClass="bg-gradient-to-l from-violet-600 to-purple-700"
      onRestart={onRestart}
      backdropClass="bg-black/70"
    />
  );
}
