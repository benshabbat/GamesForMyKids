"use client";

import type { ComponentTypes } from "@/lib/types";

/**
 * קומפוננט להצגת רמזים במשחק
 */
export default function GameHints({
  hints,
  currentHintIndex = 0,
  showHints = true,
  onHintChange
}: ComponentTypes.GameHintsProps) {
  if (!showHints || !hints || hints.length === 0) {
    return null;
  }

  const currentHint = hints[currentHintIndex];

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-blue-600 font-bold">💡 רמז:</span>
        <span className="text-sm text-blue-500">
          {currentHintIndex + 1} מתוך {hints.length}
        </span>
      </div>
      
      {currentHint && (
        <p className="text-blue-800">{currentHint.text}</p>
      )}
      
      {hints.length > 1 && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onHintChange?.(Math.max(0, currentHintIndex - 1))}
            disabled={currentHintIndex === 0}
            className="px-3 py-1 bg-blue-200 text-blue-800 rounded disabled:opacity-50"
          >
            ← קודם
          </button>
          <button
            onClick={() => onHintChange?.(Math.min(hints.length - 1, currentHintIndex + 1))}
            disabled={currentHintIndex === hints.length - 1}
            className="px-3 py-1 bg-blue-200 text-blue-800 rounded disabled:opacity-50"
          >
            הבא →
          </button>
        </div>
      )}
    </div>
  );
}
