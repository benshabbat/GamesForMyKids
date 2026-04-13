"use client";

import CustomPuzzleGame from './CustomPuzzleGame';
import SimplePuzzleGame from './SimplePuzzleGame';
import ModeSelection from './ModeSelection';
import { usePuzzlePage } from './usePuzzlePage';

export default function PuzzleGamePage() {
  const { gameMode, setSimpleMode, setCustomMode } = usePuzzlePage();

  if (gameMode === 'simple') return <SimplePuzzleGame />;
  if (gameMode === 'custom') return <CustomPuzzleGame />;

  return <ModeSelection onSimple={setSimpleMode} onCustom={setCustomMode} />;
}