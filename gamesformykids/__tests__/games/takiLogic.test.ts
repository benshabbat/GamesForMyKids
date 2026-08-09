import { describe, expect, it } from 'vitest';
import { canPlay, pickBestCard, computerBestColor } from '@/app/games/taki/takiLogic';
import { buildDeck, CARD_COLORS } from '@/app/games/taki/takiDeck';
import type { TakiCard, CardColor, CardValue } from '@/app/games/taki/takiTypes';

let nextId = 0;
const card = (color: CardColor, value: CardValue): TakiCard => ({
  id: `c${nextId++}`,
  color,
  value,
});

describe('buildDeck', () => {
  it('builds the full 4-colour deck plus the wild cards', () => {
    const deck = buildDeck();

    // 4 colours x (9 numbers + taki + stop + plus) = 48, plus 2 each of the
    // three wild cards = 54.
    expect(deck).toHaveLength(54);
  });

  it('gives every card a unique id, so hand filtering by id is safe', () => {
    const deck = buildDeck();
    expect(new Set(deck.map((c) => c.id)).size).toBe(deck.length);
  });

  it('includes exactly two of each wild card', () => {
    const wilds = buildDeck().filter((c) => c.color === 'wild');

    expect(wilds.filter((c) => c.value === 'colorChange')).toHaveLength(2);
    expect(wilds.filter((c) => c.value === 'superTaki')).toHaveLength(2);
    expect(wilds.filter((c) => c.value === 'king')).toHaveLength(2);
  });
});

describe('canPlay', () => {
  const redFive = card('red', 5);

  describe('normal play', () => {
    it('allows a matching colour', () => {
      expect(canPlay(card('red', 3), redFive, null, false, null)).toBe(true);
    });

    it('allows a matching value in another colour', () => {
      expect(canPlay(card('blue', 5), redFive, null, false, null)).toBe(true);
    });

    it('rejects a card matching neither colour nor value', () => {
      expect(canPlay(card('blue', 3), redFive, null, false, null)).toBe(false);
    });

    it('always allows a wild card', () => {
      expect(canPlay(card('wild', 'king'), redFive, null, false, null)).toBe(true);
      expect(canPlay(card('wild', 'colorChange'), redFive, null, false, null)).toBe(true);
      expect(canPlay(card('wild', 'superTaki'), redFive, null, false, null)).toBe(true);
    });

    it('matches action cards by value across colours', () => {
      expect(canPlay(card('blue', 'stop'), card('red', 'stop'), null, false, null)).toBe(true);
    });
  });

  describe('after a colour change', () => {
    it('honours the chosen colour over the top card colour', () => {
      // Top card is red, but a king set the effective colour to blue.
      expect(canPlay(card('blue', 3), redFive, 'blue', false, null)).toBe(true);
      expect(canPlay(card('red', 3), redFive, 'blue', false, null)).toBe(false);
    });

    it('still allows a value match on the top card', () => {
      expect(canPlay(card('green', 5), redFive, 'blue', false, null)).toBe(true);
    });
  });

  describe('inside a taki sequence', () => {
    it('allows only the sequence colour', () => {
      expect(canPlay(card('red', 3), redFive, null, true, 'red')).toBe(true);
      expect(canPlay(card('blue', 3), redFive, null, true, 'red')).toBe(false);
    });

    it('rejects a wild card, which is otherwise always playable', () => {
      expect(canPlay(card('wild', 'king'), redFive, null, true, 'red')).toBe(false);
    });

    it('rejects a value match in the wrong colour', () => {
      expect(canPlay(card('blue', 5), redFive, null, true, 'red')).toBe(false);
    });

    it('falls back to the effective colour when no taki colour is set', () => {
      expect(canPlay(card('blue', 3), redFive, 'blue', true, null)).toBe(true);
      expect(canPlay(card('red', 3), redFive, 'blue', true, null)).toBe(false);
    });

    it('falls back to the top card colour when neither is set', () => {
      expect(canPlay(card('red', 3), redFive, null, true, null)).toBe(true);
      expect(canPlay(card('blue', 3), redFive, null, true, null)).toBe(false);
    });
  });
});

describe('pickBestCard', () => {
  const redFive = card('red', 5);

  it('returns null when nothing in hand is playable', () => {
    const hand = [card('blue', 3), card('green', 7)];
    expect(pickBestCard(hand, redFive, null, false, null)).toBeNull();
  });

  it('returns null for an empty hand', () => {
    expect(pickBestCard([], redFive, null, false, null)).toBeNull();
  });

  it('prefers an attacking card over a plain number', () => {
    const plus = card('red', 'plus');
    const hand = [card('red', 2), plus];

    expect(pickBestCard(hand, redFive, null, false, null)).toBe(plus);
  });

  it('follows the priority order — plus outranks stop', () => {
    const plus = card('red', 'plus');
    const stop = card('red', 'stop');

    expect(pickBestCard([stop, plus], redFive, null, false, null)).toBe(plus);
  });

  it('ranks stop above taki', () => {
    const stop = card('red', 'stop');
    const taki = card('red', 'taki');

    expect(pickBestCard([taki, stop], redFive, null, false, null)).toBe(stop);
  });

  it('falls back to any playable card when no priority card is in hand', () => {
    const playable = card('red', 2);

    expect(pickBestCard([card('blue', 9), playable], redFive, null, false, null)).toBe(playable);
  });

  it('respects the taki-sequence restriction when choosing', () => {
    const hand = [card('wild', 'king'), card('blue', 5), card('red', 2)];
    const chosen = pickBestCard(hand, redFive, null, true, 'red');

    expect(chosen?.color).toBe('red');
  });
});

describe('computerBestColor', () => {
  it('picks the colour the computer holds most of', () => {
    const hand = [card('blue', 1), card('blue', 2), card('blue', 3), card('red', 4)];
    expect(computerBestColor(hand)).toBe('blue');
  });

  it('never picks wild, which is not a playable colour to declare', () => {
    const hand = [
      card('wild', 'king'),
      card('wild', 'superTaki'),
      card('wild', 'colorChange'),
      card('green', 1),
    ];

    expect(computerBestColor(hand)).toBe('green');
  });

  it('returns a real colour even for an empty hand', () => {
    expect(CARD_COLORS).toContain(computerBestColor([]));
  });
});
