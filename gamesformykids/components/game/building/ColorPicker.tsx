'use client';

import { Palette } from 'lucide-react';

interface ColorPickerProps {
  colors: readonly string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function ColorPicker({ colors, selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
      <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3 text-center flex items-center justify-center gap-1 md:gap-2">
        <Palette className="w-4 h-4 md:w-5 md:h-5" />
        בחירת צבע
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-1 md:gap-2 mb-2 md:mb-3">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg transition-all hover:scale-110 border-2 touch-manipulation ${
              selectedColor === color ? 'border-white scale-110' : 'border-white/30'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="text-center">
        <div 
          className="w-full h-6 md:h-8 rounded-lg border-2 border-white/50"
          style={{ backgroundColor: selectedColor }}
        />
        <p className="text-white/80 text-xs md:text-sm mt-1">צבע נבחר</p>
      </div>
    </div>
  );
}
