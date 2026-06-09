'use client';
import { useEffect } from 'react';
import { useColoringStore, PALETTE_COLORS } from './store/coloringStore';

function speakHebrew(text: string) {
  if (typeof window === 'undefined') return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'he-IL';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function useColoringPalette() {
  const selectedColor = useColoringStore((s) => s.selectedColor);
  const selectColor   = useColoringStore((s) => s.selectColor);
  const selectedColorName = PALETTE_COLORS.find((c) => c.hex === selectedColor)?.hebrew ?? '';

  // Announce color name via TTS when selection changes
  useEffect(() => {
    if (selectedColorName) speakHebrew(selectedColorName);
  }, [selectedColorName]);

  return { selectedColor, selectColor, selectedColorName };
}
