/**
 * ===============================================
 * Game Settings Hook — wrapper around useSettingsStore
 * ===============================================
 * ממשק זהה לגרסה הישנה, state מגיע מ-Zustand persist.
 */

'use client';

import { useCallback } from 'react';
import { useSettingsStore, type SettingsState } from '@/lib/stores/settingsStore';

// Re-export types for backward compatibility
export type GameSettings = SettingsState;
export type { SettingsActions as GameSettingsActions } from '@/lib/stores/settingsStore';

export const useGameSettings = () => {
  const store = useSettingsStore();

  const getThemeClass = useCallback(() => {
    const classes: string[] = [];
    if (store.darkMode) classes.push('dark');
    if (store.highContrast) classes.push('high-contrast');
    if (store.rtlSupport) classes.push('rtl');
    if (store.fontSize !== 'medium') classes.push(`font-size-${store.fontSize}`);
    return classes.join(' ');
  }, [store.darkMode, store.highContrast, store.rtlSupport, store.fontSize]);

  const getAccessibilityProps = useCallback(() => ({
    'aria-live': store.screenReader ? ('polite' as const) : undefined,
    'data-keyboard-nav': store.keyboardNavigation,
    'data-slow-motion': store.slowMotion,
    'data-color-blind-support': store.colorBlindSupport,
  }), [store.screenReader, store.keyboardNavigation, store.slowMotion, store.colorBlindSupport]);

  const shouldShowAnimations = useCallback(
    () => store.animations && !store.slowMotion,
    [store.animations, store.slowMotion],
  );

  return {
    // settings object (backward compat)
    settings: store as GameSettings,

    // Actions
    updateSetting: store.updateSetting,
    resetToDefaults: store.resetToDefaults,
    exportSettings: store.exportSettings,
    importSettings: store.importSettings,
    toggleSound: store.toggleSound,
    toggleMusic: store.toggleMusic,
    toggleAnimations: store.toggleAnimations,
    toggleDarkMode: store.toggleDarkMode,
    setVolume: store.setVolume,
    setLanguage: store.setLanguage,

    // Utilities
    getThemeClass,
    getAccessibilityProps,
    shouldShowAnimations,

    DEFAULT_SETTINGS: useSettingsStore.getState(),
  };
};

