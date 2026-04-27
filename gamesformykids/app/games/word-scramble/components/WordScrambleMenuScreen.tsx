'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  onStart: () => void;
}

export default function WordScrambleMenuScreen({ onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🔡"
      title="מילים מבולבלות"
      description="לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!"
      gradientClass="from-green-100 to-emerald-200"
      buttonClass="from-green-500 to-emerald-600"
      onStart={onStart}
      startLabel="🔡 התחל!"
    />
  );
}
