'use client';
import { useWhackAMoleStore, GAME_DURATION } from '../whackAMoleStore';
import TimerProgressBar from '@/components/game/shared/TimerProgressBar';

export default function WhackHUD() {
  const { score, timeLeft, combo } = useWhackAMoleStore();
  const pct = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="flex items-center gap-4 mb-4 w-full max-w-sm">
      <div className="text-center">
        <p className="text-2xl font-black text-amber-700">{score}</p>
        <p className="text-xs text-amber-500">ניקוד</p>
      </div>
      <div className="flex-1">
        <TimerProgressBar pct={pct} trackClass="h-4 bg-white/50 shadow-inner" />
        <p className="text-center text-xs text-amber-600 mt-0.5">{timeLeft}s</p>
      </div>
      {combo >= 3 && (
        <div className="bg-orange-400 text-white rounded-xl px-2 py-1 text-center">
          <p className="text-sm font-black">x{combo}</p>
          <p className="text-xs">קומבו!</p>
        </div>
      )}
    </div>
  );
}
