'use client';

import { useState, useEffect } from 'react';
import { setUserMuted } from '@/lib/utils/speech/enhancedSpeechUtils';
import { safeGetItem, safeSetItem } from '@/lib/utils/safeStorage';

const STORAGE_KEY = 'sound_muted';

export function useSoundToggle() {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = safeGetItem(STORAGE_KEY) === 'true';
    if (saved) {
      setMuted(true);
      setUserMuted(true);
    }
  }, []);

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setUserMuted(newMuted);
    safeSetItem(STORAGE_KEY, String(newMuted));
    if (newMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return { mounted, muted, toggle };
}
