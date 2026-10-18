import { describe, expect, it } from 'vitest';
import { buildDeck } from '@/app/games/taki/takiDeck';
import { drawCards, resolveComputerTurn, resolvePlayCard } from '@/app/games/taki/takiLogic';
import { INITIAL_STATE } from '@/app/games/taki/takiTypes';
import type { CardColor, CardValue, TakiCard, TakiGameState } from '@/app/games/taki/takiTypes';

const ALL = buildDeck();

/** First card in the deck with this colour and value (wild cards exist twice). */
function card(color: CardColor, value: CardValue): TakiCard {
  const found = ALL.find((c) => c.color === color && c.value === value);
  if (!found) throw new Error(`no ${color} ${value}`);
  return found;
}

function makeState(over: Partial<TakiGameState>): TakiGameState {
  return { ...INITIAL_STATE, phase: 'playing', ...over };
}

function allIds(s: TakiGameState): string[] {
  return [...s.deck, ...s.computerHand, ...s.playerHand, s.topCard].map((c) => c.id);
}

describe('drawCards', () => {
  it('draws from the pile without reshuffling while cards remain', () => {
    const deck = ALL.slice(0, 5);
    const { drawn, deck: rest } = drawCards(deck, 2, []);
    expect(drawn.map((c) => c.id)).toEqual([deck[4]!.id, deck[3]!.id]);
    expect(rest).toHaveLength(3);
  });

  it('rebuilds the pile from discards when it runs out, never reusing held cards', () => {
    const inPlay = ALL.slice(0, 17);

    const { drawn, deck } = drawCards([], 1, inPlay);

    const heldIds = new Set(inPlay.map((c) => c.id));
    expect(drawn).toHaveLength(1);
    expect(heldIds.has(drawn[0]!.id)).toBe(false);
    // everything that is not held ends up either drawn or back in the pile
    expect(deck.length + drawn.length).toBe(ALL.length - inPlay.length);
    expect(deck.some((c) => heldIds.has(c.id))).toBe(false);
  });

  it('does not hand out the same card twice when the pile empties mid-draw', () => {
    const inPlay = ALL.slice(0, 20);
    const lastCard = ALL[30]!;
    const { drawn, deck } = drawCards([lastCard], 3, inPlay);

    expect(drawn).toHaveLength(3);
    expect(drawn[0]!.id).toBe(lastCard.id);
    const ids = [...drawn, ...deck].map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('refills an exhausted pile right after the last card is drawn', () => {
    const inPlay = ALL.slice(0, 10);
    const { drawn, deck } = drawCards([ALL[40]!], 1, inPlay);
    expect(drawn).toHaveLength(1);
    expect(deck.length).toBeGreaterThan(0);
  });

  it('returns nothing only when every other card is held', () => {
    const { drawn, deck } = drawCards([], 1, ALL);
    expect(drawn).toEqual([]);
    expect(deck).toEqual([]);
  });
});

describe('resolveComputerTurn with an empty draw pile', () => {
  it('draws from the reshuffled discards instead of passing with no card', () => {
    // The computer holds only a card that cannot be played on a red 1
    const top = card('red', 1);
    const computerHand = [card('blue', 5)];
    const playerHand = [card('green', 2), card('green', 3)];
    const state = makeState({ deck: [], playerHand, computerHand, topCard: top, currentTurn: 'computer' });

    const next = resolveComputerTurn(state);

    expect(next.computerHand).toHaveLength(2);
    expect(next.currentTurn).toBe('player');
    expect(next.message).toBe('המחשב משך קלף. תורך!');
    const ids = allIds(next);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('refills the pile for the +2 penalty on the player', () => {
    const top = card('green', 3);
    const computerHand = [card('green', 'plus'), card('red', 9)];
    const playerHand = [card('blue', 1)];
    const state = makeState({ deck: [card('yellow', 4)], playerHand, computerHand, topCard: top, currentTurn: 'computer' });

    const next = resolveComputerTurn(state);

    expect(next.playerHand).toHaveLength(3);
    const ids = allIds(next);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('resolvePlayCard with the draw pile', () => {
  it('refills the pile for the +2 penalty on the computer', () => {
    const top = card('green', 3);
    const plus = card('green', 'plus');
    const state = makeState({
      deck: [],
      playerHand: [plus, card('red', 9)],
      computerHand: [card('blue', 1)],
      topCard: top,
      currentTurn: 'player',
    });

    const next = resolvePlayCard(state, plus);

    expect(next.computerHand).toHaveLength(3);
    const ids = allIds(next);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('resolvePlayCard inside a Taki sequence', () => {
  const takiRed = card('red', 'taki');

  function startSequence(): TakiGameState {
    const hand = [takiRed, card('red', 2), card('red', 7), card('blue', 4)];
    const state = makeState({ playerHand: hand, computerHand: [card('green', 1)], topCard: card('red', 1), currentTurn: 'player' });
    return resolvePlayCard(state, takiRed);
  }

  it('starts a sequence on the player\'s own turn', () => {
    const next = startSequence();
    expect(next.inTakiSequence).toBe(true);
    expect(next.takiColor).toBe('red');
    expect(next.currentTurn).toBe('player');
  });

  it('keeps the sequence and the turn after a normal card of the taki colour', () => {
    const afterTaki = startSequence();
    const next = resolvePlayCard(afterTaki, card('red', 2));

    expect(next.inTakiSequence).toBe(true);
    expect(next.takiColor).toBe('red');
    expect(next.currentTurn).toBe('player');
    expect(next.turnId).toBe(afterTaki.turnId);
    expect(next.topCard.id).toBe(card('red', 2).id);
    expect(next.playerHand.map((c) => c.id)).not.toContain(card('red', 2).id);
  });

  it('allows several cards in a row', () => {
    let s = startSequence();
    s = resolvePlayCard(s, card('red', 2));
    s = resolvePlayCard(s, card('red', 7));
    expect(s.inTakiSequence).toBe(true);
    expect(s.currentTurn).toBe('player');
    expect(s.playerHand).toHaveLength(1);
  });

  it('still passes the turn after a normal card outside a sequence', () => {
    const plain = makeState({
      playerHand: [card('red', 2), card('red', 5)],
      computerHand: [card('green', 1)],
      topCard: card('red', 1),
      currentTurn: 'player',
    });
    const after = resolvePlayCard(plain, card('red', 2));
    expect(after.inTakiSequence).toBe(false);
    expect(after.currentTurn).toBe('computer');
  });

  it('still wins when the last card is played inside the sequence', () => {
    const afterTaki = resolvePlayCard(
      makeState({ playerHand: [takiRed, card('red', 2)], computerHand: [card('green', 1)], topCard: card('red', 1), currentTurn: 'player' }),
      takiRed,
    );
    const next = resolvePlayCard(afterTaki, card('red', 2));
    expect(next.phase).toBe('won');
  });
});
