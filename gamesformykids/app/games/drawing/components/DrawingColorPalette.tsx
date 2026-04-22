"use client";

import { useDrawingStore } from '../store/drawingStore';

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
  '#8B4513', '#800080', '#FFC0CB', '#A52A2A',
];

export default function DrawingColorPalette() {
  const { currentColor, setCurrentColor } = useDrawingStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-lg font-bold text-gray-700 mb-4 text-center">🎨 צבעים</div>
      <div className="grid grid-cols-4 gap-3">
        {COLORS.map(color => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            className={`w-12 h-12 rounded-full border-4 hover:scale-110 transition-all duration-200 shadow-md ${
              currentColor === color ? 'border-gray-800 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color }}
            title={`צבע ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
