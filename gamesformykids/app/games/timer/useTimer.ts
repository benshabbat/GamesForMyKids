'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export const PRESETS = [
  { label: '30 שנ׳', seconds: 30 },
  { label: '1 דקה', seconds: 60 },
  { label: '2 דק׳', seconds: 120 },
  { label: '3 דק׳', seconds: 180 },
  { label: '5 דק׳', seconds: 300 },
  { label: '10 דק׳', seconds: 600 },
];

export function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function useTimer() {
  const [total, setTotal]         = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning]     = useState(false);
  const [done, setDone]           = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => clear, [clear]);

  const start = useCallback(() => {
    if (remaining <= 0) return;
    setDone(false);
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setRunning(false);
          setDone(true);
          speakHebrew('הזמן נגמר!');
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }, [remaining]);

  const pause = useCallback(() => {
    clear();
    setRunning(false);
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setRunning(false);
    setDone(false);
    setRemaining(total);
  }, [clear, total]);

  const selectPreset = useCallback((seconds: number) => {
    clear();
    setRunning(false);
    setDone(false);
    setTotal(seconds);
    setRemaining(seconds);
  }, [clear]);

  const applyCustom = useCallback((customMin: string, customSec: string) => {
    const m = parseInt(customMin || '0', 10);
    const s = parseInt(customSec || '0', 10);
    const t = m * 60 + s;
    if (t > 0) selectPreset(t);
  }, [selectPreset]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const warning = remaining <= 10 && remaining > 0 && !done;
  const progressColor = done ? '#22c55e' : warning ? '#ef4444' : '#60a5fa';

  return {
    total, remaining, running, done,
    start, pause, reset, selectPreset, applyCustom, toggleFullscreen,
    pct, warning, progressColor,
  };
}
