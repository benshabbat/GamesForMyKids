/**
 * useAudioSettings — thin wrapper around useAudioSettingsStore.
 * ממשק זהה לגרסה הישנה, state מגיע מ-Zustand persist.
 */
import { useAudioSettingsStore } from '@/lib/stores/audioSettingsStore';

export type { AudioSettingsState as AudioSettings } from '@/lib/stores/audioSettingsStore';

export function useAudioSettings() {
  const store = useAudioSettingsStore();

  return {
    settings: {
      speechRate: store.speechRate,
      speechPitch: store.speechPitch,
      volume: store.volume,
      enabled: store.enabled,
    },
    updateSpeechRate: store.updateSpeechRate,
    updateSpeechPitch: store.updateSpeechPitch,
    updateVolume: store.updateVolume,
    toggleEnabled: store.toggleEnabled,
    resetToDefaults: store.resetToDefaults,
  };
}

