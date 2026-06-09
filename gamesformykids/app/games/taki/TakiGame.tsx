'use client';

import { useTakiGame } from './useTakiGame';
import {
  TakiMenuScreen,
  TakiResultScreen,
  TakiGameBoard,
  TakiColorPicker,
} from './components';

export default function TakiGame() {
  const { phase, needsColorChoice, currentTurn } = useTakiGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-950 to-teal-950 select-none">
      {needsColorChoice && currentTurn === 'player' && <TakiColorPicker />}
      {phase === 'menu' && <TakiMenuScreen />}
      {(phase === 'won' || phase === 'lost') && <TakiResultScreen />}
      {phase === 'playing' && <TakiGameBoard />}
    </div>
  );
}

