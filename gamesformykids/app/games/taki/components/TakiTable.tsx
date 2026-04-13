'use client';

import { COLOR_BG, useTakiStore } from '../takiGameStore';
import TakiCardView, { FaceDownCard } from './TakiCardView';

export default function TakiTable() {
  const topCard = useTakiStore(s => s.topCard);
  const effectiveColor = useTakiStore(s => s.effectiveColor);
  const inTakiSequence = useTakiStore(s => s.inTakiSequence);
  const takiColor = useTakiStore(s => s.takiColor);
  const needsColorChoice = useTakiStore(s => s.needsColorChoice);
  const currentTurn = useTakiStore(s => s.currentTurn);
  const deck = useTakiStore(s => s.deck);
  const drawCard = useTakiStore(s => s.drawCard);

  const displayColor = (inTakiSequence && takiColor) ? takiColor : effectiveColor ?? topCard.color;

  return (
    <div className="flex justify-center items-center gap-8 flex-1">
      {/* Deck */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-gray-400 text-xs">{deck.length} קלפים</p>
        <button
          onClick={drawCard}
          disabled={currentTurn !== 'player' || inTakiSequence || needsColorChoice}
          className="relative"
          title="משוך קלף"
        >
          <FaceDownCard />
          <span className="absolute -bottom-5 left-0 right-0 text-center text-gray-300 text-[10px]">משוך</span>
        </button>
      </div>

      {/* Top card */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-400 text-xs">קלף עליון</p>
        <div className="relative">
          <TakiCardView card={{ ...topCard, color: displayColor }} disabled />
          {effectiveColor && effectiveColor !== topCard.color && (
            <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white ${COLOR_BG[effectiveColor]}`} />
          )}
        </div>
        {inTakiSequence && (
          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
            🃏 רצף טאקי
          </span>
        )}
      </div>
    </div>
  );
}
