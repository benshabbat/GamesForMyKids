'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import { useSimonStore } from '../simonStore';

interface Props { onRestart: () => void; }

export default function SimonGameOverScreen({ onRestart }: Props) {
  const { roundScore, best } = useSimonStore();
  return (
    <ScoreBestResultCard
      emoji="😵"
      title="טעית!"
      gradientClass="from-gray-800 to-gray-900"
      buttonClass="from-gray-600 to-gray-800"
      score={roundScore}
      best={best}
      scoreLabel="סיבובים"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
      shareText={`🎮 הגעתי לרצף ${roundScore} צבעים בסימון!`}
    />
  );
}
