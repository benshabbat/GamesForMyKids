'use client';

import { canPlay, useTakiStore } from '../takiGameStore';
import TakiCardView from './TakiCardView';

export default function TakiPlayerHand() {
  const playerHand = useTakiStore(s => s.playerHand);
  const topCard = useTakiStore(s => s.topCard);
  const effectiveColor = useTakiStore(s => s.effectiveColor);
  const inTakiSequence = useTakiStore(s => s.inTakiSequence);
  const takiColor = useTakiStore(s => s.takiColor);
  const needsColorChoice = useTakiStore(s => s.needsColorChoice);
  const currentTurn = useTakiStore(s => s.currentTurn);
  const playCard = useTakiStore(s => s.playCard);

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
