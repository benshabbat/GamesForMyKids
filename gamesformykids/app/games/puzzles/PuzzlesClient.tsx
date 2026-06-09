'use client';

import { usePuzzlesMode } from './usePuzzlesMode';
import SimplePuzzleGame from './simple/SimplePuzzleGame';
import CustomPuzzleGame from './custom/CustomPuzzleGame';
import ModeSelection from './ModeSelection';

export default function PuzzlesClient() {
  const { gameMode, setSimpleMode, setCustomMode } = usePuzzlesMode();

  if (gameMode === 'simple') return <SimplePuzzleGame />;
  if (gameMode === 'custom') return <CustomPuzzleGame />;

  return <ModeSelection onSimple={setSimpleMode} onCustom={setCustomMode} />;
}
