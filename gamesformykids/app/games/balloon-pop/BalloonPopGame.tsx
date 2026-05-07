'use client';
import { useEffect } from 'react';
import { useBalloonPopGame } from './useBalloonPopGame';
import { stopBalloonPopGame } from './balloonPopStore';
import BalloonPopMenuScreen from './components/BalloonPopMenuScreen';
import BalloonResultScreen from './components/BalloonResultScreen';
import BalloonHUD from './components/BalloonHUD';
import BalloonGameArea from './components/BalloonGameArea';

export default function BalloonPopGame() {
  const { phase } = useBalloonPopGame();

  useEffect(() => stopBalloonPopGame, []);

  if (phase === 'menu') return <BalloonPopMenuScreen />;
  if (phase === 'result') return <BalloonResultScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      <BalloonHUD />
      <BalloonGameArea />
    </div>
  );
}
