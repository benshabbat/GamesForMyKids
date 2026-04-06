/**
 * ===============================================
 * Settings Store — Zustand + persist
 * ===============================================
 * מחליף את ה-useState + localStorage ב-useGameSettings.
 * כל קומפוננט/hook יכול לקרוא ולשנות הגדרות
 * ישירות מבלי לעבור props drilling.
 *
 * שימוש:
 *   import { useSettingsStore } from '@/lib/stores';
 *   const darkMode = useSettingsStore((s) => s.darkMode);
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────
export interface SettingsState {
  // Audio
  soundEnabled: boolean;
  musicEnabled: boolean;
  voiceEnabled: boolean;
  volume: number;

  // Display
  animations: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;

  // Accessibility
  colorBlindSupport: boolean;
  slowMotion: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;

  // Game
  autoSave: boolean;
  showHints: boolean;
  pauseOnFocusLoss: boolean;
  celebrationDuration: number;

  // Language
  language: 'he' | 'en' | 'ar';
  rtlSupport: boolean;
}

export interface SettingsActions {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (json: string) => boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleAnimations: () => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
  setLanguage: (language: SettingsState['language']) => void;
}

const DEFAULTS: SettingsState = {
  soundEnabled: true,
  musicEnabled: true,
  voiceEnabled: true,
  volume: 0.7,
  animations: true,
  darkMode: false,
  fontSize: 'medium',
  highContrast: false,
  colorBlindSupport: false,
  slowMotion: false,
  keyboardNavigation: false,
  screenReader: false,
  autoSave: true,
  showHints: true,
  pauseOnFocusLoss: true,
  celebrationDuration: 3000,
  language: 'he',
  rtlSupport: true,
};

// ── Store ──────────────────────────────────────────────────
export const useSettingsStore = create<SettingsState & SettingsActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...DEFAULTS,

        updateSetting: (key, value) =>
          set((s) => ({ ...s, [key]: value }), false, `settings/update/${String(key)}`),

        resetToDefaults: () => set(DEFAULTS, false, 'settings/resetToDefaults'),

        exportSettings: () => JSON.stringify(get(), null, 2),

        importSettings: (json) => {
          try {
            const imported = JSON.parse(json);
            set((s) => ({ ...s, ...imported }), false, 'settings/import');
            return true;
          } catch {
            return false;
          }
        },

        toggleSound: () =>
          set((s) => ({ soundEnabled: !s.soundEnabled }), false, 'settings/toggleSound'),

        toggleMusic: () =>
          set((s) => ({ musicEnabled: !s.musicEnabled }), false, 'settings/toggleMusic'),

        toggleAnimations: () =>
          set((s) => ({ animations: !s.animations }), false, 'settings/toggleAnimations'),

        toggleDarkMode: () =>
          set((s) => ({ darkMode: !s.darkMode }), false, 'settings/toggleDarkMode'),

        setVolume: (volume) =>
          set(
            { volume: Math.max(0, Math.min(1, volume)) },
            false,
            'settings/setVolume',
          ),

        setLanguage: (language) =>
          set(
            { language, rtlSupport: language === 'he' || language === 'ar' },
            false,
            'settings/setLanguage',
          ),
      }),
      {
        name: 'game_settings',   // same localStorage key as before
        version: 1,
      },
    ),
    { name: 'SettingsStore' },
  ),
);
