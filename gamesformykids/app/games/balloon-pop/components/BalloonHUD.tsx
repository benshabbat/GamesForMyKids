'use client';
import { useBalloonPopGame } from '../useBalloonPopGame';
import { GAME_DURATION } from '../balloonPopStore';
import TimerProgressBar from '@/components/game/shared/TimerProgressBar';

export default function BalloonHUD() {
  const { score, lives, timeLeft } = useBalloonPopGame();
  const pct = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="flex items-center gap-4 p-4 w-full max-w-sm">
      <div className="text-center">
        <p className="text-2xl font-black text-white">{score}</p>
        <p className="text-xs text-white/70">ניקוד</p>
      </div>
      <div className="flex-1 space-y-1">
        <TimerProgressBar pct={pct} trackClass="h-3 bg-white/30" />
        <p className="text-center text-xs text-white/80">{timeLeft}s</p>
      </div>
      <div className="text-center">
        <p className="text-lg">{Array(Math.max(0, lives)).fill('❤️').join('')}</p>
        <p className="text-xs text-white/70">חיים</p>
      </div>
    </div>
  );
}
