'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useTrueFalseGame, TIME_PER_Q } from '../useTrueFalseGame';

export default function TrueFalseMenuScreen() {
  const { best, startGame } = useTrueFalseGame();
  return (
    <GameMenuCard
      emoji="🤔"
      title="נכון או לא נכון?"
      description="קרא את המשפט ולחץ ✅ או ❌"
      hint={`3 חיים · ${TIME_PER_Q} שניות לכל שאלה`}
      gradientClass="from-teal-100 to-cyan-200"
      buttonClass="from-teal-500 to-cyan-600"
      onStart={startGame}
      startLabel="✅ התחל!"
      best={best}
    />
  );
}
