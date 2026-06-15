'use client';
import { useEffect } from 'react';
import { useColoringStore, PALETTE_COLORS } from './store/coloringStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

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
