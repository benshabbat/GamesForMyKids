'use client';
import { useDotToDotStore } from './dotToDotStore';
import { getPictureById } from './data/pictures';

export function useDotToDot() {
  const phase = useDotToDotStore((s) => s.phase);
  const pictureId = useDotToDotStore((s) => s.pictureId);
  const connected = useDotToDotStore((s) => s.connected);
  const { selectPicture, clickDot, backToMenu, reset } = useDotToDotStore();

  const picture = pictureId ? getPictureById(pictureId) : undefined;

  return { phase, picture, connected, selectPicture, clickDot, backToMenu, reset };
}
