'use client';
import { useState, useEffect, useCallback } from 'react';
import type { BaseGameItem } from '@/lib/types/core/base';

interface Props {
  items: BaseGameItem[];
  onSpeak: (name: string) => void;
  onComplete: () => void;
}

export function StudyFirstPhase({ items, onSpeak, onComplete }: Props) {
  const [idx, setIdx] = useState(0);

  const current = items[idx];

  // Speak current item on mount and on index change
  useEffect(() => {
    if (current) onSpeak(current.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // Auto-advance every 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (idx < items.length - 1) setIdx(i => i + 1);
      else onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [idx, items.length, onComplete]);

  const next = useCallback(() => {
    if (idx < items.length - 1) setIdx(i => i + 1);
    else onComplete();
  }, [idx, items.length, onComplete]);

  if (!current) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 text-center" dir="rtl">
      {/* Progress */}
      <div className="text-white/80 text-sm font-semibold">
        {idx + 1} / {items.length}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-white/20 rounded-full">
        <div
          className="h-full bg-white/70 rounded-full transition-all duration-300"
          style={{ width: `${((idx + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Item display */}
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 max-w-xs w-full flex flex-col items-center gap-4 shadow-xl">
        <span className="text-8xl">{current.emoji || '🎯'}</span>
        <p className="text-3xl font-bold text-white drop-shadow">{current.hebrew}</p>
        <button
          onClick={() => onSpeak(current.name)}
          className="text-white/70 hover:text-white text-sm underline"
          aria-label="שמע שוב"
        >
          🔊 שמע שוב
        </button>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={next}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl transition-colors"
        >
          {idx < items.length - 1 ? 'הבא ←' : '🎮 התחל משחק!'}
        </button>
        <button
          onClick={onComplete}
          className="px-4 py-3 text-white/60 hover:text-white text-sm transition-colors"
        >
          דלג →
        </button>
      </div>
    </div>
  );
}
