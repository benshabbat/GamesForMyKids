'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { StatCell, StatGrid } from '@/components/game/shared/StatGrid';
import { useWordScrambleStore } from '../wordScrambleStore';

export default function WordScrambleResultScreen() {
  const { score, lives, startGame: onRestart } = useWordScrambleStore();
  const emoji = score >= 100 ? '🏆' : score >= 60 ? '🎉' : '😊';
  const title = score >= 100 ? 'מדהים!' : score >= 60 ? 'כל הכבוד!' : 'ניסיון טוב!';
  return (
    <GameResultCard
      emoji={emoji}
      title={title}
      gradientClass="from-green-100 to-emerald-200"
      buttonClass="from-green-500 to-emerald-600"
      onRestart={onRestart}
      restartLabel="🔄 שחק שוב"
      shareText={`📝 קיבלתי ${score} נקודות בחילופי מילים!`}
    >
      <StatGrid>
        <StatCell label="ניקוד" value={score} bgClass="bg-green-50" textClass="text-green-600" labelClass="text-green-400" />
        <StatCell label="טעויות" value={3 - lives} bgClass="bg-red-50" textClass="text-red-500" labelClass="text-red-400" />
      </StatGrid>
    </GameResultCard>
  );
}
