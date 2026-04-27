'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  onStart: () => void;
}

export default function WordBuilderMenuScreen({ onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🔤"
      title="בניית מילים"
      description="סדר את האותיות ובנה את המילה הנכונה!"
      gradientClass="from-orange-50 to-amber-100"
      buttonClass="from-orange-500 to-amber-500"
      onStart={onStart}
      startLabel="🚀 התחל!"
    />
  );
}
