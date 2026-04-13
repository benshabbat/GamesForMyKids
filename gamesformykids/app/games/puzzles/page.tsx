"use client";

import { useState, useCallback } from 'react';
import SimplePuzzleGame from './simple/SimplePuzzleGame';
import CustomPuzzleGame from './custom/CustomPuzzleGame';
import ModeSelection from './ModeSelection';

type GameMode = 'menu' | 'simple' | 'custom';

export default function PuzzleGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const setSimpleMode = useCallback(() => setGameMode('simple'), []);
  const setCustomMode = useCallback(() => setGameMode('custom'), []);

  if (gameMode === 'simple') return <SimplePuzzleGame />;
  if (gameMode === 'custom') return <CustomPuzzleGame />;

  return <ModeSelection onSimple={setSimpleMode} onCustom={setCustomMode} />;
}