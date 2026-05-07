'use client';

import GameMenuGrid from '@/components/game/shared/GameMenuGrid';
import { useArithmeticGame } from '../useArithmeticGame';
import { LEVELS, LEVEL_EMOJIS, ArithmeticLevel } from '../data/questions';

export default function ArithmeticMenuScreen() {
  const { startGame } = useArithmeticGame();

  return (
    <GameMenuGrid<ArithmeticLevel>
      emoji="➕"
      title="חשבון מהיר"
      description="בחר רמה ותתחיל!"
      gradientClass="from-blue-50 to-indigo-100"
      items={LEVELS}
      getKey={(lv) => lv.id}
      onSelect={startGame}
      renderItem={(lv) => (
        <>
          <div className="text-2xl mb-1">{LEVEL_EMOJIS[lv.id]}</div>
          <div>{lv.label}</div>
          <div className="text-xs opacity-70 mt-1 font-normal">עד {lv.maxNum}{lv.operations.includes('×') ? ' × ' + lv.maxNum : ''}</div>
        </>
      )}
      buttonClass="p-5 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-indigo-500 to-blue-600 text-right"
      columns={2}
      gap={4}
    />
  );
}
