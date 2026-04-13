'use client';

import { useTakiStore } from './takiGameStore';
import {
  TakiMenuScreen,
  TakiResultScreen,
  TakiGameBoard,
  TakiColorPicker,
} from './components';
import TakiComputerAI from './components/TakiComputerAI';

export default function TakiGame() {
  const phase = useTakiStore(s => s.phase);
  const needsColorChoice = useTakiStore(s => s.needsColorChoice);
  const currentTurn = useTakiStore(s => s.currentTurn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-950 to-teal-950 select-none" dir="rtl">
      <TakiComputerAI />
      {needsColorChoice && currentTurn === 'player' && <TakiColorPicker />}
      {phase === 'menu' && <TakiMenuScreen />}
      {(phase === 'won' || phase === 'lost') && <TakiResultScreen />}
      {phase === 'playing' && <TakiGameBoard />}
    </div>
  );
}

