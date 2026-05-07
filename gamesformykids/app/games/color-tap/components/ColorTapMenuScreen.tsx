'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useColorTapGame } from '../useColorTapGame';

export default function ColorTapMenuScreen() {
  const { best, startGame } = useColorTapGame();
  return (
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
}
