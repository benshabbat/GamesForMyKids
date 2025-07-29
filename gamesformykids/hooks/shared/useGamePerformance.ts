/**
 * Hook לשיפור ביצועי המשחקים
 * מטפל בזיכרון, preloading ואנימציות חלקות
 */

import { useEffect, useRef, useCallback } from 'react';
import { BaseGameItem } from '@/lib/types/base';

interface UseGamePerformanceProps {
  items: BaseGameItem[];
  currentChallenge: BaseGameItem | null;
}

export function useGamePerformance({ items, currentChallenge }: UseGamePerformanceProps) {
  const audioPreloadRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const imagePreloadRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const animationFrameRef = useRef<number | null>(null);

  // Preload audio files for better performance (currently not supported by BaseGameItem)
  const preloadAudio = useCallback(async (items: BaseGameItem[]) => {
    // Note: BaseGameItem doesn't have audioUrl property
    // This is prepared for future enhancement
    const audioPromises = items.map(async (item) => {
      // Future: if (item.audioUrl && !audioPreloadRef.current.has(item.name))
      console.log(`Audio preloading prepared for: ${item.name}`);
    });

    await Promise.allSettled(audioPromises);
  }, []);

  // Preload images for smoother experience (currently not supported by BaseGameItem)
  const preloadImages = useCallback(async (items: BaseGameItem[]) => {
    // Note: BaseGameItem doesn't have imageUrl property
    // This is prepared for future enhancement
    const imagePromises = items.map(async (item) => {
      // Future: if (item.imageUrl && !imagePreloadRef.current.has(item.name))
      console.log(`Image preloading prepared for: ${item.name}`);
    });

    await Promise.allSettled(imagePromises);
  }, []);

  // Optimized animation helper
  const requestOptimizedAnimationFrame = useCallback((callback: () => void) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(callback);
  }, []);

  // Get preloaded audio
  const getPreloadedAudio = useCallback((itemName: string): HTMLAudioElement | null => {
    return audioPreloadRef.current.get(itemName) || null;
  }, []);

  // Get preloaded image
  const getPreloadedImage = useCallback((itemName: string): HTMLImageElement | null => {
    return imagePreloadRef.current.get(itemName) || null;
  }, []);

  // Memory cleanup
  const cleanup = useCallback(() => {
    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Clear audio cache
    audioPreloadRef.current.forEach((audio) => {
      audio.pause();
      audio.src = '';
    });
    audioPreloadRef.current.clear();

    // Clear image cache
    imagePreloadRef.current.clear();
  }, []);

  // Initialize preloading
  useEffect(() => {
    if (items.length > 0) {
      preloadAudio(items);
      preloadImages(items);
    }

    return cleanup;
  }, [items, preloadAudio, preloadImages, cleanup]);

  // Preload next likely items based on current challenge
  useEffect(() => {
    if (currentChallenge && items.length > 0) {
      // Get next 3-5 likely items to appear
      const currentIndex = items.findIndex(item => item.name === currentChallenge.name);
      const nextItems = items.slice(currentIndex + 1, currentIndex + 6);
      
      if (nextItems.length > 0) {
        preloadAudio(nextItems);
        preloadImages(nextItems);
      }
    }
  }, [currentChallenge, items, preloadAudio, preloadImages]);

  return {
    getPreloadedAudio,
    getPreloadedImage,
    requestAnimationFrame: requestOptimizedAnimationFrame,
    cleanup,
    isAudioPreloaded: (itemName: string) => audioPreloadRef.current.has(itemName),
    isImagePreloaded: (itemName: string) => imagePreloadRef.current.has(itemName),
  };
}
