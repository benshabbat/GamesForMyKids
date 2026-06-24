'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScreenTimeStore } from '@/lib/stores/screenTimeStore';

const CHECK_INTERVAL_MS = 60_000; // check every minute

function getElapsedMinutes(startMs: number | null, extended: boolean): number {
  if (!startMs) return 0;
  const extraMs = extended ? 5 * 60_000 : 0;
  return Math.floor((Date.now() - startMs + extraMs) / 60_000);
}

function getElapsedDisplay(startMs: number | null): string {
  if (!startMs) return '0 דקות';
  const mins = Math.floor((Date.now() - startMs) / 60_000);
  if (mins < 60) return `${mins} דקות`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} שעות ו-${m} דקות` : `${h} שעות`;
}

export default function ScreenTimeOverlay() {
  const router = useRouter();
  const {
    timeLimitMinutes,
    sessionStartMs,
    extended,
    ensureSessionStart,
    extend5Minutes,
    resetSession,
  } = useScreenTimeStore();

  const [expired, setExpired] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Ensure session start is recorded
  useEffect(() => {
    ensureSessionStart();
  }, [ensureSessionStart]);

  // Poll for expiry every minute
  useEffect(() => {
    if (!timeLimitMinutes || dismissed) return;

    const check = () => {
      const elapsed = getElapsedMinutes(
        useScreenTimeStore.getState().sessionStartMs,
        useScreenTimeStore.getState().extended,
      );
      if (elapsed >= timeLimitMinutes) {
        setExpired(true);
      }
    };

    check(); // immediate check on mount
    const id = setInterval(check, CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [timeLimitMinutes, dismissed]);

  if (!expired || dismissed) return null;

  const elapsedDisplay = getElapsedDisplay(sessionStartMs);

  const handleExtend = () => {
    extend5Minutes();
    setExpired(false);
    setDismissed(false);
  };

  const handleFinish = () => {
    resetSession();
    setDismissed(true);
    router.push('/');
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full mx-4">
        <div className="text-6xl mb-4 motion-safe:animate-bounce">🕐</div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">הזמן הסתיים!</h2>
        <p className="text-lg text-gray-600 mb-1">
          שיחקת <span className="font-bold text-purple-600">{elapsedDisplay}</span> היום
        </p>
        <p className="text-sm text-gray-400 mb-6">כל הכבוד על המשחק! 🎉</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-linear-to-l from-purple-500 to-indigo-600 text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]"
          >
            🏠 סיים ולדף הבית
          </button>

          {!extended && (
            <button
              onClick={handleExtend}
              className="w-full py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 active:scale-95 transition-[transform,background-color]"
            >
              ⏱️ עוד 5 דקות
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
