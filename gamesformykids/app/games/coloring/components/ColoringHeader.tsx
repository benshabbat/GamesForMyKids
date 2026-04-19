'use client';

import { useColoringStore } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';

export function ColoringHeader() {
  const selectedRegion = useColoringStore((s) => s.selectedRegion);
  const currentImage = useColoringStore((s) => s.currentImage);
  const { names } = IMAGE_COMPONENTS[currentImage];

  return (
    <div className="text-center mb-4">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-1">
        🎨 צביעת תמונות
      </h1>
      <p className="text-purple-600 text-sm">
        {selectedRegion
          ? `נבחר: ${names[selectedRegion]} — בחר צבע! 🎨`
          : 'לחץ על חלק בציור או על כפתור למטה לבחירה'}
      </p>
    </div>
  );
}
