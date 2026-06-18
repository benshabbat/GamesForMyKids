'use client';
import { useState } from 'react';

type GameMode = 'menu' | 'simple' | 'custom';

export function usePuzzlesMode() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const setSimpleMode = () => setGameMode('simple');
  const setCustomMode = () => setGameMode('custom');

  return { gameMode, setSimpleMode, setCustomMode };
}
