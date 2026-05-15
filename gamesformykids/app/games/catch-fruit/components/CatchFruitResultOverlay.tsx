'use client';
import { useCatchFruitGame } from '../useCatchFruitGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function CatchFruitResultOverlay({ onRestart }: Props) {
  const { score, best, lives } = useCatchFruitGame();
  return (
    <CanvasGameOverOverlay
      emoji={lives === 0 ? '💔' : '🎉'}
      title={lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}
      score={score}
      best={best}
      scoreBgClass="bg-purple-50"
      scoreTextClass="text-purple-600"
      scoreLabelClass="text-purple-400"
      buttonClass="bg-gradient-to-l from-purple-500 to-indigo-600"
      backdropClass="bg-black/50"
      onRestart={onRestart}
    />
  );
}
