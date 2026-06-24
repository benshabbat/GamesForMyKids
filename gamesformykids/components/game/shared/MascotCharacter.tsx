'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameSessionStore } from '@/lib/stores/gameSessionStore';

type MascotState = 'idle' | 'celebrate' | 'encourage';

const KEYFRAMES = `
@keyframes mascot-idle {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}
@keyframes mascot-celebrate {
  0%   { transform: scale(1) rotate(0deg); }
  20%  { transform: scale(1.4) rotate(-15deg); }
  40%  { transform: scale(1.4) rotate(15deg); }
  60%  { transform: scale(1.4) rotate(-10deg); }
  80%  { transform: scale(1.2) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes mascot-encourage {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-6px) rotate(-8deg); }
  30%  { transform: translateX(6px) rotate(8deg); }
  45%  { transform: translateX(-4px) rotate(-4deg); }
  60%  { transform: translateX(4px) rotate(4deg); }
  75%  { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
`;

const ANIMATION: Record<MascotState, string> = {
  idle:      'mascot-idle 2.5s ease-in-out infinite',
  celebrate: 'mascot-celebrate 0.7s ease-in-out forwards',
  encourage: 'mascot-encourage 0.6s ease-in-out forwards',
};

const BUBBLE_MESSAGES: Record<MascotState, string | null> = {
  idle:      null,
  celebrate: '🌟 כל הכבוד!',
  encourage: '💪 נסה שוב!',
};

export default function MascotCharacter() {
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const prevCelebration = useRef(false);
  const prevWrong = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function trigger(next: MascotState) {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setMascotState(next);
    setShowBubble(true);
    resetTimer.current = setTimeout(() => {
      setMascotState('idle');
      setShowBubble(false);
    }, next === 'celebrate' ? 2200 : 1800);
  }

  useEffect(() => {
    const unsub = useGameSessionStore.subscribe((state) => {
      if (state.showCelebration && !prevCelebration.current) {
        trigger('celebrate');
      }
      if (state.wrongAttempts > prevWrong.current) {
        trigger('encourage');
      }
      prevCelebration.current = state.showCelebration;
      prevWrong.current = state.wrongAttempts;
    });
    return () => {
      unsub();
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const animation = reducedMotion
    ? mascotState === 'idle'
      ? 'none'
      : undefined
    : ANIMATION[mascotState];

  const bubbleMsg = BUBBLE_MESSAGES[mascotState];

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        className="fixed bottom-24 end-3 z-40 flex flex-col items-end gap-1 pointer-events-none"
        dir="rtl"
        aria-hidden
      >
        {showBubble && bubbleMsg && (
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-gray-200 dark:border-gray-600 whitespace-nowrap animate-fade-in">
            {bubbleMsg}
          </div>
        )}
        <div
          style={{ animation, fontSize: '2.5rem', lineHeight: 1, userSelect: 'none' }}
        >
          🦉
        </div>
      </div>
    </>
  );
}
