'use client';

import { useShallow } from 'zustand/react/shallow';
import { useFroggerStore } from '../froggerStore';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function FroggerGameOverOverlay({ onRestart }: Props) {
  // Read the store directly — calling useFroggerGame() here would start a second game instance.
  const { score, best } = useFroggerStore(useShallow(s => ({ score: s.score, best: s.best })));
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
