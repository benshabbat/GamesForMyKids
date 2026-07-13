'use client';

import { useColoringStore } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';
import { FloodFillCanvas } from './FloodFillCanvas';

export function ColoringCanvas() {
  const currentImage = useColoringStore((s) => s.currentImage);
  const fills = useColoringStore((s) => s.allFills[s.currentImage]);
  const showDone = useColoringStore((s) => s.doneImages[s.currentImage]);
  const selectRegion = useColoringStore((s) => s.selectRegion);
  const fillGroup = useColoringStore((s) => s.fillGroup);
  const clearImage = useColoringStore((s) => s.clearImage);

  const meta = IMAGE_COMPONENTS[currentImage];

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

      {meta.kind === 'regions' ? (
        <>
          <div className="w-full aspect-square max-w-xs mx-auto">
            <meta.Component fills={fills} onFill={(id) => selectRegion(id, meta.regions)} />
          </div>

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
        </>
      ) : (
        <div className="w-full aspect-square max-w-xs mx-auto">
          <FloodFillCanvas key={currentImage} imageId={currentImage} meta={meta} />
        </div>
      )}
    </div>
  );
}
