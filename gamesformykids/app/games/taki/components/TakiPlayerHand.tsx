'use client';

import { canPlay } from '../takiGameStore';
import { useTakiGame } from '../useTakiGame';
import TakiCardView from './TakiCardView';

export default function TakiPlayerHand() {
  const { playerHand, topCard, effectiveColor, inTakiSequence, takiColor, needsColorChoice, currentTurn, playCard } = useTakiGame();

  const playableIds = new Set(
    currentTurn === 'player' && !needsColorChoice
      ? playerHand
          .filter(c => canPlay(c, topCard, effectiveColor, inTakiSequence, takiColor))
          .map(c => c.id)
      : [],
  );

  return (
    <div className="flex flex-col items-center gap-2 pb-2">
      <p className="text-gray-400 text-xs">🧑 הקלפים שלך — {playerHand.length} קלפים</p>
      <div className="flex flex-wrap justify-center gap-2 max-w-full">
        {playerHand.map(card => (
          <TakiCardView
            key={card.id}
            card={card}
            onClick={() => playableIds.has(card.id) && playCard(card)}
            disabled={!playableIds.has(card.id) || currentTurn !== 'player' || needsColorChoice}
            canPlay={playableIds.has(card.id) && currentTurn === 'player'}
          />
        ))}
      </div>
    </div>
  );
}
