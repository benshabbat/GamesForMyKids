"use client";

import { useState, useCallback } from 'react';
import PuzzleGame from './PuzzleGame';
import ModeSelection from './ModeSelection';

type GameMode = 'menu' | 'simple' | 'custom';

export default function PuzzleGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const setSimpleMode = useCallback(() => setGameMode('simple'), []);
  const setCustomMode = useCallback(() => setGameMode('custom'), []);

  if (gameMode === 'simple') return <PuzzleGame variant="simple" />;
  if (gameMode === 'custom') return <PuzzleGame variant="custom" />;

  return <ModeSelection onSimple={setSimpleMode} onCustom={setCustomMode} />;
}