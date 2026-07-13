'use client';

import { useEffect, useState } from 'react';
import { useColoringStore } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';
import { FloodFillCanvas } from './FloodFillCanvas';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

interface ColoringCanvasProps {
  isFullscreen?: boolean;
}

export function ColoringCanvas({ isFullscreen = false }: ColoringCanvasProps) {
  const currentImage = useColoringStore((s) => s.currentImage);
  const fills = useColoringStore((s) => s.allFills[s.currentImage]);
  const showDone = useColoringStore((s) => s.doneImages[s.currentImage]);
  const selectRegion = useColoringStore((s) => s.selectRegion);
  const fillGroup = useColoringStore((s) => s.fillGroup);
  const clearImage = useColoringStore((s) => s.clearImage);

  const meta = IMAGE_COMPONENTS[currentImage];

  const [zoom, setZoom] = useState(1);
  useEffect(() => setZoom(1), [currentImage]);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));

  return (
    <div className="relative bg-white rounded-3xl shadow-xl p-4 mb-4 border-4 border-purple-200">
      {showDone && (
        <div className="absolute inset-0 bg-white/90 rounded-3xl flex flex-col items-center justify-center z-10">
          <div className="text-6xl mb-2">🌟</div>
          <p className="text-2xl font-bold text-purple-700">כל הכבוד! צוין!</p>
          <button
            onClick={clearImage}
            className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition-colors"
          >
            צבע שוב
          </button>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="הקטן"
          className="w-9 h-9 rounded-full text-lg font-bold border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50 active:scale-95 disabled:opacity-40 disabled:hover:bg-white transition"
        >
          🔍−
        </button>
        <span className="min-w-[3.5rem] text-center text-sm font-bold text-purple-700">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label="הגדל"
          className="w-9 h-9 rounded-full text-lg font-bold border-2 border-purple-300 bg-white text-purple-700 hover:bg-purple-50 active:scale-95 disabled:opacity-40 disabled:hover:bg-white transition"
        >
          🔍+
        </button>
        {zoom !== 1 && (
          <button
            onClick={() => setZoom(1)}
            className="px-3 h-9 rounded-full text-sm font-bold border-2 border-gray-300 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition"
          >
            ↺ איפוס
          </button>
        )}
      </div>

      <div className="overflow-auto rounded-2xl" style={{ maxHeight: isFullscreen ? '80vh' : '65vh' }}>
        {meta.kind === 'regions' ? (
          <div className="mx-auto aspect-square" style={{ width: `${zoom * 320}px` }}>
            <meta.Component fills={fills} onFill={(id) => selectRegion(id, meta.regions)} />
          </div>
        ) : (
          <div
            className="mx-auto"
            style={{ width: `${zoom * 100}%`, aspectRatio: `${meta.width} / ${meta.height}` }}
          >
            <FloodFillCanvas key={currentImage} imageId={currentImage} meta={meta} />
          </div>
        )}
      </div>

      {meta.kind === 'regions' && (
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {/* Group buttons – fill all members at once */}
          {meta.groups?.map(({ id, name, members }) => (
            <button
              key={id}
              onClick={() => fillGroup(members, meta.regions)}
              className="px-3 py-1.5 rounded-full text-sm font-bold border-2 transition border-purple-400 bg-purple-50 text-purple-700 hover:bg-purple-100 active:scale-95"
            >
              ✨ {name}
            </button>
          ))}
          {/* Individual region buttons */}
          {meta.regions.map((id) => (
            <button
              key={id}
              onClick={() => selectRegion(id, meta.regions)}
              className="px-3 py-1.5 rounded-full text-sm font-bold border-2 transition border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50 active:scale-95"
              style={fills[id] ? { borderColor: fills[id], color: fills[id] } : undefined}
            >
              {meta.names[id]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
