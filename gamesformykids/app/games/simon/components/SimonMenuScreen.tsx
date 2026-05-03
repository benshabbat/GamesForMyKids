'use client';

import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  best: number;
  onStart: () => void;
}

export default function SimonMenuScreen({ best, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🔴"
      title="שיימון אומר"
      description="צפה בסדר הצבעים וחזור עליהם בדיוק!"
      hint="כל סיבוב — עוד צבע אחד"
      gradientClass="from-gray-800 to-gray-900"
      buttonClass="from-gray-600 to-gray-800"
      onStart={onStart}
      startLabel="🔴 התחל!"
      best={best}
    />
  );
}
