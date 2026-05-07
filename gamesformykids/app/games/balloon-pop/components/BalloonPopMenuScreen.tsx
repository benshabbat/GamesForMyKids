'use client';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import { useBalloonPopStore } from '../balloonPopStore';

export default function BalloonPopMenuScreen() {
  const best      = useBalloonPopStore(s => s.best);
  const startGame = useBalloonPopStore(s => s.startGame);
  return (
    <GameMenuCard
      emoji="🎈"
      title="פוצץ בלונים!"
      description="הקש על בלונים לפני שהם עפים · הימנע מפצצות 💣"
      gradientClass="from-sky-200 to-blue-400"
      buttonClass="from-pink-500 to-rose-500"
      onStart={startGame}
      startLabel="🎈 התחל!"
      best={best}
    />
  );
}
