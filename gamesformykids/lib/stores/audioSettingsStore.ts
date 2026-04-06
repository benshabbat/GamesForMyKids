/**
 * ===============================================
 * Audio Settings Store — Zustand + persist
 * ===============================================
 * מחליף את ה-useState + localStorage ב-useAudioSettings.
 * כל קומפוננט/hook יכול לקרוא הגדרות אודיו ישירות
 * מבלי לעבור props drilling.
 *
 * שימוש:
 *   import { useAudioSettingsStore } from '@/lib/stores';
 *   const volume = useAudioSettingsStore((s) => s.volume);
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ── Types ──────────────────────────────────────────────────
export interface AudioSettingsState {
  speechRate: number;
  speechPitch: number;
  volume: number;
  enabled: boolean;
}

export interface AudioSettingsActions {
  updateSpeechRate: (rate: number) => void;
  updateSpeechPitch: (pitch: number) => void;
  updateVolume: (volume: number) => void;
  toggleEnabled: () => void;
  saveSettings: (partial: Partial<AudioSettingsState>) => void;
  resetToDefaults: () => void;
}

const DEFAULTS: AudioSettingsState = {
  speechRate: 0.85,   // AUDIO_CONSTANTS.SPEECH.HEBREW_RATE
  speechPitch: 1.0,   // AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH
  volume: 0.8,        // AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME
  enabled: true,
};

// ── Store ──────────────────────────────────────────────────
export const useAudioSettingsStore = create<AudioSettingsState & AudioSettingsActions>()(
  devtools(
    persist(
      (set) => ({
        ...DEFAULTS,

        saveSettings: (partial) =>
          set((s) => ({ ...s, ...partial }), false, 'audio/saveSettings'),

        updateSpeechRate: (rate) =>
          set(
            { speechRate: Math.max(0.1, Math.min(3.0, rate)) },
            false,
            'audio/updateSpeechRate',
          ),

        updateSpeechPitch: (pitch) =>
          set(
            { speechPitch: Math.max(0.1, Math.min(2.0, pitch)) },
            false,
            'audio/updateSpeechPitch',
          ),

        updateVolume: (volume) =>
          set(
            { volume: Math.max(0.0, Math.min(1.0, volume)) },
            false,
            'audio/updateVolume',
          ),

        toggleEnabled: () =>
          set((s) => ({ enabled: !s.enabled }), false, 'audio/toggleEnabled'),

        resetToDefaults: () => set(DEFAULTS, false, 'audio/resetToDefaults'),
      }),
      {
        name: 'games-audio-settings',   // same localStorage key as before
        version: 1,
      },
    ),
    { name: 'AudioSettingsStore' },
  ),
);
