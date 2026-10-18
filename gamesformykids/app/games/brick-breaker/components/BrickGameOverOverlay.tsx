'use client';

import { useShallow } from 'zustand/react/shallow';
import { useBrickBreakerStore } from '../brickBreakerStore';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function BrickGameOverOverlay({ onRestart }: Props) {
  // Read the store directly: calling useBrickBreakerGame() here would spin up a second
  // game instance (own state, own Space listener, own _nextLevelRef registration).
  const { phase, score, best } = useBrickBreakerStore(useShallow(s => ({ phase: s.phase, score: s.score, best: s.best })));
  return (
    <CanvasGameOverOverlay
      emoji={phase === 'won' ? '🏆' : '💔'}
      title={phase === 'won' ? 'ניצחת! מדהים!' : 'נגמרו החיים!'}
      score={score}
      scoreBgClass="bg-purple-50"
      scoreTextClass="text-purple-600"
      scoreLabelClass="text-purple-400"
      best={best}
      buttonClass="bg-gradient-to-l from-purple-500 to-indigo-600"
      onRestart={onRestart}
    />
  );
}
