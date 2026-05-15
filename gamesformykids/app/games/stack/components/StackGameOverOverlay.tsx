'use client';

import { useStackGame } from '../useStackGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function StackGameOverOverlay({ onRestart }: Props) {
  const { score, best } = useStackGame();
  return (
    <CanvasGameOverOverlay
      emoji="💔"
      title="נפל!"
      score={score}
      scoreLabel="לבנים"
      scoreBgClass="bg-blue-50"
      scoreTextClass="text-blue-600"
      scoreLabelClass="text-blue-400"
      best={best}
      buttonClass="bg-blue-600"
      onRestart={onRestart}
      backdropClass="bg-black/70"
      cardClass="p-7 w-60"
    />
  );
}
