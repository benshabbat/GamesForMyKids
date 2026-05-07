'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useWordScrambleGame } from '../useWordScrambleGame';

export default function WordScrambleMenuScreen() {
  const { startGame } = useWordScrambleGame();
  return (
    <GameMenuCard
      emoji="🔡"
      title="מילים מבולבלות"
      description="לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!"
      gradientClass="from-green-100 to-emerald-200"
      buttonClass="from-green-500 to-emerald-600"
      onStart={startGame}
      startLabel="🔡 התחל!"
    />
  );
}
