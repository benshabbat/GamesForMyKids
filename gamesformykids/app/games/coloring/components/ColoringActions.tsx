'use client';

import { useColoringStore } from '../store/coloringStore';
import { IMAGE_COMPONENTS } from './imageComponents';

export function ColoringActions() {
  const currentImage = useColoringStore((s) => s.currentImage);
  const customImage = useColoringStore((s) => s.customImage);
  const clearImage = useColoringStore((s) => s.clearImage);
  const undo = useColoringStore((s) => s.undo);
  const regionHistoryLength = useColoringStore((s) => s.fillHistory[s.currentImage]?.length ?? 0);
  const floodFillCanUndo = useColoringStore((s) => s.floodFillCanUndo);

  const canUndo =
    !customImage && IMAGE_COMPONENTS[currentImage].kind === 'regions' ? regionHistoryLength > 0 : floodFillCanUndo;

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={undo}
        disabled={!canUndo}
        className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md disabled:opacity-40 disabled:hover:bg-purple-400"
      >
        ↩️ בטל
      </button>
      <button
        onClick={clearImage}
        className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full font-bold transition-colors shadow-md"
      >
        🗑️ נקה
      </button>
    </div>
  );
}
