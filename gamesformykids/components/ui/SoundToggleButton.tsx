'use client';

import { useEffect, useState } from 'react';
import { setUserMuted } from '@/lib/utils/speech/enhancedSpeechUtils';

const STORAGE_KEY = 'sound_muted';

export default function SoundToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) === 'true';
    if (saved) {
      setMuted(true);
      setUserMuted(true);
    }
  }, []);

  // Render nothing on the server and on first paint to avoid hydration mismatch
  // (mute state can only be read from localStorage after mount).
  if (!mounted) return null;

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setUserMuted(newMuted);
    localStorage.setItem(STORAGE_KEY, String(newMuted));
    if (newMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'הפעל קול' : 'השתק'}
      title={muted ? 'הפעל קול' : 'השתק'}
      className="fixed bottom-4 start-4 z-50 flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
    >
      {muted ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
