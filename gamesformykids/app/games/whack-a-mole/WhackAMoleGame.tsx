'use client';

import { useWhackAMoleGame } from './useWhackAMoleGame';
import WhackAMoleMenuScreen from './components/WhackAMoleMenuScreen';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import WhackHUD from './components/WhackHUD';
import WhackGrid from './components/WhackGrid';

export default function WhackAMoleGame() {
  const { phase, score, best, bgColor, startGame } = useWhackAMoleGame();

  if (phase === 'menu') return <WhackAMoleMenuScreen />;

  if (phase === 'result') return (
    <ScoreBestResultCard
      emoji="🔨"
      title="הזמן נגמר!"
      gradientClass="from-yellow-50 to-amber-100"
      buttonClass="from-amber-500 to-orange-500"
      score={score}
      best={best}
      scoreBgClass="bg-amber-50"
      scoreTextClass="text-amber-600"
      scoreLabelClass="text-amber-400"
      onRestart={startGame}
    />
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-4 select-none`} dir="rtl">
      <WhackHUD />
      <WhackGrid />
    </div>
  );
}
