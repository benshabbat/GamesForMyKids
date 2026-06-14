'use client';
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'gfk_pwa_dismissed';
const VISIT_KEY = 'gfk_visit_count';
const MIN_VISITS = 3;

export default function PWAInstallBanner() {
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

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:left-auto md:w-80 z-50 bg-white rounded-2xl shadow-2xl border border-purple-100 p-4 flex items-center gap-3"
      dir="rtl"
      role="banner"
    >
      <div className="text-3xl shrink-0">📱</div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-sm">הוסף לדף הבית</p>
        <p className="text-gray-500 text-xs">גישה מהירה לכל המשחקים</p>
      </div>
      <button
        onClick={install}
        className="shrink-0 px-3 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
      >
        התקן
      </button>
      <button
        onClick={dismiss}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
        aria-label="סגור"
      >
        ✕
      </button>
    </div>
  );
}
