'use client';

import { useTakiStore } from '../takiGameStore';

export default function TakiActionButtons() {
  const currentTurn = useTakiStore(s => s.currentTurn);
  const inTakiSequence = useTakiStore(s => s.inTakiSequence);
  const needsColorChoice = useTakiStore(s => s.needsColorChoice);
  const deck = useTakiStore(s => s.deck);
  const drawCard = useTakiStore(s => s.drawCard);
  const closeTaki = useTakiStore(s => s.closeTaki);

  if (currentTurn !== 'player') return null;

  return (
    <div className="flex justify-center gap-2">
      {inTakiSequence && (
        <button
          onClick={closeTaki}
          className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
        >
          ✅ סגור טאקי
        </button>
      )}
      {!inTakiSequence && !needsColorChoice && (
        <button
          onClick={drawCard}
          disabled={deck.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
        >
          🂠 משוך קלף
        </button>
      )}
    </div>
  );
}
