import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useUIStore } from '@/lib/stores/uiStore';

beforeEach(() => {
  useUIStore.setState({
    notifications: [],
    sidebarOpen: false,
    showProgressModal: false,
    isUserMenuOpen: false,
  });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('uiStore', () => {
  describe('addNotification', () => {
    it('adds a notification with the given message and type', () => {
      useUIStore.getState().addNotification('שמרת!', 'success');
      const notifications = useUIStore.getState().notifications;
      expect(notifications).toHaveLength(1);
      const notification = notifications[0];
      expect(notification).toBeDefined();
      expect(notification?.message).toBe('שמרת!');
      expect(notification?.type).toBe('success');
    });

    it('defaults type to info', () => {
      useUIStore.getState().addNotification('הודעה');
      expect(useUIStore.getState().notifications[0]?.type).toBe('info');
    });

    it('returns a unique id', () => {
      const id1 = useUIStore.getState().addNotification('a');
      const id2 = useUIStore.getState().addNotification('b');
      expect(id1).not.toBe(id2);
    });

    it('accumulates multiple notifications', () => {
      useUIStore.getState().addNotification('first');
      useUIStore.getState().addNotification('second');
      expect(useUIStore.getState().notifications).toHaveLength(2);
    });

    it('auto-removes after duration', () => {
      useUIStore.getState().addNotification('auto', 'info', 1000);
      expect(useUIStore.getState().notifications).toHaveLength(1);
      vi.advanceTimersByTime(1001);
      expect(useUIStore.getState().notifications).toHaveLength(0);
    });
  });

  describe('removeNotification', () => {
    it('removes notification by id', () => {
      const id = useUIStore.getState().addNotification('to remove');
      useUIStore.getState().removeNotification(id);
      expect(useUIStore.getState().notifications).toHaveLength(0);
    });

    it('leaves other notifications intact', () => {
      useUIStore.getState().addNotification('keep');
      const removeId = useUIStore.getState().addNotification('remove me');
      useUIStore.getState().removeNotification(removeId);
      const remaining = useUIStore.getState().notifications;
      expect(remaining).toHaveLength(1);
      expect(remaining[0]?.message).toBe('keep');
    });
  });

  describe('clearAllNotifications', () => {
    it('empties the notifications array', () => {
      useUIStore.getState().addNotification('a');
      useUIStore.getState().addNotification('b');
      useUIStore.getState().clearAllNotifications();
      expect(useUIStore.getState().notifications).toHaveLength(0);
    });
  });

  describe('sidebar', () => {
    it('setSidebarOpen sets the value', () => {
      useUIStore.getState().setSidebarOpen(true);
      expect(useUIStore.getState().sidebarOpen).toBe(true);
    });

    it('toggleSidebar flips the value', () => {
      useUIStore.getState().toggleSidebar();
      expect(useUIStore.getState().sidebarOpen).toBe(true);
      useUIStore.getState().toggleSidebar();
      expect(useUIStore.getState().sidebarOpen).toBe(false);
    });
  });

  describe('user menu', () => {
    it('openUserMenu sets isUserMenuOpen to true', () => {
      useUIStore.getState().openUserMenu();
      expect(useUIStore.getState().isUserMenuOpen).toBe(true);
    });

    it('closeUserMenu sets isUserMenuOpen to false', () => {
      useUIStore.getState().openUserMenu();
      useUIStore.getState().closeUserMenu();
      expect(useUIStore.getState().isUserMenuOpen).toBe(false);
    });

    it('toggleUserMenu flips the value', () => {
      useUIStore.getState().toggleUserMenu();
      expect(useUIStore.getState().isUserMenuOpen).toBe(true);
      useUIStore.getState().toggleUserMenu();
      expect(useUIStore.getState().isUserMenuOpen).toBe(false);
    });
  });

  describe('showProgressModal', () => {
    it('setShowProgressModal updates value', () => {
      useUIStore.getState().setShowProgressModal(true);
      expect(useUIStore.getState().showProgressModal).toBe(true);
    });
  });
});
