"use client";

import { useAudioSettingsStore } from "@/lib/stores/audioSettingsStore";

export default function NikudToggleButton() {
  const showNikud = useAudioSettingsStore((s) => s.showNikud);
  const toggleNikud = useAudioSettingsStore((s) => s.toggleNikud);

  return (
    <button
      type="button"
      onClick={toggleNikud}
      title={showNikud ? "הסתר ניקוד" : "הצג ניקוד"}
      aria-label={showNikud ? "הסתר ניקוד" : "הצג ניקוד"}
      aria-pressed={showNikud}
      className={`
        px-3 py-2 rounded-xl font-bold text-sm min-h-11
        transition-[transform,background-color] duration-150 select-none
        border-2
        ${showNikud
          ? "bg-indigo-500 text-white border-indigo-600 shadow-lg scale-105"
          : "bg-white/80 text-indigo-700 border-indigo-300 hover:bg-indigo-50"
        }
      `}
    >
      {showNikud ? "אָ" : "א"}
    </button>
  );
}
