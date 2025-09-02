/**
 * קומפוננט הגדרות אודיו מתקדמות
 * מאפשר למשתמש לשלוט במהירות הדיבור והגדרות אחרות
 */
'use client';

import React from 'react';
import { useAudioSettings } from '../../../hooks/shared/audio/useAudioSettings';
import { testSpeech } from '../../../lib/utils/speech/enhancedSpeechUtils';

export function AudioSettingsPanel() {
  const {
    settings,
    updateSpeechRate,
    updateSpeechPitch,
    updateVolume,
    toggleEnabled,
    resetToDefaults,
  } = useAudioSettings();

  const handleTestSpeech = async () => {
    try {
      await testSpeech();
    } catch (error) {
      console.error('Test speech failed:', error);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🎤 הגדרות אודיו
      </h3>
      
      {/* הפעלה/כיבוי */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={toggleEnabled}
            className="w-5 h-5"
          />
          <span className="font-medium">הפעל אודיו</span>
        </label>
      </div>

      {settings.enabled && (
        <>
          {/* מהירות דיבור */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מהירות דיבור: {settings.speechRate.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.3"
              max="2.0"
              step="0.1"
              value={settings.speechRate}
              onChange={(e) => updateSpeechRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>איטי</span>
              <span>רגיל</span>
              <span>מהיר</span>
            </div>
          </div>

          {/* גובה הצליל */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              גובה צליל: {settings.speechPitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.speechPitch}
              onChange={(e) => updateSpeechPitch(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>נמוך</span>
              <span>רגיל</span>
              <span>גבוה</span>
            </div>
          </div>

          {/* עוצמת קול */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              עוצמת קול: {Math.round(settings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* כפתור בדיקה */}
          <button
            onClick={handleTestSpeech}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mb-3"
          >
            🎵 בדיקת האודיו
          </button>
        </>
      )}

      {/* כפתור איפוס */}
      <button
        onClick={resetToDefaults}
        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        🔄 איפוס להגדרות ברירת מחדל
      </button>

      {/* הסבר */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 אם האודיו איטי מדי, הגבירו את המהירות. 
          אם לא שומעים טוב, בדקו את עוצמת הקול.
        </p>
      </div>
    </div>
  );
}
