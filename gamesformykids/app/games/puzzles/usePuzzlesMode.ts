'use client';
import { useState, useCallback } from 'react';

type GameMode = 'menu' | 'simple' | 'custom';

export function usePuzzlesMode() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const setSimpleMode = useCallback(() => setGameMode('simple'), []);
  const setCustomMode = useCallback(() => setGameMode('custom'), []);

  return { gameMode, setSimpleMode, setCustomMode };
}
