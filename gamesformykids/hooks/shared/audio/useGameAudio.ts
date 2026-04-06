'use client';

import { useEffect } from "react";
import { initSpeechAndAudio } from "@/lib/utils/speech/enhancedSpeechUtils";
import { playSuccessSound as playSound } from "@/lib/utils/game/gameUtils";
import { useGameAudioStore } from "@/lib/stores/gameAudioStore";

/**
 * Hook לניהול אודיו ודיבור במשחקים
 * מנהל את מצב האודיו והדיבור עבור כל המשחקים
 */
export function useGameAudio() {
  const audioContext = useGameAudioStore((s) => s.audioContext);
  const speechEnabled = useGameAudioStore((s) => s.speechEnabled);
  const setAudioContext = useGameAudioStore((s) => s.setAudioContext);
  const setSpeechEnabled = useGameAudioStore((s) => s.setSpeechEnabled);

  useEffect(() => {
    if (!audioContext && !speechEnabled) {
      initSpeechAndAudio(setSpeechEnabled, setAudioContext);
    }
  }, [audioContext, speechEnabled, setSpeechEnabled, setAudioContext]);

  const playSuccessSound = () => {
    playSound(audioContext);
  };

  return {
    audioContext,
    speechEnabled,
    playSuccessSound,
  };
}
