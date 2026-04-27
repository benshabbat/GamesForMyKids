'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  bgColor: string;
  best: number;
  onStart: () => void;
}

export default function WhackMenuScreen({ best, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🐹"
      title="חבט על החפרפרת!"
      description="הקש על החפרפרות לפני שהן נעלמות · הימנע מהפצצות 💣"
      gradientClass="from-yellow-50 to-amber-100"
      buttonClass="from-amber-500 to-orange-500"
      onStart={onStart}
      startLabel="🔨 התחל!"
      best={best}
      animateEmoji
    />
  );
}
