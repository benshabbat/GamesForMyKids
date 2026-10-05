'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { StatCell, StatGrid } from '@/components/game/shared/StatGrid';
import { useNumberBubblesStore } from '../numberBubblesStore';

export default function NumberBubblesResultScreen() {
  const level     = useNumberBubblesStore((s) => s.level);
  const elapsed   = useNumberBubblesStore((s) => s.elapsed);
  const nextLevel = useNumberBubblesStore((s) => s.nextLevel);
  const startGame = useNumberBubblesStore((s) => s.startGame);

  return (
    <GameResultCard
      emoji="🎉"
      title="כל הכבוד!"
      gradientClass="from-sky-100 to-blue-200"
      buttonClass="from-sky-500 to-blue-600"
      onRestart={() => nextLevel()}
      restartLabel={`➡️ רמה ${level + 1}`}
      secondaryAction={{ label: '🔄 מחדש', onClick: startGame }}
      shareText={`🎈 הגעתי לרמה ${level} בבועות מספרים!`}
    >
      <p className="text-gray-500 mb-2">סיימת רמה {level} ב-{elapsed} שניות</p>
      <StatGrid>
        <StatCell label="רמה" value={level} bgClass="bg-sky-50" textClass="text-sky-600" labelClass="text-sky-400" />
        <StatCell label="זמן" value={`${elapsed}s`} bgClass="bg-green-50" textClass="text-green-600" labelClass="text-green-400" />
      </StatGrid>
    </GameResultCard>
  );
}
