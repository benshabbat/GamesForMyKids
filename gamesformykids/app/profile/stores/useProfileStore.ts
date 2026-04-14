/**
 * ===============================================
 * Profile Page Store — Zustand
 * ===============================================
 * מנהל את ה-UI state של דף הפרופיל.
 * קומפוננטות קוראות ישירות לסטור — אין props drilling.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUserProfileStore } from '@/lib/stores/userProfileStore';
import { useGameProgressDataStore } from '@/lib/stores/gameProgressDataStore';
import { useAchievementsStore } from '@/lib/stores/achievementsStore';
import type { UserProfile } from '@/hooks/shared/user/useUserProfile';
import type { User } from '@supabase/supabase-js';

// ── Interfaces ───────────────────────────────────────────

export interface ProfileState {
  isEditing: boolean;
  uploadingAvatar: boolean;
  editingName: string;
}

export interface ProfileActions {
  startEdit: () => void;
  cancelEdit: () => void;
  setEditingName: (name: string) => void;
  handleAvatarUpload: (file: File, uploadFn: (file: File) => Promise<unknown>) => Promise<void>;
  handleProfileUpdate: (updateFn: (updates: { full_name: string }) => Promise<unknown>) => Promise<void>;
}

// ── Pure display selectors (no reactivity needed) ────────

export const getDisplayName = (profile: UserProfile | null, user: User): string =>
  profile?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? 'משתמש';

export const getAvatarSrc = (profile: UserProfile | null, user: User): string =>
  profile?.avatar_url ??
  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email ?? 'User')}&background=8b5cf6&color=fff`;

// ── Computed stats hook (subscribes to underlying stores) ─

export function useProfileComputedStats() {
  const totalScore = useGameProgressDataStore((s) =>
    s.progress.reduce((sum, p) => sum + p.best_score, 0)
  );
  const totalPlayTime = useGameProgressDataStore((s) =>
    Math.floor(s.progress.reduce((sum, p) => sum + p.total_play_time, 0) / 60)
  );
  const achievementsCount = useAchievementsStore((s) => s.achievements.length);
  return { totalScore, totalPlayTime, achievementsCount };
}

// ── Store ─────────────────────────────────────────────────

export const useProfileStore = create<ProfileState & ProfileActions>()(
  devtools(
    (set, get) => ({
      isEditing: false,
      uploadingAvatar: false,
      editingName: '',

      startEdit: () => {
        const currentName = useUserProfileStore.getState().profile?.full_name ?? '';
        set({ isEditing: true, editingName: currentName }, false, 'profile/startEdit');
      },

      cancelEdit: () =>
        set({ isEditing: false, editingName: '' }, false, 'profile/cancelEdit'),

      setEditingName: (name) =>
        set({ editingName: name }, false, 'profile/setEditingName'),

      handleAvatarUpload: async (file, uploadFn) => {
        set({ uploadingAvatar: true }, false, 'profile/uploadStart');
        await uploadFn(file);
        set({ uploadingAvatar: false }, false, 'profile/uploadEnd');
      },

      handleProfileUpdate: async (updateFn) => {
        const { editingName } = get();
        await updateFn({ full_name: editingName });
        set({ isEditing: false }, false, 'profile/updateDone');
      },
    }),
    { name: 'ProfileStore' }
  )
);
