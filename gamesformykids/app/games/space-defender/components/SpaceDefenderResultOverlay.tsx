'use client';
import { useSpaceDefenderGame } from '../useSpaceDefenderGame';
import CanvasGameOverOverlay from '@/components/game/shared/CanvasGameOverOverlay';

interface Props {
  onRestart: () => void;
}

export default function SpaceDefenderResultOverlay({ onRestart }: Props) {
  const { lives, score, best } = useSpaceDefenderGame();
  const outOfLives = lives === 0;
  return (
    <CanvasGameOverOverlay
      emoji={outOfLives ? '💥' : '🎉'}
      title={outOfLives ? 'נגמרו החיים!' : 'הזמן נגמר!'}
      score={score}
      best={best}
      scoreBgClass="bg-indigo-50"
      scoreTextClass="text-indigo-600"
      scoreLabelClass="text-indigo-400"
      buttonClass="bg-gradient-to-l from-indigo-500 to-blue-600"
      onRestart={onRestart}
    />
  );
}
