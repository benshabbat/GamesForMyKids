'use client';

import { Palette } from 'lucide-react';
import { useWritingCanvasContext } from './WritingCanvasContext';

export default function CanvasColorPicker() {
  const { strokeColors, drawingState, changeStrokeColor } = useWritingCanvasContext();
  const colors = strokeColors;
  const currentColor = drawingState.currentStrokeColor;
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center bg-gray-50 p-3 rounded-lg">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-medium text-gray-700">בחר צבע:</span>
      </div>
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => changeStrokeColor(color)}
          className={`w-10 h-10 rounded-full border-3 transition-all duration-200 relative ${
            currentColor === color
              ? 'border-gray-800 scale-110 shadow-lg'
              : 'border-gray-300 hover:scale-105 hover:border-gray-400'
          }`}
          style={{ backgroundColor: color }}
          title={`צבע ${color}`}
        >
          {currentColor === color && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </button>
      ))}
    </div>
  );
}
