'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const PRESETS = [
  { label: '30 שנ׳', seconds: 30 },
  { label: '1 דקה', seconds: 60 },
  { label: '2 דק׳', seconds: 120 },
  { label: '3 דק׳', seconds: 180 },
  { label: '5 דק׳', seconds: 300 },
  { label: '10 דק׳', seconds: 600 },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function TimerClient() {
  const [total, setTotal] = useState(60);
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [customMin, setCustomMin] = useState('');
  const [customSec, setCustomSec] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    return clear;
  }, [clear]);

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
    setCustomMin('');
    setCustomSec('');
  }, [clear]);

  const applyCustom = useCallback(() => {
    const m = parseInt(customMin || '0', 10);
    const s = parseInt(customSec || '0', 10);
    const t = m * 60 + s;
    if (t > 0) selectPreset(t);
  }, [customMin, customSec, selectPreset]);

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-8"
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)' }}
      dir="rtl"
    >
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">⏱️ טיימר כיתתי</h1>
        <p className="text-blue-200 mt-1 text-sm">לפעילויות, מבחנים ומשחקים בכיתה</p>
      </div>

      {/* Circular progress */}
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke={progressColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
            className={warning ? 'motion-safe:animate-pulse' : ''}
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <span className="text-6xl motion-safe:animate-bounce">🎉</span>
          ) : (
            <span
              className={`text-5xl font-black tabular-nums ${warning ? 'text-red-400 motion-safe:animate-pulse' : 'text-white'}`}
            >
              {formatTime(remaining)}
            </span>
          )}
        </div>
      </div>

      {done && (
        <div className="text-center animate-fade-in-up">
          <p className="text-2xl font-black text-green-400">הזמן נגמר! 🎊</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        {!running ? (
          <button
            onClick={start}
            disabled={remaining === 0}
            className="px-8 py-3 rounded-2xl bg-green-500 hover:bg-green-400 active:scale-95 transition-transform text-white font-black text-lg disabled:opacity-40"
          >
            ▶ התחל
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-8 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-transform text-white font-black text-lg"
          >
            ❙❙ עצור
          </button>
        )}
        <button
          onClick={reset}
          className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 transition-transform text-white font-bold text-lg"
        >
          🔄 אפס
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 transition-transform text-white font-bold text-lg"
          title="מסך מלא"
        >
          ⛶
        </button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {PRESETS.map(({ label, seconds }) => (
          <button
            key={seconds}
            onClick={() => selectPreset(seconds)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-[transform,background-color] active:scale-95 ${
              total === seconds && !customMin && !customSec
                ? 'bg-white text-indigo-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom time input */}
      <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-3" dir="ltr">
        <input
          type="number"
          min={0}
          max={99}
          placeholder="דק׳"
          value={customMin}
          onChange={(e) => setCustomMin(e.target.value)}
          className="w-14 text-center bg-white/20 text-white font-bold rounded-xl px-2 py-1.5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <span className="text-white font-black text-xl">:</span>
        <input
          type="number"
          min={0}
          max={59}
          placeholder="שנ׳"
          value={customSec}
          onChange={(e) => setCustomSec(e.target.value)}
          className="w-14 text-center bg-white/20 text-white font-bold rounded-xl px-2 py-1.5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          onClick={applyCustom}
          className="px-3 py-1.5 bg-blue-400 hover:bg-blue-300 active:scale-95 transition-transform text-white font-bold rounded-xl text-sm"
        >
          הגדר
        </button>
      </div>
    </div>
  );
}
