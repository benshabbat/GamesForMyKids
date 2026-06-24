"use client";

import { useAmbientMusic } from "@/hooks/shared/audio/useAmbientMusic";

export default function MusicToggleButton() {
  const { enabled, toggle } = useAmbientMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      title={enabled ? "כבה מוזיקת רקע" : "הפעל מוזיקת רקע"}
      aria-label={enabled ? "כבה מוזיקת רקע" : "הפעל מוזיקת רקע"}
      aria-pressed={enabled}
      className={`
        px-3 py-2 rounded-xl font-bold text-sm min-h-11
        transition-[transform,background-color] duration-150 select-none
        border-2
        ${enabled
          ? "bg-purple-500 text-white border-purple-600 shadow-lg scale-105"
          : "bg-white/80 text-purple-700 border-purple-300 hover:bg-purple-50"
        }
      `}
    >
      {enabled ? "🎵" : "🔇"}
    </button>
  );
}
