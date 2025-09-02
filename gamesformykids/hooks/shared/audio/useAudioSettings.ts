import { useState, useEffect, useCallback } from 'react';
import { AUDIO_CONSTANTS } from '../../../lib/constants/core';

export interface AudioSettings {
  speechRate: number;
  speechPitch: number;
  volume: number;
  enabled: boolean;
}

const DEFAULT_SETTINGS: AudioSettings = {
  speechRate: AUDIO_CONSTANTS.SPEECH.HEBREW_RATE,
  speechPitch: AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH,
  volume: AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME,
  enabled: true,
};

const STORAGE_KEY = 'games-audio-settings';

export function useAudioSettings() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);

  // טעינת הגדרות מ-localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsedSettings = JSON.parse(saved);
          setSettings(prev => ({ ...prev, ...parsedSettings }));
        }
      } catch (error) {
        console.warn('Failed to load audio settings:', error);
      }
    }
  }, []);

  // שמירת הגדרות ל-localStorage
  const saveSettings = useCallback((newSettings: Partial<AudioSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      } catch (error) {
        console.warn('Failed to save audio settings:', error);
      }
    }
  }, [settings]);

  // פונקציות לעדכון הגדרות ספציפיות
  const updateSpeechRate = useCallback((rate: number) => {
    const clampedRate = Math.max(0.1, Math.min(3.0, rate));
    saveSettings({ speechRate: clampedRate });
  }, [saveSettings]);

  const updateSpeechPitch = useCallback((pitch: number) => {
    const clampedPitch = Math.max(0.1, Math.min(2.0, pitch));
    saveSettings({ speechPitch: clampedPitch });
  }, [saveSettings]);

  const updateVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0.0, Math.min(1.0, volume));
    saveSettings({ volume: clampedVolume });
  }, [saveSettings]);

  const toggleEnabled = useCallback(() => {
    saveSettings({ enabled: !settings.enabled });
  }, [settings.enabled, saveSettings]);

  // איפוס להגדרות ברירת מחדל
  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    settings,
    updateSpeechRate,
    updateSpeechPitch,
    updateVolume,
    toggleEnabled,
    resetToDefaults,
  };
}
