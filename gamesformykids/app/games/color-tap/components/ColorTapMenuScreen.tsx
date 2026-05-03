'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  best: number;
  onStart: () => void;
}

export default function ColorTapMenuScreen({ best, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🎨"
      title="צבע נכון"
      description="בחר את הצבע הנכון לפני שהזמן נגמר!"
      hint="3 חיים · 5 שניות לכל שאלה"
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      onStart={onStart}
      startLabel="🎨 התחל!"
      best={best}
    />
  );
}
