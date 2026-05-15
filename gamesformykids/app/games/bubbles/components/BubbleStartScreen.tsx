'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface BubbleStartScreenProps {
  startGame: () => void;
}

export default function BubbleStartScreen({ startGame }: BubbleStartScreenProps) {
  return (
    <GameMenuCard
      emoji="🫧"
      title="משחק הבועות"
      description="לחצו על הבועות כשהן מופיעות על המסך!"
      gradientClass="from-sky-200 via-blue-200 to-cyan-200"
      buttonClass="from-purple-500 to-pink-500"
      startLabel="🚀 התחל משחק"
      onStart={startGame}
    />
  );
}
