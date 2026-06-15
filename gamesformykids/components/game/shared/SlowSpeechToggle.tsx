'use client';

import { useAudioSettingsStore } from '@/lib/stores/audioSettingsStore';

const NORMAL_RATE = 0.85;
const SLOW_RATE = 0.5;

export function SlowSpeechToggle() {
  const speechRate = useAudioSettingsStore((s) => s.speechRate);
  const updateSpeechRate = useAudioSettingsStore((s) => s.updateSpeechRate);

  const isSlow = speechRate <= SLOW_RATE;

  const toggle = () => updateSpeechRate(isSlow ? NORMAL_RATE : SLOW_RATE);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isSlow ? 'עבור לדיבור רגיל' : 'עבור לדיבור איטי'}
      title={isSlow ? '🏃 דיבור רגיל' : '🐢 דיבור איטי'}
      className={`px-2.5 py-2 rounded-lg shadow-lg text-sm font-bold transition-[transform,background-color] duration-200 hover:scale-105 ${
        isSlow
          ? 'bg-amber-400 text-white'
          : 'bg-white/80 text-gray-600 hover:bg-white'
      }`}
    >
      {isSlow ? '🐢' : '🏃'}
    </button>
  );
}
