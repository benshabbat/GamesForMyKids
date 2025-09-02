/**
 * Hook לניהול זיכרון ובקרת משאבים במשחקים
 * מונע דליפות זיכרון ומשפר ביצועים
 */
'use client';

import { useEffect, useCallback, useRef } from 'react';

interface MemoryManagementOptions {
  maxAudioFiles?: number;
  maxImageFiles?: number;
  cleanupInterval?: number;
  autoCleanup?: boolean;
}

export function useMemoryManagement(options: MemoryManagementOptions = {}) {
  const {
    maxAudioFiles = 10,
    maxImageFiles = 10,
    cleanupInterval = 30000, // 30 שניות
    autoCleanup = true,
  } = options;

  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const audioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());
  const imageElementsRef = useRef<Set<HTMLImageElement>>(new Set());
  const cleanupIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ניקוי אלמנטי אודיו ישנים
  const cleanupAudioElements = useCallback(() => {
    const audioArray = Array.from(audioElementsRef.current);
    if (audioArray.length > maxAudioFiles) {
      const toRemove = audioArray.slice(0, audioArray.length - maxAudioFiles);
      toRemove.forEach(audio => {
        audio.pause();
        audio.src = '';
        audioElementsRef.current.delete(audio);
      });
    }
  }, [maxAudioFiles]);

  // ניקוי תמונות ישנות
  const cleanupImageElements = useCallback(() => {
    const imageArray = Array.from(imageElementsRef.current);
    if (imageArray.length > maxImageFiles) {
      const toRemove = imageArray.slice(0, imageArray.length - maxImageFiles);
      toRemove.forEach(img => {
        img.src = '';
        imageElementsRef.current.delete(img);
      });
    }
  }, [maxImageFiles]);

  // רישום אלמנט אודיו חדש
  const registerAudioElement = useCallback((audio: HTMLAudioElement) => {
    audioElementsRef.current.add(audio);
    cleanupAudioElements();
  }, [cleanupAudioElements]);

  // רישום תמונה חדשה
  const registerImageElement = useCallback((img: HTMLImageElement) => {
    imageElementsRef.current.add(img);
    cleanupImageElements();
  }, [cleanupImageElements]);

  // רישום טיימר
  const registerTimer = useCallback((timerId: NodeJS.Timeout) => {
    timersRef.current.add(timerId);
  }, []);

  // רישום interval
  const registerInterval = useCallback((intervalId: NodeJS.Timeout) => {
    intervalsRef.current.add(intervalId);
  }, []);

  // ניקוי כללי
  const cleanup = useCallback(() => {
    // ניקוי טיימרים
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();

    // ניקוי intervals
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current.clear();

    // ניקוי אודיו
    audioElementsRef.current.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    audioElementsRef.current.clear();

    // ניקוי תמונות
    imageElementsRef.current.forEach(img => {
      img.src = '';
    });
    imageElementsRef.current.clear();
  }, []);

  // הפעלת ניקוי אוטומטי
  useEffect(() => {
    if (autoCleanup) {
      cleanupIntervalRef.current = setInterval(() => {
        cleanupAudioElements();
        cleanupImageElements();
      }, cleanupInterval);
    }

    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, [autoCleanup, cleanupInterval, cleanupAudioElements, cleanupImageElements]);

  // ניקוי בעת unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    registerAudioElement,
    registerImageElement,
    registerTimer,
    registerInterval,
    cleanup,
    getStats: () => ({
      audioElements: audioElementsRef.current.size,
      imageElements: imageElementsRef.current.size,
      timers: timersRef.current.size,
      intervals: intervalsRef.current.size,
    }),
  };
}
