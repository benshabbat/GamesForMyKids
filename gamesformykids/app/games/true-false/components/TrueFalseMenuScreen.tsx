'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';

interface Props {
  best: number;
  timePer: number;
  onStart: () => void;
}

export default function TrueFalseMenuScreen({ best, timePer, onStart }: Props) {
  return (
    <GameMenuCard
      emoji="🤔"
      title="נכון או לא נכון?"
      description="קרא את המשפט ולחץ ✅ או ❌"
      hint={`3 חיים · ${timePer} שניות לכל שאלה`}
      gradientClass="from-teal-100 to-cyan-200"
      buttonClass="from-teal-500 to-cyan-600"
      onStart={onStart}
      startLabel="✅ התחל!"
      best={best}
    />
  );
}
