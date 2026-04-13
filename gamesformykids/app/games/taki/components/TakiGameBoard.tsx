'use client';

import type { TakiCard, CardColor } from '../useTakiGame';
import { canPlay, COLOR_BG } from '../useTakiGame';
import TakiCardView, { FaceDownCard } from './TakiCardView';

interface TakiGameBoardProps {
  playerHand: TakiCard[];
  computerHand: TakiCard[];
  topCard: TakiCard;
  effectiveColor: CardColor | null;
  displayColor: CardColor;
  inTakiSequence: boolean;
  takiColor: CardColor | null;
  needsColorChoice: boolean;
  currentTurn: 'player' | 'computer';
  message: string;
  deckSize: number;
  playerScore: number;
  computerScore: number;
  onPlayCard: (card: TakiCard) => void;
  onDrawCard: () => void;
  onCloseTaki: () => void;
}

export default function TakiGameBoard({
  playerHand, computerHand, topCard, effectiveColor, displayColor,
  inTakiSequence, takiColor, needsColorChoice, currentTurn,
  message, deckSize, playerScore, computerScore,
  onPlayCard, onDrawCard, onCloseTaki,
}: TakiGameBoardProps) {
  const playableIds = new Set(
    currentTurn === 'player' && !needsColorChoice
      ? playerHand
          .filter(c => canPlay(c, topCard, effectiveColor, inTakiSequence, takiColor))
          .map(c => c.id)
      : [],
  );

  return (
    <div className="flex flex-col min-h-screen p-3 gap-3">

      {/* Score bar */}
      <div className="flex justify-between items-center text-white text-sm font-semibold px-1">
        <span>🧑 אתה: {playerScore}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          currentTurn === 'player' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-gray-300'
        }`}>
          {currentTurn === 'player' ? '← תורך' : 'תור המחשב...'}
        </span>
        <span>🤖 מחשב: {computerScore}</span>
      </div>

      {/* Computer hand (face-down) */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-gray-400 text-xs">🤖 מחשב — {computerHand.length} קלפים</p>
        <div className="flex flex-wrap justify-center gap-1 max-w-full">
          {computerHand.map((_, i) => (
            <FaceDownCard key={i} small />
          ))}
        </div>
      </div>

      {/* Table: deck + top card */}
      <div className="flex justify-center items-center gap-8 flex-1">
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-400 text-xs">{deckSize} קלפים</p>
          <button
            onClick={onDrawCard}
            disabled={currentTurn !== 'player' || inTakiSequence || needsColorChoice}
            className="relative"
            title="משוך קלף"
          >
            <FaceDownCard />
            <span className="absolute -bottom-5 left-0 right-0 text-center text-gray-300 text-[10px]">משוך</span>
          </button>
        </div>

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

      {/* Message area */}
      <div className="text-center px-4">
        <p className="text-yellow-200 text-sm font-medium bg-black/30 rounded-xl py-2 px-3 inline-block max-w-xs">
          {message}
          {playerHand.length <= 2 && (
            <span className="ml-2 font-bold text-yellow-400 animate-bounce inline-block">טאקי! 🃏</span>
          )}
        </p>
      </div>

      {/* Action buttons */}
      {currentTurn === 'player' && (
        <div className="flex justify-center gap-2">
          {inTakiSequence && (
            <button
              onClick={onCloseTaki}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
            >
              ✅ סגור טאקי
            </button>
          )}
          {!inTakiSequence && !needsColorChoice && (
            <button
              onClick={onDrawCard}
              disabled={deckSize === 0}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
            >
              🂠 משוך קלף
            </button>
          )}
        </div>
      )}

      {/* Player hand */}
      <div className="flex flex-col items-center gap-2 pb-2">
        <p className="text-gray-400 text-xs">🧑 הקלפים שלך — {playerHand.length} קלפים</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-full">
          {playerHand.map(card => (
            <TakiCardView
              key={card.id}
              card={card}
              onClick={() => playableIds.has(card.id) && onPlayCard(card)}
              disabled={!playableIds.has(card.id) || currentTurn !== 'player' || needsColorChoice}
              canPlay={playableIds.has(card.id) && currentTurn === 'player'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
