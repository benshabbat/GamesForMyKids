'use client';

import { useEffect, useCallback } from "react";
import { initSpeechAndAudio } from "@/lib/utils/speech/enhancedSpeechUtils";
import { useGameAudioStore } from "@/lib/stores/gameAudioStore";
import { useSoundThemeStore } from "@/lib/stores/soundThemeStore";
import { playThemedSound } from "@/lib/utils/game/soundThemes";

/**
 * Hook לניהול אודיו ודיבור במשחקים
 * מנהל את מצב האודיו והדיבור עבור כל המשחקים
 */
export function useGameAudio() {
  const audioContext = useGameAudioStore((s) => s.audioContext);
  const speechEnabled = useGameAudioStore((s) => s.speechEnabled);
  const setAudioContext = useGameAudioStore((s) => s.setAudioContext);
  const setSpeechEnabled = useGameAudioStore((s) => s.setSpeechEnabled);
  const theme = useSoundThemeStore((s) => s.theme);

  useEffect(() => {
    if (!audioContext && !speechEnabled) {
      initSpeechAndAudio(setSpeechEnabled, setAudioContext);
    }
  }, [audioContext, speechEnabled, setSpeechEnabled, setAudioContext]);

  const playSuccessSound = useCallback(() => {
    playThemedSound(audioContext, 'success', theme);
  }, [audioContext, theme]);

  const playWrongSound = useCallback(() => {
    playThemedSound(audioContext, 'wrong', theme);
  }, [audioContext, theme]);

  const playLevelUpSound = useCallback(() => {
    playThemedSound(audioContext, 'levelUp', theme);
  }, [audioContext, theme]);

  return {
    audioContext,
    speechEnabled,
    playSuccessSound,
    playWrongSound,
    playLevelUpSound,
  };
}
