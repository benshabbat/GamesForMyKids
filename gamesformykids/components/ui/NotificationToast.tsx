'use client'

/**
 * ================================================
 * NotificationToast — Global Toast Notifications
 * ================================================
 * מרנדר הודעות Toast מה-uiStore הגלובלי.
 * הוסף פעם אחת בתוך layout.tsx, ספוג את כל האפליקציה.
 *
 * שימוש ב-layout.tsx:
 *   import NotificationToast from '@/components/ui/NotificationToast';
 *   ...
 *   <NotificationToast />
 *
 * הוספת הודעה מכל מקום:
 *   import { useUIStore } from '@/lib/stores';
 *   useUIStore.getState().addNotification('שמרת!', 'success');
 */

import { useEffect, useRef } from 'react'
import { useNotifications, useUIStore } from '@/lib/stores'
import type { Notification, NotificationType } from '@/lib/stores'

// ── Style helpers ──────────────────────────────────────────
const typeStyles: Record<NotificationType, { bg: string; icon: string }> = {
  success: { bg: 'bg-green-500',  icon: '✓' },
  error:   { bg: 'bg-red-500',    icon: '✕' },
  warning: { bg: 'bg-yellow-500', icon: '⚠' },
  info:    { bg: 'bg-blue-500',   icon: 'ℹ' },
}

function Toast({ notif }: { notif: Notification }) {
  const remove = useUIStore((s) => s.removeNotification)
  const barRef = useRef<HTMLDivElement>(null)
  const { bg, icon } = typeStyles[notif.type]

  // Animate the progress bar countdown
  useEffect(() => {
    if (!barRef.current || notif.duration <= 0) return
    const el = barRef.current
    el.style.transition = 'none'
    el.style.width = '100%'
    // Force reflow so the transition starts correctly
    void el.offsetWidth
    el.style.transition = `width ${notif.duration}ms linear`
    el.style.width = '0%'
  }, [notif.duration])

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 w-80 rounded-xl shadow-lg px-4 py-3 text-white overflow-hidden ${bg}`}
      style={{ direction: 'rtl' }}
    >
      {/* Icon */}
      <span className="text-lg font-bold leading-none mt-0.5 shrink-0">{icon}</span>

      {/* Message */}
      <p className="flex-1 text-sm leading-snug font-medium">{notif.message}</p>

      {/* Close button */}
      <button
        onClick={() => remove(notif.id)}
        aria-label="סגור"
        className="shrink-0 text-white/70 hover:text-white text-lg leading-none mt-0.5 transition-colors"
      >
        ×
      </button>

      {/* Progress bar */}
      {notif.duration > 0 && (
        <div
          ref={barRef}
          className="absolute bottom-0 left-0 h-0.5 bg-white/40 rounded-full"
          style={{ width: '100%' }}
        />
      )}
    </div>
  )
}

export default function NotificationToast() {
  const notifications = useNotifications()
  if (notifications.length === 0) return null

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto animate-slide-in-up">
          <Toast notif={n} />
        </div>
      ))}
    </div>
  )
}
