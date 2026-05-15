'use client';

import { useBrickBreakerGame } from '../useBrickBreakerGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function BrickGameOverOverlay({ onRestart }: Props) {
  const { phase, score, best } = useBrickBreakerGame();
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
