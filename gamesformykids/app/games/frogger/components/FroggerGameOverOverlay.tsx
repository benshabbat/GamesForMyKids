'use client';

import { useFroggerGame } from '../useFroggerGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function FroggerGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useFroggerGame();
  return (
    <CanvasGameOverOverlay
      emoji="💀"
      title="נגמרו החיים!"
      score={score}
      scoreBgClass="bg-green-50"
      scoreTextClass="text-green-600"
      scoreLabelClass="text-green-400"
      best={best}
      buttonClass="bg-green-500"
      onRestart={onRestart}
      backdropClass="bg-black/75"
    />
  );
}
