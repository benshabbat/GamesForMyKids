"use client";

import { useAudioSettingsStore } from "@/lib/stores/audioSettingsStore";

export default function RealPhotoToggleButton() {
  const showRealPhotos = useAudioSettingsStore((s) => s.showRealPhotos);
  const toggleRealPhotos = useAudioSettingsStore((s) => s.toggleRealPhotos);

  return (
    <button
      type="button"
      onClick={toggleRealPhotos}
      title={showRealPhotos ? "חזור לאמוג׳י" : "הצג תמונות אמיתיות"}
      aria-label={showRealPhotos ? "חזור לאמוג׳י" : "הצג תמונות אמיתיות"}
      aria-pressed={showRealPhotos}
      className={`
        px-3 py-2 rounded-xl font-bold text-sm min-h-11
        transition-[transform,background-color] duration-150 select-none
        border-2
        ${showRealPhotos
          ? "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105"
          : "bg-white/80 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
        }
      `}
    >
      {showRealPhotos ? "📷" : "🖼️"}
    </button>
  );
}
