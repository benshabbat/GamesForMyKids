'use client';

import { useColoringStore, IMAGES } from '../store/coloringStore';

export function ColoringImageSelector() {
  const currentImage = useColoringStore((s) => s.currentImage);
  const selectImage = useColoringStore((s) => s.selectImage);

  return (
    <div className="flex gap-2 justify-center mb-4 flex-wrap">
      {IMAGES.map((img) => (
        <button
          key={img.id}
          onClick={() => selectImage(img.id)}
          className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all ${
            currentImage === img.id
              ? 'border-purple-500 bg-purple-100 scale-110 shadow-lg'
              : 'border-gray-200 bg-white hover:border-purple-300 hover:scale-105'
          }`}
        >
          <span className="text-2xl">{img.emoji}</span>
          <span className="text-xs font-bold text-gray-700 mt-0.5">{img.title}</span>
        </button>
      ))}
    </div>
  );
}
