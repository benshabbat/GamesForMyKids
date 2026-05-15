'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import { useSimonStore } from '../simonStore';

export default function SimonGameOverScreen() {
  const { roundScore, best, startGame } = useSimonStore();
  return (
    <ScoreBestResultCard
      emoji="😵"
      title="טעית!"
      gradientClass="from-gray-800 to-gray-900"
      buttonClass="from-gray-600 to-gray-800"
      score={roundScore}
      best={best}
      scoreLabel="סיבובים"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
      shareText={`🎮 הגעתי לרצף ${roundScore} צבעים בסימון!`}
    />
  );
}
