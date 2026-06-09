'use client';

import { useState, useEffect } from 'react';
import { setUserMuted } from '@/lib/utils/speech/enhancedSpeechUtils';

const STORAGE_KEY = 'sound_muted';

export function useSoundToggle() {
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

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setUserMuted(newMuted);
    localStorage.setItem(STORAGE_KEY, String(newMuted));
    if (newMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return { mounted, muted, toggle };
}
