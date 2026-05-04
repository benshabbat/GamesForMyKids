'use client';
import { useEffect } from 'react';
import { useBalloonPopStore, stopBalloonPopGame } from './balloonPopStore';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import BalloonResultScreen from './components/BalloonResultScreen';
import BalloonHUD from './components/BalloonHUD';
import BalloonGameArea from './components/BalloonGameArea';

export default function BalloonPopGame() {
  const phase     = useBalloonPopStore(s => s.phase);
  const best      = useBalloonPopStore(s => s.best);
  const startGame = useBalloonPopStore(s => s.startGame);

  useEffect(() => stopBalloonPopGame, []);

  if (phase === 'menu') return (
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
  if (phase === 'result') return <BalloonResultScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      <BalloonHUD />
      <BalloonGameArea />
    </div>
  );
}
