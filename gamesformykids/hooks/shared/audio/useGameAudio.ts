import { useState, useEffect } from "react";
import { initSpeechAndAudio } from "@/lib/utils/speech/enhancedSpeechUtils";
import { playSuccessSound as playSound } from "@/lib/utils/game/gameUtils";

/**
 * Hook לניהול אודיו ודיבור במשחקים
 * מנהל את מצב האודיו והדיבור עבור כל המשחקים
 */
export function useGameAudio() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  useEffect(() => {
    initSpeechAndAudio(setSpeechEnabled, setAudioContext);
  }, []);

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  return {
    audioContext,
    speechEnabled,
    playSuccessSound,
  };
}
