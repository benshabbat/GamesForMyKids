'use client';

import { useState, useCallback } from 'react';

export const PALETTE_COLORS = [
  { hex: '#FF4136', hebrew: 'אדום' },
  { hex: '#FF851B', hebrew: 'כתום' },
  { hex: '#FFDC00', hebrew: 'צהוב' },
  { hex: '#2ECC40', hebrew: 'ירוק' },
  { hex: '#0074D9', hebrew: 'כחול' },
  { hex: '#B10DC9', hebrew: 'סגול' },
  { hex: '#FF69B4', hebrew: 'ורוד' },
  { hex: '#8B4513', hebrew: 'חום' },
  { hex: '#AAAAAA', hebrew: 'אפור' },
  { hex: '#111111', hebrew: 'שחור' },
  { hex: '#7FDBFF', hebrew: 'תכלת' },
  { hex: '#01FF70', hebrew: 'ירוק בהיר' },
] as const;

export type ImageId = 'cat' | 'house' | 'sun' | 'butterfly' | 'flower';

export const IMAGES: { id: ImageId; title: string; emoji: string }[] = [
  { id: 'cat', title: 'חתול', emoji: '🐱' },
  { id: 'house', title: 'בית', emoji: '🏠' },
  { id: 'sun', title: 'שמש', emoji: '☀️' },
  { id: 'butterfly', title: 'פרפר', emoji: '🦋' },
  { id: 'flower', title: 'פרח', emoji: '🌸' },
];

type AllFills = Record<ImageId, Record<string, string>>;

const EMPTY_FILLS: AllFills = {
  cat: {},
  house: {},
  sun: {},
  butterfly: {},
  flower: {},
};

function speakHebrew(text: string) {
  if (typeof window === 'undefined') return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'he-IL';
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function useColoringGame() {
  const [currentImage, setCurrentImage] = useState<ImageId>('cat');
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE_COLORS[0].hex);
  const [allFills, setAllFills] = useState<AllFills>(EMPTY_FILLS);
  const [doneImages, setDoneImages] = useState<Record<ImageId, boolean>>({
    cat: false,
    house: false,
    sun: false,
    butterfly: false,
    flower: false,
  });

  const fills = allFills[currentImage];

  const fillRegion = useCallback(
    (regionId: string, colorableIds: string[]) => {
      setAllFills((prev) => {
        const updated = { ...prev[currentImage], [regionId]: selectedColor };
        const isDone = colorableIds.every((id) => updated[id]);
        if (isDone) {
          setDoneImages((s) => ({ ...s, [currentImage]: true }));
        }
        return { ...prev, [currentImage]: updated };
      });
    },
    [currentImage, selectedColor]
  );

  const clearImage = useCallback(() => {
    setAllFills((prev) => ({ ...prev, [currentImage]: {} }));
    setDoneImages((prev) => ({ ...prev, [currentImage]: false }));
  }, [currentImage]);

  const selectColor = useCallback((hex: string, hebrew: string) => {
    setSelectedColor(hex);
    speakHebrew(hebrew);
  }, []);

  const selectImage = useCallback((id: ImageId) => {
    setCurrentImage(id);
  }, []);

  return {
    currentImage,
    selectedColor,
    fills,
    showDone: doneImages[currentImage],
    fillRegion,
    clearImage,
    selectColor,
    selectImage,
  };
}
