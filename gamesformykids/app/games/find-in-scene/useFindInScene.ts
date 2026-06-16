'use client';
import { useEffect, useCallback } from 'react';
import { useFindInSceneStore } from './findInSceneStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { SCENES } from './components/sceneData';

export function useFindInScene() {
  const phase     = useFindInSceneStore(s => s.phase);
  const scene     = useFindInSceneStore(s => s.scene);
  const prompt    = useFindInSceneStore(s => s.prompt);
  const targetIds = useFindInSceneStore(s => s.targetIds);
  const foundIds  = useFindInSceneStore(s => s.foundIds);
  const wrongId   = useFindInSceneStore(s => s.wrongId);
  const timeLeft  = useFindInSceneStore(s => s.timeLeft);
  const score     = useFindInSceneStore(s => s.score);
  const { startRound, tapObject, tick, resetGame } = useFindInSceneStore();

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [phase, tick]);

  // Announce prompt when round starts
  useEffect(() => {
    if (phase === 'playing') {
      speakHebrew(prompt.text);
    } else if (phase === 'result') {
      const won = foundIds.size >= targetIds.size;
      speakHebrew(won ? 'מעולה! מצאת את כולם!' : 'נגמר הזמן — בוא ננסה שוב!');
    }
  }, [phase, prompt.text, foundIds.size, targetIds.size]);

  const handleStart = useCallback((sceneId: string) => {
    startRound(sceneId);
  }, [startRound]);

  const handleTap = useCallback((objectId: string) => {
    const result = tapObject(objectId);
    if (result === 'correct') {
      const obj = scene.objects.find(o => o.id === objectId);
      if (obj) speakHebrew(obj.label);
    }
  }, [tapObject, scene.objects]);

  return {
    phase, scene, scenes: SCENES, prompt, targetIds, foundIds, wrongId,
    timeLeft, score,
    handleStart, handleTap, resetGame,
  };
}
