"use client";

import { useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { BaseGameItem } from "@/lib/types/core/base";
import { useSpeechRecognition } from "@/hooks/shared/audio/useSpeechRecognition";

interface VoiceAnswerButtonProps {
  options: BaseGameItem[];
  onMatch: (item: BaseGameItem) => void;
}

function stripNikud(text: string): string {
  return text.replace(/[ְ-ׇ׳״]/g, "").trim();
}

function findBestMatch(transcript: string, options: BaseGameItem[]): BaseGameItem | null {
  const normalized = stripNikud(transcript.toLowerCase());
  if (!normalized) return null;

  // Exact match first (Hebrew or English)
  const exact = options.find((item) => {
    const h = stripNikud(item.hebrew.toLowerCase());
    const e = item.english.toLowerCase();
    return normalized === h || normalized === e;
  });
  if (exact) return exact;

  // Contains match
  return options.find((item) => {
    const h = stripNikud(item.hebrew.toLowerCase());
    return normalized.includes(h) || h.includes(normalized);
  }) ?? null;
}

export default function VoiceAnswerButton({ options, onMatch }: VoiceAnswerButtonProps) {
  const handleResult = useCallback(
    ({ transcript }: { transcript: string }) => {
      const match = findBestMatch(transcript, options);
      if (match) onMatch(match);
    },
    [options, onMatch],
  );

  const { isListening, isSupported, permissionDenied, startListening, stopListening } =
    useSpeechRecognition({ onResult: handleResult });

  if (!isSupported || permissionDenied) return null;

  return (
    <button
      type="button"
      onPointerDown={startListening}
      onPointerUp={stopListening}
      onPointerLeave={stopListening}
      aria-label={isListening ? "מפסיק להאזין" : "דבר את התשובה"}
      title={isListening ? "מפסיק להאזין" : "לחץ וחזק — דבר את התשובה בעברית"}
      className={`
        flex items-center gap-2 px-4 py-3 min-h-11 rounded-xl font-bold text-base
        transition-[transform,background-color] duration-150 select-none border-2
        ${isListening
          ? "bg-red-500 text-white border-red-600 scale-105 animate-pulse"
          : "bg-white/80 text-indigo-700 border-indigo-300 hover:bg-indigo-50"
        }
      `}
    >
      {isListening ? (
        <>
          <MicOff className="w-5 h-5" aria-hidden="true" />
          <span>מאזין...</span>
        </>
      ) : (
        <>
          <Mic className="w-5 h-5" aria-hidden="true" />
          <span>דבר</span>
        </>
      )}
    </button>
  );
}
