"use client";

'use client';

import { useState, useEffect } from "react";
import { LoadingScreenProps } from "@/lib/types/ui/core";

const LOADING_EMOJIS = ["🎮", "🌟", "🎨", "📚", "🎯", "🧸"] as const;
const LOADING_TEXTS = [
  "טוען משחקים מהנים...",
  "מכין הפתעות...",
  "מארגן צבעים...",
  "בודק שהכל מושלם...",
  "כמעט מוכן!",
] as const;

export { LOADING_EMOJIS, LOADING_TEXTS };

export interface UseLoadingScreenReturn {
  progress: number;
  currentEmoji: number;
  currentTextIndex: number;
}

export function useLoadingScreen({ onLoadingComplete }: LoadingScreenProps): UseLoadingScreenReturn {
  const [progress, setProgress] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 200);
          }
          return 100;
        }
        return prev + 2;
      });
      setCurrentEmoji((prev) => (prev + 1) % LOADING_EMOJIS.length);
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const currentTextIndex = Math.floor(progress / 20);

  return { progress, currentEmoji, currentTextIndex };
}
