'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useWhackAMoleGame } from '../useWhackAMoleGame';

export default function WhackAMoleMenuScreen() {
  const { best, startGame } = useWhackAMoleGame();
  return (
    <GameMenuCard
      emoji="🐹"
      title="חבט על החפרפרת!"
      description="הקש על החפרפרות לפני שהן נעלמות · הימנע מהפצצות 💣"
      gradientClass="from-yellow-50 to-amber-100"
      buttonClass="from-amber-500 to-orange-500"
      onStart={startGame}
      startLabel="🔨 התחל!"
      best={best}
      animateEmoji
    />
  );
}
