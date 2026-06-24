'use client';

import { useState, useCallback } from 'react';
import { useChildProfileStore } from '@/lib/stores/childProfileStore';

const LS_KEY = 'gfk_avatar_emoji';

export const AVATAR_OPTIONS = [
  '🦁', '🦊', '🐼', '🦋', '🐸', '🦄',
  '🐶', '🐱', '🦖', '🚀', '🐬', '🦅',
  '🐨', '🦞', '🦓', '🌟', '🐯', '🦒',
  '🐙', '🦁',
];

// Deduplicated avatar list
export const AVATAR_LIST = [...new Set(AVATAR_OPTIONS)];

export function useAvatarEmoji() {
  const activeProfileId = useChildProfileStore((s) => s.activeProfileId);
  const profiles = useChildProfileStore((s) => s.profiles);
  const { updateProfile } = useChildProfileStore();

  const [localEmoji, setLocalEmojiState] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(LS_KEY) ?? '';
  });

  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const emoji = activeProfile ? activeProfile.emoji : localEmoji;

  const setEmoji = useCallback((e: string) => {
    if (activeProfileId && activeProfile) {
      updateProfile(activeProfileId, { emoji: e });
    } else {
      setLocalEmojiState(e);
      localStorage.setItem(LS_KEY, e);
    }
  }, [activeProfileId, activeProfile, updateProfile]);

  const clearEmoji = useCallback(() => {
    if (activeProfileId && activeProfile) {
      updateProfile(activeProfileId, { emoji: '' });
    } else {
      setLocalEmojiState('');
      localStorage.removeItem(LS_KEY);
    }
  }, [activeProfileId, activeProfile, updateProfile]);

  return { emoji, setEmoji, clearEmoji };
}
