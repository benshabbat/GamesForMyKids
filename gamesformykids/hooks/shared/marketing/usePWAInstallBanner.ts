'use client';
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'gfk_pwa_dismissed';
const VISIT_KEY = 'gfk_visit_count';
const MIN_VISITS = 3;

export function usePWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const count = parseInt(localStorage.getItem(VISIT_KEY) ?? '0', 10) + 1;
    localStorage.setItem(VISIT_KEY, String(count));
    if (count < MIN_VISITS) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') dismiss();
    else setDeferredPrompt(null);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  return { visible, install, dismiss };
}
