/**
 * הגדרות ביצועים למשחקים
 * מאפשר למשתמש לבחור בין איכות לביצועים
 */
'use client';

import React from 'react';
import { useMemoryManagement } from '../../../hooks/shared/analytics/useMemoryManagement';

export function PerformanceSettingsPanel() {
  const [performanceMode, setPerformanceMode] = React.useState<'high' | 'balanced' | 'fast'>('balanced');
  const [animationsEnabled, setAnimationsEnabled] = React.useState(true);
  const [preloadingEnabled, setPreloadingEnabled] = React.useState(true);
  
  const memoryManager = useMemoryManagement({
    maxAudioFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    maxImageFiles: performanceMode === 'fast' ? 5 : performanceMode === 'balanced' ? 10 : 20,
    autoCleanup: performanceMode !== 'high',
  });

  const stats = memoryManager.getStats();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('performance-settings');
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          setPerformanceMode(settings.performanceMode || 'balanced');
          setAnimationsEnabled(settings.animationsEnabled ?? true);
          setPreloadingEnabled(settings.preloadingEnabled ?? true);
        } catch {
          // משתמש בהגדרות ברירת מחדל
        }
      }
    }
  }, []);

  const saveSettings = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-settings', JSON.stringify({
        performanceMode,
        animationsEnabled,
        preloadingEnabled,
      }));
    }
  }, [performanceMode, animationsEnabled, preloadingEnabled]);

  React.useEffect(() => {
    saveSettings();
  }, [saveSettings]);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        ⚡ הגדרות ביצועים
      </h3>
      
      {/* מצב ביצועים */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          מצב ביצועים
        </label>
        <select 
          value={performanceMode} 
          onChange={(e) => setPerformanceMode(e.target.value as 'high' | 'balanced' | 'fast')}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="fast">מהיר ⚡ (פחות אפקטים, תגובה מהירה)</option>
          <option value="balanced">מאוזן ⚖️ (איזון בין איכות לביצועים)</option>
          <option value="high">איכות גבוהה 🎨 (מקסימום אפקטים)</option>
        </select>
      </div>

      {/* אנימציות */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="checkbox"
            checked={animationsEnabled}
            onChange={(e) => setAnimationsEnabled(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-medium">הפעל אנימציות 🎬</span>
        </label>
      </div>

      {/* preloading */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="checkbox"
            checked={preloadingEnabled}
            onChange={(e) => setPreloadingEnabled(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="font-medium">טעינה מוקדמת 📦</span>
        </label>
      </div>

      {/* סטטיסטיקות זיכרון */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">📊 שימוש בזיכרון:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>🎵 אודיו: {stats.audioElements} קבצים</div>
          <div>🖼️ תמונות: {stats.imageElements} קבצים</div>
          <div>⏰ טיימרים: {stats.timers} פעילים</div>
          <div>🔄 Intervals: {stats.intervals} פעילים</div>
        </div>
      </div>

      {/* כפתור ניקוי */}
      <button
        onClick={memoryManager.cleanup}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        🧹 נקה זיכרון
      </button>

      {/* הסבר */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 מצב &quot;מהיר&quot; מומלץ למכשירים ישנים. 
          מצב &quot;איכות גבוהה&quot; מומלץ למכשירים חדשים.
        </p>
      </div>
    </div>
  );
}
