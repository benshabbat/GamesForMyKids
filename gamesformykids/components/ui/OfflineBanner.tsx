'use client';
import { useState, useEffect } from 'react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const off = () => setIsOffline(true);
    const on  = () => setIsOffline(false);
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => {
      window.removeEventListener('offline', off);
      window.removeEventListener('online', on);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="alert"
      dir="rtl"
      className="fixed top-0 inset-x-0 z-[9999] bg-amber-500 text-white text-center py-2 px-4 text-sm font-semibold"
    >
      📵 אין חיבור לאינטרנט — משחקים שנטענו בעבר עדיין זמינים
    </div>
  );
}
