'use client';

import { useDinoRunnerGame } from '../useDinoRunnerGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function DinoGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useDinoRunnerGame();
  return (
    <CanvasGameOverOverlay
      emoji="😵"
      title="אוי!"
      score={score}
      scoreBgClass="bg-amber-50"
      scoreTextClass="text-amber-600"
      scoreLabelClass="text-amber-400"
      best={best}
      buttonClass="bg-gradient-to-l from-amber-500 to-orange-500"
      onRestart={onRestart}
      backdropClass="bg-black/40"
      cardClass="p-6 w-64"
      scoreSize="text-2xl"
      gridMb="mb-4"
      buttonSizeClass="py-3 text-lg"
    />
  );
}
