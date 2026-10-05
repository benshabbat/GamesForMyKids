'use client';
import { useShallow } from 'zustand/react/shallow';
import { useCatchFruitStore } from '../catchFruitStore';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function CatchFruitResultOverlay({ onRestart }: Props) {
  // Read the store directly — calling useCatchFruitGame() here would start a second game instance.
  const { score, best, lives } = useCatchFruitStore(useShallow(s => ({ score: s.score, best: s.best, lives: s.lives })));
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
