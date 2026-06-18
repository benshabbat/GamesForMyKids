'use client';
import { useState, useEffect } from 'react';
import { getLastPlayed, type LastPlayedData } from '@/lib/utils/engagement/trackGameVisit';

const DISMISS_KEY = 'gfk_dismissed_continue';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function useContinueBanner() {
  const [data, setData] = useState<LastPlayedData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const last = getLastPlayed();
    if (!last || Date.now() - last.timestamp > MAX_AGE_MS) return;
    setData(last);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  return { data, dismissed, dismiss };
}
