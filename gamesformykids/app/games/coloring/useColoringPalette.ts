'use client';
import { useEffect } from 'react';
import { useColoringStore, PALETTE_COLORS } from './store/coloringStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useColoringPalette() {
  const selectedColor = useColoringStore((s) => s.selectedColor);
  const selectColor   = useColoringStore((s) => s.selectColor);
  const selectedPaletteColor = PALETTE_COLORS.find((c) => c.hex === selectedColor);
  const selectedColorName = selectedPaletteColor?.hebrew ?? '';
  const nikud: string | undefined = selectedPaletteColor?.hebrewNikud;
  const hebrew: string | undefined = selectedPaletteColor?.hebrew;
  const selectedColorSpeech = nikud || hebrew || '';

  // Announce color name via TTS when selection changes
  useEffect(() => {
    if (selectedColorSpeech) speakHebrew(selectedColorSpeech);
  }, [selectedColorSpeech]);

  return { selectedColor, selectColor, selectedColorName };
}
