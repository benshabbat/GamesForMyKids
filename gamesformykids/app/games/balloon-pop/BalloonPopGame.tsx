'use client';
import { useEffect } from 'react';
import { useBalloonPopStore, stopBalloonPopGame } from './balloonPopStore';
import BalloonMenuScreen from './components/BalloonMenuScreen';
import BalloonResultScreen from './components/BalloonResultScreen';
import BalloonHUD from './components/BalloonHUD';
import BalloonGameArea from './components/BalloonGameArea';

export default function BalloonPopGame() {
  const phase = useBalloonPopStore(s => s.phase);

  useEffect(() => stopBalloonPopGame, []);

  if (phase === 'menu')   return <BalloonMenuScreen />;
  if (phase === 'result') return <BalloonResultScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      <BalloonHUD />
      <BalloonGameArea />
    </div>
  );
}
