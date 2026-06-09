'use client';
import { useOnlineStatus } from '@/hooks/shared/app/useOnlineStatus';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

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
