/**
 * ===============================================
 * UI Store — Zustand
 * ===============================================
 * מנהל הודעות Toast / Notification גלובליות.
 * כל קומפוננט יכול לקרוא addNotification() מבלי דרך Context nesting.
 *
 * שימוש:
 *   const { addNotification } = useUIStore();
 *   addNotification('שמרת בהצלחה!', 'success');
 *
 *   // או ישירות ללא hook (בתוך event handlers / server actions):
 *   import { useUIStore } from '@/lib/stores';
 *   useUIStore.getState().addNotification('שגיאה כלשהי', 'error');
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  /** ms עד שנעלם אוטומטית — ברירת מחדל 4000 */
  duration: number;
  /** חותמת יצירה */
  createdAt: number;
}

export interface UIState {
  notifications: Notification[];
  /** האם ה-sidebar/drawer פתוח (שמישה עתידית) */
  sidebarOpen: boolean;
  /** האם מודל ההתקדמות פתוח */
  showProgressModal: boolean;
  /** האם תפריט המשתמש פתוח */
  isUserMenuOpen: boolean;
}

export interface UIActions {
  addNotification: (
    message: string,
    type?: NotificationType,
    duration?: number
  ) => string; // מחזיר את ה-id למי שרוצה לבטל ידנית
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setShowProgressModal: (show: boolean) => void;
  openUserMenu: () => void;
  closeUserMenu: () => void;
  toggleUserMenu: () => void;
}

let _counter = 0;
const genId = () => `notif_${Date.now()}_${++_counter}`;

// ── Store ──────────────────────────────────────────────────
export const useUIStore = create<UIState & UIActions>()(
  devtools(
    (set, get) => ({
      notifications: [],
      sidebarOpen: false,
      showProgressModal: false,
      isUserMenuOpen: false,

      addNotification: (message, type = 'info', duration = 4000) => {
        const id = genId();
        const notif: Notification = {
          id,
          message,
          type,
          duration,
          createdAt: Date.now(),
        };
        set(
          (s) => ({ notifications: [...s.notifications, notif] }),
          false,
          'ui/addNotification'
        );
        // הסרה אוטומטית
        if (duration > 0) {
          setTimeout(() => get().removeNotification(id), duration);
        }
        return id;
      },

      removeNotification: (id) =>
        set(
          (s) => ({ notifications: s.notifications.filter((n) => n.id !== id) }),
          false,
          'ui/removeNotification'
        ),

      clearAllNotifications: () =>
        set({ notifications: [] }, false, 'ui/clearAll'),

      setSidebarOpen: (open) =>
        set({ sidebarOpen: open }, false, 'ui/setSidebarOpen'),

      toggleSidebar: () =>
        set((s) => ({ sidebarOpen: !s.sidebarOpen }), false, 'ui/toggleSidebar'),

      setShowProgressModal: (show) =>
        set({ showProgressModal: show }, false, 'ui/setShowProgressModal'),

      openUserMenu: () => set({ isUserMenuOpen: true }, false, 'ui/openUserMenu'),
      closeUserMenu: () => set({ isUserMenuOpen: false }, false, 'ui/closeUserMenu'),
      toggleUserMenu: () =>
        set((s) => ({ isUserMenuOpen: !s.isUserMenuOpen }), false, 'ui/toggleUserMenu'),
    }),
    { name: 'UIStore' }
  )
);

// ── Convenience Selectors ──────────────────────────────────
/** שמישה ישירות בתוך קומפוננט הצגת Toasts */
export const useNotifications = () => useUIStore((s) => s.notifications);

/** helper hooks נוחים */
export const useAddNotification = () => useUIStore((s) => s.addNotification);
