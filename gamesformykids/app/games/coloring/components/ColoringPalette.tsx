'use client';

import { useColoringStore, PALETTE_COLORS } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';

export function ColoringPalette() {
  const selectedColor = useColoringStore((s) => s.selectedColor);
  const selectedRegion = useColoringStore((s) => s.selectedRegion);
  const currentImage = useColoringStore((s) => s.currentImage);
  const selectColor = useColoringStore((s) => s.selectColor);

  const { names } = IMAGE_COMPONENTS[currentImage];
  const selectedColorName = PALETTE_COLORS.find((c) => c.hex === selectedColor)?.hebrew ?? '';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3 mb-4 border-2 border-purple-100">
      <div className="flex flex-wrap gap-2 justify-center">
        {PALETTE_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => selectColor(color.hex, color.hebrew)}
            title={color.hebrew}
            aria-label={`צבע ${color.hebrew}`}
            className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 active:scale-95 ${
              selectedColor === color.hex
                ? 'border-purple-700 scale-125 shadow-lg ring-2 ring-purple-400'
                : 'border-white shadow-md hover:border-gray-300'
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      <p className="text-center text-sm mt-2">
        {selectedRegion ? (
          <span className="font-bold text-amber-600">✏️ בחר צבע ל{names[selectedRegion]}</span>
        ) : (
          <span className="text-gray-500">
            צבע נבחר: <span className="font-bold text-gray-700">{selectedColorName}</span>
          </span>
        )}
      </p>
    </div>
  );
}
