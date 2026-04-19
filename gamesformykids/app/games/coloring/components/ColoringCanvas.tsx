'use client';

import { useColoringStore } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';

export function ColoringCanvas() {
  const currentImage = useColoringStore((s) => s.currentImage);
  const fills = useColoringStore((s) => s.allFills[s.currentImage]);
  const selectedRegion = useColoringStore((s) => s.selectedRegion);
  const showDone = useColoringStore((s) => s.doneImages[s.currentImage]);
  const selectRegion = useColoringStore((s) => s.selectRegion);
  const clearImage = useColoringStore((s) => s.clearImage);

  const { Component, regions, names } = IMAGE_COMPONENTS[currentImage];

  return (
    <div className="relative bg-white rounded-3xl shadow-xl p-4 mb-4 border-4 border-purple-200">
      {showDone && (
        <div className="absolute inset-0 bg-white/90 rounded-3xl flex flex-col items-center justify-center z-10">
          <div className="text-6xl mb-2 animate-bounce">🌟</div>
          <p className="text-2xl font-bold text-purple-700">כל הכבוד! צוין!</p>
          <button
            onClick={clearImage}
            className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition-colors"
          >
            צבע שוב
          </button>
        </div>
      )}

      <div className="w-full aspect-square max-w-xs mx-auto">
        <Component
          fills={fills}
          selectedRegion={selectedRegion ?? undefined}
          onFill={(id) => selectRegion(id, regions)}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {regions.map((id) => (
          <button
            key={id}
            onClick={() => selectRegion(id, regions)}
            className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
              selectedRegion === id
                ? 'border-amber-500 bg-amber-100 text-amber-800 scale-105 ring-2 ring-amber-300'
                : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
            }`}
            style={
              fills[id] && selectedRegion !== id
                ? { borderColor: fills[id], color: fills[id] }
                : undefined
            }
          >
            {names[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
