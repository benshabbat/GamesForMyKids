'use client';

import Link from 'next/link';
import { useColoringGame, PALETTE_COLORS, IMAGES } from '../hooks/useColoringGame';
import {
  CatImage, catRegions, catRegionNames,
  HouseImage, houseRegions, houseRegionNames,
  SunImage, sunRegions, sunRegionNames,
  ButterflyImage, butterflyRegions, butterflyRegionNames,
  FlowerImage, flowerRegions, flowerRegionNames,
} from './coloringImages';
import type { ImageId } from '../hooks/useColoringGame';

type ImageComponentType = React.ComponentType<{
  fills: Record<string, string>;
  onFill: (id: string) => void;
  selectedRegion?: string;
}>;

const IMAGE_COMPONENTS: Record<ImageId, { Component: ImageComponentType; regions: string[]; names: Record<string, string> }> = {
  cat: { Component: CatImage, regions: catRegions, names: catRegionNames },
  house: { Component: HouseImage, regions: houseRegions, names: houseRegionNames },
  sun: { Component: SunImage, regions: sunRegions, names: sunRegionNames },
  butterfly: { Component: ButterflyImage, regions: butterflyRegions, names: butterflyRegionNames },
  flower: { Component: FlowerImage, regions: flowerRegions, names: flowerRegionNames },
};

export default function ColoringGame() {
  const {
    currentImage, selectedColor, fills, showDone,
    selectedRegion, selectRegion, clearImage, selectColor, selectImage,
  } = useColoringGame();

  const { Component, regions, names } = IMAGE_COMPONENTS[currentImage];
  const selectedColorName = PALETTE_COLORS.find((c) => c.hex === selectedColor)?.hebrew ?? '';

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 p-4"
      dir="rtl"
    >
      <div className="max-w-lg mx-auto">

        {/* Header */}
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

        {/* Image Selector */}
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

        {/* Canvas */}
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
          {/* Region Name Buttons */}
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
                style={fills[id] && selectedRegion !== id
                  ? { borderColor: fills[id], color: fills[id] }
                  : undefined}
              >
                {names[id]}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
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
            {selectedRegion
              ? <span className="font-bold text-amber-600">✏️ בחר צבע ל{names[selectedRegion]}</span>
              : <span className="text-gray-500">צבע נבחר: <span className="font-bold text-gray-700">{selectedColorName}</span></span>
            }
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={clearImage}
            className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md"
          >
            🗑️ נקה
          </button>
          <Link
            href="/"
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md"
          >
            🏠 בית
          </Link>
        </div>

      </div>
    </div>
  );
}
