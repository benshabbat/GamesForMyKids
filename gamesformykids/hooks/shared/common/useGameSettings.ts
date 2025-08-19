/**
 * ===============================================
 * Game Settings Hook - Hook לניהול הגדרות משחק
 * ===============================================
 * 
 * מנהל הגדרות כלליות לכל המשחקים
 */

import { useState, useCallback, useEffect } from 'react';

export interface GameSettings {
  // הגדרות אודיו
  soundEnabled: boolean;
  musicEnabled: boolean;
  voiceEnabled: boolean;
  volume: number;
  
  // הגדרות תצוגה
  animations: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  
  // הגדרות נגישות
  colorBlindSupport: boolean;
  slowMotion: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
  
  // הגדרות משחק
  autoSave: boolean;
  showHints: boolean;
  pauseOnFocusLoss: boolean;
  celebrationDuration: number;
  
  // הגדרות שפה
  language: 'he' | 'en' | 'ar';
  rtlSupport: boolean;
}

export interface GameSettingsActions {
  updateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleAnimations: () => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
  setLanguage: (language: GameSettings['language']) => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  // אודיו
  soundEnabled: true,
  musicEnabled: true,
  voiceEnabled: true,
  volume: 0.7,
  
  // תצוגה
  animations: true,
  darkMode: false,
  fontSize: 'medium',
  highContrast: false,
  
  // נגישות
  colorBlindSupport: false,
  slowMotion: false,
  keyboardNavigation: false,
  screenReader: false,
  
  // משחק
  autoSave: true,
  showHints: true,
  pauseOnFocusLoss: true,
  celebrationDuration: 3000,
  
  // שפה
  language: 'he',
  rtlSupport: true
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_settings');
      if (saved) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch (error) {
          console.warn('Failed to parse saved settings:', error);
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  // שמירת הגדרות בזיכרון המקומי
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_settings', JSON.stringify(settings));
    }
  }, [settings]);

  // עדכון הגדרת בודדת
  const updateSetting = useCallback(<K extends keyof GameSettings>(
    key: K, 
    value: GameSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // איפוס להגדרות ברירת מחדל
  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // ייצוא הגדרות
  const exportSettings = useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  // ייבוא הגדרות
  const importSettings = useCallback((settingsJson: string) => {
    try {
      const importedSettings = JSON.parse(settingsJson);
      setSettings({ ...DEFAULT_SETTINGS, ...importedSettings });
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }, []);

  // הפעלה/כיבוי קול
  const toggleSound = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

  // הפעלה/כיבוי מוזיקה
  const toggleMusic = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      musicEnabled: !prev.musicEnabled
    }));
  }, []);

  // הפעלה/כיבוי אנימציות
  const toggleAnimations = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      animations: !prev.animations
    }));
  }, []);

  // הפעלה/כיבוי מצב כהה
  const toggleDarkMode = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  }, []);

  // הגדרת עוצמת קול
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setSettings(prev => ({
      ...prev,
      volume: clampedVolume
    }));
  }, []);

  // הגדרת שפה
  const setLanguage = useCallback((language: GameSettings['language']) => {
    setSettings(prev => ({
      ...prev,
      language,
      rtlSupport: language === 'he' || language === 'ar'
    }));
  }, []);

  // פונקציות עזר
  const getThemeClass = useCallback(() => {
    const classes = [];
    
    if (settings.darkMode) classes.push('dark');
    if (settings.highContrast) classes.push('high-contrast');
    if (settings.rtlSupport) classes.push('rtl');
    if (settings.fontSize !== 'medium') classes.push(`font-size-${settings.fontSize}`);
    
    return classes.join(' ');
  }, [settings.darkMode, settings.highContrast, settings.rtlSupport, settings.fontSize]);

  const getAccessibilityProps = useCallback(() => {
    return {
      'aria-live': settings.screenReader ? 'polite' : undefined,
      'data-keyboard-nav': settings.keyboardNavigation,
      'data-slow-motion': settings.slowMotion,
      'data-color-blind-support': settings.colorBlindSupport
    };
  }, [settings.screenReader, settings.keyboardNavigation, settings.slowMotion, settings.colorBlindSupport]);

  const shouldShowAnimations = useCallback(() => {
    return settings.animations && !settings.slowMotion;
  }, [settings.animations, settings.slowMotion]);

  return {
    // Current settings
    settings,
    
    // Actions
    updateSetting,
    resetToDefaults,
    exportSettings,
    importSettings,
    toggleSound,
    toggleMusic,
    toggleAnimations,
    toggleDarkMode,
    setVolume,
    setLanguage,
    
    // Utilities
    getThemeClass,
    getAccessibilityProps,
    shouldShowAnimations,
    
    // Constants
    DEFAULT_SETTINGS
  };
};
