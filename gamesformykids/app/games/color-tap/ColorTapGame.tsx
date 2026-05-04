'use client';
import { useColorTapGame } from './useColorTapGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import ColorTapPlayArea from './components/ColorTapPlayArea';

export default function ColorTapGame() {
  const { phase, score, best, startGame } = useColorTapGame();

  if (phase === 'menu') return (
    <GameMenuCard
      emoji="🎨"
      title="צבע נכון"
      description="בחר את הצבע הנכון לפני שהזמן נגמר!"
      hint="3 חיים · 5 שניות לכל שאלה"
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      onStart={startGame}
      startLabel="🎨 התחל!"
      best={best}
    />
  );
  if (phase === 'dead') return (
    <ScoreBestResultCard
      emoji="😢"
      title="נגמרו החיים!"
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      score={score}
      best={best}
      scoreBgClass="bg-pink-50"
      scoreTextClass="text-pink-600"
      scoreLabelClass="text-pink-400"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
    />
  );
  return <ColorTapPlayArea />;
}
