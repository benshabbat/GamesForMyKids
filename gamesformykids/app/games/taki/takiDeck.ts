import type { TakiCard, CardColor, CardValue } from './takiTypes';
import { shuffle } from '@/lib/utils';

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
