'use client';

import { useState, useCallback } from 'react';

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
  const [emoji, setEmojiState] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(LS_KEY) ?? '';
  });

  const setEmoji = useCallback((e: string) => {
    setEmojiState(e);
    localStorage.setItem(LS_KEY, e);
  }, []);

  const clearEmoji = useCallback(() => {
    setEmojiState('');
    localStorage.removeItem(LS_KEY);
  }, []);

  return { emoji, setEmoji, clearEmoji };
}
