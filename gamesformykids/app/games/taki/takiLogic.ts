import type { TakiCard, CardColor, TakiGameState } from './takiTypes';
import { CARD_COLORS, buildDeck } from './takiDeck';
import { getColorName, getValueLabel } from './takiDisplay';
import { shuffle } from '@/lib/utils/game/cardUtils';

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
  return playable[0] ?? null;
}

export function computerBestColor(hand: TakiCard[]): CardColor {
  const counts: Record<CardColor, number> = { red: 0, green: 0, blue: 0, yellow: 0, wild: 0 };
  for (const c of hand) counts[c.color]++;
  return (CARD_COLORS as CardColor[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
}

/**
 * Draws `count` cards from the draw pile. When the pile runs out, the discard pile
 * (every card that is not in the pile, a hand, or on top of the table) is shuffled
 * into a new draw pile, so the game can never get stuck with nothing to draw.
 *
 * `inPlay` must list every card currently held by a player plus the table's top card.
 * The discards are derived from the full deck (buildDeck ids are stable) rather than
 * tracked in state, since cards played inside a Taki run never become the top card.
 * The pile is only left empty when there is truly nothing to recycle.
 */
export function drawCards(
  deck: TakiCard[],
  count: number,
  inPlay: TakiCard[],
): { drawn: TakiCard[]; deck: TakiCard[] } {
  const pile = [...deck];
  const drawn: TakiCard[] = [];
  const refill = () => {
    const held = new Set([...inPlay, ...drawn].map(c => c.id));
    pile.push(...shuffle(buildDeck().filter(c => !held.has(c.id))));
  };
  while (drawn.length < count) {
    if (pile.length === 0) refill();
    const card = pile.pop();
    if (!card) break;
    drawn.push(card);
  }
  if (pile.length === 0) refill();
  return { drawn, deck: pile };
}

// Pure state-transition helpers extracted from the store's actions.
// Both take the previous state and a legal move, and return the full next state.
// The store still owns validation and calling `set` — these just compute the result.

export function resolvePlayCard(prev: TakiGameState, card: TakiCard): TakiGameState {
  const newHand = prev.playerHand.filter(c => c.id !== card.id);
  if (newHand.length === 0) {
    return { ...prev, playerHand: newHand, topCard: card, phase: 'won', playerScore: prev.playerScore + 1, inTakiSequence: false, takiColor: null, effectiveColor: null, message: ' ניצחת! כל הקלפים!' };
  }

  const takiMsg = newHand.length <= 2 ? '  טאקי! ' : '';

  if (card.value === 'taki') {
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: true, takiColor: card.color, needsColorChoice: false, message: ` טאקי ${getColorName(card.color)}! שחק עוד קלפים באותו צבע ולחץ "סגור טאקי"${takiMsg}` };
  }
  if (card.value === 'superTaki') {
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ` סופר טאקי! בחר צבע  ואז שחק קלפים באותו צבע` };
  }
  if (card.value === 'stop') {
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'player', message: ` עצור! המחשב מדלג. תורך שוב!${takiMsg}` };
  }
  if (card.value === 'king') {
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ` מלך! בחר צבע  המחשב ידולג` };
  }
  if (card.value === 'colorChange') {
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ' שנה צבע  בחר צבע חדש' };
  }
  if (card.value === 'plus') {
    const { drawn, deck: newDeck } = drawCards(prev.deck, 2, [...newHand, ...prev.computerHand, card]);
    const compHand = [...prev.computerHand, ...drawn];
    return { ...prev, playerHand: newHand, topCard: card, deck: newDeck, computerHand: compHand, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: `+2! המחשב מושך 2 קלפים${takiMsg}` };
  }
  if (prev.inTakiSequence && card.color === prev.takiColor) {
    // Inside a Taki run: the child keeps the turn until pressing "סגור טאקי"
    return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, needsColorChoice: false, currentTurn: 'player', message: `שיחקת ${getColorName(card.color)} ${card.value}. שחק עוד קלפים באותו צבע או לחץ "סגור טאקי"${takiMsg}` };
  }
  return { ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: `שיחקת ${getColorName(card.color)} ${card.value}. תור המחשב...${takiMsg}` };
}

export function resolveComputerTurn(prev: TakiGameState): TakiGameState {
  let hand = [...prev.computerHand];
  const deck = [...prev.deck];
  let playerHand = [...prev.playerHand];
  let topCard = prev.topCard;
  const effectiveColor = prev.effectiveColor;

  const card = pickBestCard(hand, topCard, effectiveColor, prev.inTakiSequence, prev.takiColor);

  if (!card) {
    if (prev.inTakiSequence) {
      return { ...prev, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: 'המחשב סגר טאקי. תורך!' };
    }
    const { drawn, deck: newDeck } = drawCards(deck, 1, [...hand, ...playerHand, topCard]);
    hand = [...hand, ...drawn];
    return { ...prev, computerHand: hand, deck: newDeck, inTakiSequence: false, takiColor: null, effectiveColor, currentTurn: 'player', message: drawn.length ? 'המחשב משך קלף. תורך!' : 'המחשב עבר תור. תורך!' };
  }

  hand = hand.filter(c => c.id !== card.id);
  topCard = card;

  if (hand.length === 0) {
    return { ...prev, computerHand: hand, topCard, phase: 'lost', computerScore: prev.computerScore + 1, inTakiSequence: false, takiColor: null, effectiveColor: null, message: ' המחשב ניצח! נסה שוב' };
  }

  if (card.value === 'taki') {
    const col = card.color;
    while (true) {
      const next = hand.find(c => c.color === col);
      if (!next) break;
      hand = hand.filter(c => c.id !== next.id);
      topCard = next;
      if (hand.length === 0) break;
    }
    if (hand.length === 0) {
      return { ...prev, computerHand: hand, deck, topCard, phase: 'lost', computerScore: prev.computerScore + 1, message: ' המחשב ניצח עם טאקי!' };
    }
    return { ...prev, computerHand: hand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק טאקי ${getColorName(col)}! תורך!` };
  }

  if (card.value === 'superTaki') {
    const col = computerBestColor(hand);
    while (true) {
      const next = hand.find(c => c.color === col);
      if (!next) break;
      hand = hand.filter(c => c.id !== next.id);
      topCard = next;
      if (hand.length === 0) break;
    }
    if (hand.length === 0) {
      return { ...prev, computerHand: hand, deck, topCard, phase: 'lost', computerScore: prev.computerScore + 1, message: ' המחשב ניצח עם סופר טאקי!' };
    }
    return { ...prev, computerHand: hand, deck, topCard: card, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק סופר טאקי ${getColorName(col)}! תורך!` };
  }

  if (card.value === 'stop') {
    return { ...prev, computerHand: hand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: ' המחשב שיחק עצור. תורך!' };
  }

  if (card.value === 'king') {
    const col = computerBestColor(hand);
    return { ...prev, computerHand: hand, deck, topCard, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'computer', turnId: prev.turnId + 1, message: ` המחשב שיחק מלך! בחר ${getColorName(col)} ואתה מדולג! תור המחשב` };
  }

  if (card.value === 'colorChange') {
    const col = computerBestColor(hand);
    return { ...prev, computerHand: hand, deck, topCard, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: ` המחשב שינה צבע ל${getColorName(col)}! תורך!` };
  }

  if (card.value === 'plus') {
    const { drawn, deck: newDeck } = drawCards(deck, 2, [...hand, ...playerHand, topCard]);
    playerHand = [...playerHand, ...drawn];
    return { ...prev, computerHand: hand, playerHand, deck: newDeck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `+2! המחשב שיחק פלוס  אתה מושך 2 קלפים! תורך!` };
  }

  return { ...prev, computerHand: hand, deck, playerHand, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק ${getColorName(card.color)} ${getValueLabel(card.value)}. תורך!` };
}
