'use client';
import { useReflexGame } from '../useReflexGame';
import { GAME_DURATION } from '../data/targets';
import TimerProgressBar from '@/components/game/shared/TimerProgressBar';

export default function ReflexPlayScreen() {
  const { score, timeLeft, targets, hitTarget } = useReflexGame();
  const timePct = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 select-none" dir="rtl">
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center gap-3 z-10">
        <TimerProgressBar pct={timePct} trackClass="flex-1 h-3 bg-white/20" />
        <span className="text-white font-bold shrink-0">⏱️ {timeLeft}</span>
        <span className="text-yellow-300 font-bold shrink-0">⭐ {score}</span>
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        {targets.map(t => (
          <button
            key={t.id}
            onClick={() => hitTarget(t.id)}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            className="absolute text-5xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-90 transition-transform animate-pulse drop-shadow-lg"
          >
            {t.emoji}
          </button>
        ))}
        {targets.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-white/40 text-xl">
            מחכה לסמלים...
          </p>
        )}
      </div>
    </div>
  );
}
