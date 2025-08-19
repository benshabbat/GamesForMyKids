'use client';

import { Volume2, VolumeX, Save } from 'lucide-react';
import { useBuildingContext } from '@/app/games/building/contexts/BuildingContext';

export default function SettingsPanel() {
  const {
    soundEnabled,
    showGrid,
    animationMode,
    selectedSize,
    selectedBlock,
    setSoundEnabled,
    setShowGrid,
    setAnimationMode,
    handleSizeChange,
    updateSelectedBlockSize,
    saveCreation
  } = useBuildingContext();

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
      <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3 text-center">הגדרות</h3>
      <div className="space-y-1 md:space-y-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`w-full py-2 px-2 md:px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base touch-manipulation ${
            soundEnabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 md:w-4 md:h-4" /> : <VolumeX className="w-3 h-3 md:w-4 md:h-4" />}
          צלילים
        </button>
        
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`w-full py-2 px-2 md:px-3 rounded-xl font-bold transition-all text-sm md:text-base touch-manipulation ${
            showGrid ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          רשת: {showGrid ? 'ON' : 'OFF'}
        </button>
        
        <button
          onClick={() => setAnimationMode(!animationMode)}
          className={`w-full py-2 px-2 md:px-3 rounded-xl font-bold transition-all text-sm md:text-base touch-manipulation ${
            animationMode ? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          אנימציה: {animationMode ? 'ON' : 'OFF'}
        </button>
        
        {/* Size Control */}
        <div className="bg-white/10 rounded-xl p-2 md:p-3">
          <label className="text-white font-bold text-xs md:text-sm block mb-1 md:mb-2 text-center">
            גודל צורות חדשות: {selectedSize.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={selectedSize}
            onChange={(e) => handleSizeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
          />
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>קטן</span>
            <span>גדול</span>
          </div>
        </div>

        {/* Selected Block Size Control */}
        {selectedBlock && (
          <div className="bg-orange-500/20 rounded-xl p-2 md:p-3 border-2 border-orange-400">
            <label className="text-white font-bold text-xs md:text-sm block mb-1 md:mb-2 text-center">
              גודל צורה נבחרת: {selectedBlock.size.toFixed(1)}x
            </label>
            <div className="text-center text-xs text-white/80 mb-1 md:mb-2">
              {selectedBlock.shape} {selectedBlock.color}
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={selectedBlock.size}
              onChange={(e) => updateSelectedBlockSize(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>קטן</span>
              <span>ענק</span>
            </div>
          </div>
        )}
        
        <button
          onClick={saveCreation}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-2 md:px-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base touch-manipulation"
        >
          <Save className="w-3 h-3 md:w-4 md:h-4" />
          שמור
        </button>
      </div>
    </div>
  );
}
