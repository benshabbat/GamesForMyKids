import type { TakiCard, CardColor, CardValue } from './takiTypes';

export const CARD_COLORS: CardColor[] = ['red', 'green', 'blue', 'yellow'];

export function buildDeck(): TakiCard[] {
  let n = 0;
  const id = () => String(n++);
  const cards: TakiCard[] = [];
  for (const color of CARD_COLORS) {
    for (let v = 1; v <= 9; v++) cards.push({ id: id(), color, value: v as CardValue });
    cards.push({ id: id(), color, value: 'taki' });
    cards.push({ id: id(), color, value: 'stop' });
    cards.push({ id: id(), color, value: 'plus' });
  }
  for (let i = 0; i < 2; i++) {
    cards.push({ id: id(), color: 'wild', value: 'colorChange' });
    cards.push({ id: id(), color: 'wild', value: 'superTaki' });
    cards.push({ id: id(), color: 'wild', value: 'king' });
  }
  return cards;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
