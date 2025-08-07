'use client';

import React from 'react';
import { Volume2, VolumeX, Save } from 'lucide-react';

interface SettingsPanelProps {
  soundEnabled: boolean;
  showGrid: boolean;
  animationMode: boolean;
  onToggleSound: () => void;
  onToggleGrid: () => void;
  onToggleAnimation: () => void;
  onSave: () => void;
}

export default function SettingsPanel({ 
  soundEnabled, 
  showGrid, 
  animationMode, 
  onToggleSound, 
  onToggleGrid, 
  onToggleAnimation, 
  onSave 
}: SettingsPanelProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
      <h3 className="text-white font-bold text-lg mb-3 text-center">הגדרות</h3>
      <div className="space-y-2">
        <button
          onClick={onToggleSound}
          className={`w-full py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            soundEnabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          צלילים
        </button>
        
        <button
          onClick={onToggleGrid}
          className={`w-full py-2 px-3 rounded-xl font-bold transition-all ${
            showGrid ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          רשת: {showGrid ? 'ON' : 'OFF'}
        </button>
        
        <button
          onClick={onToggleAnimation}
          className={`w-full py-2 px-3 rounded-xl font-bold transition-all ${
            animationMode ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          אנימציה: {animationMode ? 'ON' : 'OFF'}
        </button>
        
        <button
          onClick={onSave}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          שמור
        </button>
      </div>
    </div>
  );
}
