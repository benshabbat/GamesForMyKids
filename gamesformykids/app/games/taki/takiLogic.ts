import type { TakiCard, CardColor } from './takiTypes';
import { CARD_COLORS } from './takiDeck';

export function canPlay(
  card: TakiCard,
  topCard: TakiCard,
  effectiveColor: CardColor | null,
  inTakiSequence: boolean,
  takiColor: CardColor | null,
): boolean {
  if (inTakiSequence) {
    const col = takiColor ?? effectiveColor ?? topCard.color;
    return card.color === col;
  }
  if (card.color === 'wild') return true;
  const col = effectiveColor ?? topCard.color;
  if (card.color === col) return true;
  if (card.value === topCard.value) return true;
  return false;
}

export function pickBestCard(
  hand: TakiCard[],
  topCard: TakiCard,
  effectiveColor: CardColor | null,
  inTakiSequence: boolean,
  takiColor: CardColor | null,
): TakiCard | null {
  const playable = hand.filter(c => canPlay(c, topCard, effectiveColor, inTakiSequence, takiColor));
  if (!playable.length) return null;
  const priority = ['plus', 'stop', 'taki', 'superTaki', 'king', 'colorChange'];
  for (const v of priority) {
    const found = playable.find(c => c.value === v);
    if (found) return found;
  }
  return playable[0];
}

export function computerBestColor(hand: TakiCard[]): CardColor {
  const counts: Record<CardColor, number> = { red: 0, green: 0, blue: 0, yellow: 0, wild: 0 };
  for (const c of hand) counts[c.color]++;
  return (CARD_COLORS as CardColor[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
}
