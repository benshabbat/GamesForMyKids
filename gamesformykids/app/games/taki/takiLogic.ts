import type { TakiCard, CardColor, TakiGameState } from './takiTypes';
import { CARD_COLORS } from './takiDeck';
import { getColorName, getValueLabel } from './takiDisplay';

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
    const newDeck = [...prev.deck];
    const compHand = [...prev.computerHand];
    for (let i = 0; i < 2; i++) { const c = newDeck.pop(); if (c) compHand.push(c); }
    return { ...prev, playerHand: newHand, topCard: card, deck: newDeck, computerHand: compHand, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: `+2! המחשב מושך 2 קלפים${takiMsg}` };
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
    const drawn2 = deck.pop(); if (drawn2) hand = [...hand, drawn2];
    return { ...prev, computerHand: hand, deck, inTakiSequence: false, takiColor: null, effectiveColor, currentTurn: 'player', message: 'המחשב משך קלף. תורך!' };
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
    for (let i = 0; i < 2; i++) { const c = deck.pop(); if (c) playerHand = [...playerHand, c]; }
    return { ...prev, computerHand: hand, playerHand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `+2! המחשב שיחק פלוס  אתה מושך 2 קלפים! תורך!` };
  }

  return { ...prev, computerHand: hand, deck, playerHand, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק ${getColorName(card.color)} ${getValueLabel(card.value)}. תורך!` };
}
