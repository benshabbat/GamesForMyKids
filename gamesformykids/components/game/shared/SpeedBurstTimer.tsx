'use client';
import { useSpeedBurst } from '@/hooks/shared/game-modes/useSpeedBurst';

interface Props {
  gameType: string;
}

export default function SpeedBurstTimer({ gameType }: Props) {
  const { timeLeft, done, personalBest, correct, total, pct, barColor, handleRestart } = useSpeedBurst(gameType);

  return (
    <>
      {/* Timer bar — fixed at top of viewport */}
      {!done && (
        <div className="fixed top-0 inset-x-0 z-40">
          <div className="flex items-center gap-2 px-3 py-1 bg-black/70 text-white text-sm font-bold">
            <span>⚡</span>
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`tabular-nums w-6 text-center ${timeLeft <= 10 ? 'text-red-400 motion-safe:animate-pulse' : ''}`}>
              {timeLeft}
            </span>
          </div>
        </div>
      )}

      {/* Result overlay */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" dir="rtl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full mx-4">
            <div className="text-5xl mb-3">⚡</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">הזמן נגמר!</h2>
            <p className="text-lg text-gray-600 mb-4">
              ענית נכון על{' '}
              <span className="font-black text-green-600 text-2xl">{correct}</span>
              {total > 0 && <span className="text-gray-500 text-base"> מתוך {total}</span>}
              {' '}שאלות ב-60 שניות
            </p>

            {correct > 0 && (
              <div className="mb-4 px-4 py-2 rounded-2xl bg-linear-to-l from-yellow-400 to-amber-500 text-white font-black text-base shadow-md">
                {correct === personalBest && correct > 0 ? '🏆 שיא מהירות חדש!' : `שיאך: ${personalBest} שאלות`}
              </div>
            )}

            <p className="text-sm text-gray-400 mb-6">
              {correct > 0 ? `${correct} תשובות נכונות לדקה` : 'נסה שוב — אתה יכול!'}
            </p>

            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-2xl bg-linear-to-l from-purple-500 to-indigo-600 text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]"
            >
              🔄 שחק שוב
            </button>
          </div>
        </div>
      )}
    </>
  );
}
