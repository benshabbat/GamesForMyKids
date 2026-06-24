"use client";

import { useAudioSettingsStore } from "@/lib/stores/audioSettingsStore";

export default function BilingualToggleButton() {
  const showEnglish = useAudioSettingsStore((s) => s.showEnglish);
  const toggleEnglish = useAudioSettingsStore((s) => s.toggleEnglish);

  return (
    <button
      type="button"
      onClick={toggleEnglish}
      title={showEnglish ? "הסתר תרגום לאנגלית" : "הצג תרגום לאנגלית"}
      aria-label={showEnglish ? "הסתר תרגום לאנגלית" : "הצג תרגום לאנגלית"}
      aria-pressed={showEnglish}
      className={`
        px-3 py-2 rounded-xl font-bold text-sm min-h-11
        transition-[transform,background-color] duration-150 select-none
        border-2
        ${showEnglish
          ? "bg-blue-500 text-white border-blue-600 shadow-lg scale-105"
          : "bg-white/80 text-blue-700 border-blue-300 hover:bg-blue-50"
        }
      `}
    >
      {showEnglish ? "🇬🇧" : "🇮🇱"}
    </button>
  );
}
