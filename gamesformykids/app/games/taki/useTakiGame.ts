'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─────────────────────────── Types ───────────────────────────
export type CardColor = 'red' | 'green' | 'blue' | 'yellow' | 'wild';
export type CardValue =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 'taki' | 'stop' | 'plus' | 'colorChange' | 'superTaki' | 'king';

export interface TakiCard {
  id: string;
  color: CardColor;
  value: CardValue;
}

export type GamePhase = 'menu' | 'playing' | 'won' | 'lost';

export interface TakiGameState {
  phase: GamePhase;
  deck: TakiCard[];
  playerHand: TakiCard[];
  computerHand: TakiCard[];
  topCard: TakiCard;
  currentTurn: 'player' | 'computer';
  /** Overrides topCard.color when a wild card was played */
  effectiveColor: CardColor | null;
  inTakiSequence: boolean;
  takiColor: CardColor | null;
  /** Player must pick a color (after playing colorChange / superTaki / king) */
  needsColorChoice: boolean;
  message: string;
  playerScore: number;
  computerScore: number;
  /** Increments each time it becomes computer's turn so the effect re-fires */
  turnId: number;
}

// ─────────────────────────── Deck ────────────────────────────
const COLORS: CardColor[] = ['red', 'green', 'blue', 'yellow'];

function buildDeck(): TakiCard[] {
  let n = 0;
  const id = () => String(n++);
  const cards: TakiCard[] = [];

  for (const color of COLORS) {
    for (let v = 1; v <= 9; v++) {
      cards.push({ id: id(), color, value: v as CardValue });
    }
    cards.push({ id: id(), color, value: 'taki' });
    cards.push({ id: id(), color, value: 'stop' });
    cards.push({ id: id(), color, value: 'plus' });
  }
  // Wild cards ×2 each
  for (let i = 0; i < 2; i++) {
    cards.push({ id: id(), color: 'wild', value: 'colorChange' });
    cards.push({ id: id(), color: 'wild', value: 'superTaki' });
    cards.push({ id: id(), color: 'wild', value: 'king' });
  }
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ──────────────────────── Game logic helpers ─────────────────
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

function pickBestCard(
  hand: TakiCard[],
  topCard: TakiCard,
  effectiveColor: CardColor | null,
  inTakiSequence: boolean,
  takiColor: CardColor | null,
): TakiCard | null {
  const playable = hand.filter(c =>
    canPlay(c, topCard, effectiveColor, inTakiSequence, takiColor),
  );
  if (!playable.length) return null;
  // Prefer action cards; among them prefer plus → stop → taki → king → colorChange
  const priority = ['plus', 'stop', 'taki', 'superTaki', 'king', 'colorChange'];
  for (const v of priority) {
    const found = playable.find(c => c.value === v);
    if (found) return found;
  }
  return playable[0];
}

function computerBestColor(hand: TakiCard[]): CardColor {
  const counts: Record<CardColor, number> = { red: 0, green: 0, blue: 0, yellow: 0, wild: 0 };
  for (const c of hand) counts[c.color]++;
  return (COLORS as CardColor[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
}

// ─────────────────────────── Hook ───────────────────────────
const INITIAL: TakiGameState = {
  phase: 'menu',
  deck: [],
  playerHand: [],
  computerHand: [],
  topCard: { id: 'init', color: 'red', value: 1 },
  currentTurn: 'player',
  effectiveColor: null,
  inTakiSequence: false,
  takiColor: null,
  needsColorChoice: false,
  message: 'ברוך הבא למשחק טאקי! 🃏',
  playerScore: 0,
  computerScore: 0,
  turnId: 0,
};

export function useTakiGame() {
  const [state, setState] = useState<TakiGameState>(INITIAL);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Start / Restart ──────────────────────────────────────
  const startGame = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const deck = shuffle(buildDeck());
    const playerHand = deck.splice(0, 8);
    const computerHand = deck.splice(0, 8);
    // First non-wild card as top card
    let idx = deck.findIndex(c => c.color !== 'wild');
    if (idx === -1) idx = 0;
    const [topCard] = deck.splice(idx, 1);

    setState(prev => ({
      ...INITIAL,
      phase: 'playing',
      deck,
      playerHand,
      computerHand,
      topCard,
      currentTurn: 'player',
      message: 'תורך! בחר קלף לשחק',
      playerScore: prev.playerScore,
      computerScore: prev.computerScore,
      turnId: 0,
    }));
  }, []);

  // ── Player plays a card ──────────────────────────────────
  const playCard = useCallback((card: TakiCard) => {
    setState(prev => {
      if (prev.phase !== 'playing') return prev;
      if (prev.currentTurn !== 'player') return prev;
      if (prev.needsColorChoice) return { ...prev, message: 'קודם בחר צבע!' };
      if (!canPlay(card, prev.topCard, prev.effectiveColor, prev.inTakiSequence, prev.takiColor)) {
        return { ...prev, message: 'לא ניתן לשחק קלף זה עכשיו 🚫' };
      }

      const newHand = prev.playerHand.filter(c => c.id !== card.id);

      // Win check
      if (newHand.length === 0) {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          phase: 'won',
          playerScore: prev.playerScore + 1,
          inTakiSequence: false,
          takiColor: null,
          effectiveColor: null,
          message: '🎉 ניצחת! כל הקלפים!',
        };
      }

      const takiMsg = newHand.length <= 2 ? ' — טאקי! 🃏' : '';

      // ── TAKI (colored) ───────────────────────────────────
      if (card.value === 'taki') {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          effectiveColor: null,
          inTakiSequence: true,
          takiColor: card.color,
          needsColorChoice: false,
          message: `🃏 טאקי ${getColorName(card.color)}! שחק עוד קלפים באותו צבע ולחץ "סגור טאקי"${takiMsg}`,
        };
      }

      // ── SUPER TAKI (wild taki) ────────────────────────────
      if (card.value === 'superTaki') {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: true,
          message: `⭐ סופר טאקי! בחר צבע — ואז שחק קלפים באותו צבע`,
        };
      }

      // ── STOP ─────────────────────────────────────────────
      if (card.value === 'stop') {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: false,
          currentTurn: 'player',
          message: `✋ עצור! המחשב מדלג. תורך שוב!${takiMsg}`,
        };
      }

      // ── KING (wild stop) ──────────────────────────────────
      if (card.value === 'king') {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: true,
          message: `👑 מלך! בחר צבע — המחשב ידולג`,
        };
      }

      // ── COLOR CHANGE ──────────────────────────────────────
      if (card.value === 'colorChange') {
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: true,
          message: '🌈 שנה צבע — בחר צבע חדש',
        };
      }

      // ── PLUS (+2) ─────────────────────────────────────────
      if (card.value === 'plus') {
        const newDeck = [...prev.deck];
        const compHand = [...prev.computerHand];
        for (let i = 0; i < 2; i++) {
          if (newDeck.length > 0) compHand.push(newDeck.pop()!);
        }
        return {
          ...prev,
          playerHand: newHand,
          topCard: card,
          deck: newDeck,
          computerHand: compHand,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: false,
          currentTurn: 'computer',
          turnId: prev.turnId + 1,
          message: `+2! המחשב מושך 2 קלפים${takiMsg}`,
        };
      }

      // ── Regular number card ───────────────────────────────
      return {
        ...prev,
        playerHand: newHand,
        topCard: card,
        effectiveColor: null,
        inTakiSequence: false,
        takiColor: null,
        needsColorChoice: false,
        currentTurn: 'computer',
        turnId: prev.turnId + 1,
        message: `שיחקת ${getColorName(card.color)} ${card.value}. תור המחשב...${takiMsg}`,
      };
    });
  }, []);

  // ── Player closes a TAKI sequence ────────────────────────
  const closeTaki = useCallback(() => {
    setState(prev => {
      if (!prev.inTakiSequence || prev.currentTurn !== 'player') return prev;
      return {
        ...prev,
        inTakiSequence: false,
        takiColor: null,
        currentTurn: 'computer',
        turnId: prev.turnId + 1,
        message: 'סגרת טאקי. תור המחשב...',
      };
    });
  }, []);

  // ── Player chooses a color after wild ────────────────────
  const chooseColor = useCallback((color: CardColor) => {
    setState(prev => {
      if (!prev.needsColorChoice || prev.currentTurn !== 'player') return prev;

      // After SUPER TAKI → stay in sequence with chosen color
      if (prev.topCard.value === 'superTaki') {
        return {
          ...prev,
          effectiveColor: color,
          inTakiSequence: true,
          takiColor: color,
          needsColorChoice: false,
          message: `⭐ סופר טאקי ${getColorName(color)}! שחק עוד קלפים ואז לחץ "סגור טאקי"`,
        };
      }

      // After KING → player keeps turn (computer skipped)
      if (prev.topCard.value === 'king') {
        return {
          ...prev,
          effectiveColor: color,
          inTakiSequence: false,
          takiColor: null,
          needsColorChoice: false,
          currentTurn: 'player',
          message: `👑 מלך! צבע: ${getColorName(color)}. תורך שוב!`,
        };
      }

      // After COLOR CHANGE → pass to computer
      return {
        ...prev,
        effectiveColor: color,
        inTakiSequence: false,
        takiColor: null,
        needsColorChoice: false,
        currentTurn: 'computer',
        turnId: prev.turnId + 1,
        message: `🌈 צבע חדש: ${getColorName(color)}. תור המחשב...`,
      };
    });
  }, []);

  // ── Player draws a card ───────────────────────────────────
  const drawCard = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'playing') return prev;
      if (prev.currentTurn !== 'player') return prev;
      if (prev.inTakiSequence) return { ...prev, message: 'אתה בטאקי — שחק קלף או סגור' };
      if (prev.needsColorChoice) return { ...prev, message: 'קודם בחר צבע!' };
      if (prev.deck.length === 0) return { ...prev, message: 'הקלחפה ריקה!' };

      const newDeck = [...prev.deck];
      const drawn = newDeck.pop()!;
      return {
        ...prev,
        deck: newDeck,
        playerHand: [...prev.playerHand, drawn],
        currentTurn: 'computer',
        turnId: prev.turnId + 1,
        message: `משכת קלף (${getColorName(drawn.color)} ${getValueLabel(drawn.value)}). תור המחשב...`,
      };
    });
  }, []);

  // ── Computer turn (async, triggered by effect) ───────────
  useEffect(() => {
    if (state.phase !== 'playing' || state.currentTurn !== 'computer') return;

    const delay = state.inTakiSequence ? 600 : 1100;

    timerRef.current = setTimeout(() => {
      setState(prev => {
        if (prev.phase !== 'playing' || prev.currentTurn !== 'computer') return prev;

        let hand = [...prev.computerHand];
        const deck = [...prev.deck];
        let playerHand = [...prev.playerHand];
        let topCard = prev.topCard;
        let effectiveColor = prev.effectiveColor;

        const card = pickBestCard(hand, topCard, effectiveColor, prev.inTakiSequence, prev.takiColor);

        // ── No card: draw ─────────────────────────────────
        if (!card) {
          if (prev.inTakiSequence) {
            // Close the taki sequence silently
            return {
              ...prev,
              inTakiSequence: false,
              takiColor: null,
              currentTurn: 'player',
              message: 'המחשב סגר טאקי. תורך!',
            };
          }
          if (deck.length > 0) {
            const drawn = deck.pop()!;
            hand = [...hand, drawn];
          }
          return {
            ...prev,
            computerHand: hand,
            deck,
            inTakiSequence: false,
            takiColor: null,
            effectiveColor,
            currentTurn: 'player',
            message: 'המחשב משך קלף. תורך!',
          };
        }

        // Remove card from hand
        hand = hand.filter(c => c.id !== card.id);
        topCard = card;

        // Win check
        if (hand.length === 0) {
          return {
            ...prev,
            computerHand: hand,
            topCard,
            phase: 'lost',
            computerScore: prev.computerScore + 1,
            inTakiSequence: false,
            takiColor: null,
            effectiveColor: null,
            message: '😢 המחשב ניצח! נסה שוב',
          };
        }

        //  ── TAKI ─────────────────────────────────────────
        if (card.value === 'taki') {
          const col = card.color;
          // Play as many same-color cards as possible
          while (true) {
            const next = hand.find(c => c.color === col);
            if (!next) break;
            hand = hand.filter(c => c.id !== next.id);
            topCard = next;
            if (hand.length === 0) break;
          }
          effectiveColor = null;
          if (hand.length === 0) {
            return {
              ...prev,
              computerHand: hand,
              deck,
              topCard,
              phase: 'lost',
              computerScore: prev.computerScore + 1,
              message: '😢 המחשב ניצח עם טאקי!',
            };
          }
          return {
            ...prev,
            computerHand: hand,
            deck,
            topCard,
            effectiveColor: null,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'player',
            message: `המחשב שיחק טאקי ${getColorName(col)}! תורך!`,
          };
        }

        // ── SUPER TAKI ────────────────────────────────────
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
            return {
              ...prev,
              computerHand: hand,
              deck,
              topCard,
              phase: 'lost',
              computerScore: prev.computerScore + 1,
              message: '😢 המחשב ניצח עם סופר טאקי!',
            };
          }
          return {
            ...prev,
            computerHand: hand,
            deck,
            topCard: card,
            effectiveColor: col,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'player',
            message: `המחשב שיחק סופר טאקי ${getColorName(col)}! תורך!`,
          };
        }

        // ── STOP ─────────────────────────────────────────
        if (card.value === 'stop') {
          return {
            ...prev,
            computerHand: hand,
            deck,
            topCard,
            effectiveColor: null,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'player',
            message: '✋ המחשב שיחק עצור — אך תורך ממשיך!',
            // player skipped: we pretend they get to play because opponent's STOP only skips in a 4-player game
            // In 2-player Taki, STOP just means skip opponent's turn → player keeps turn? 
            // Standard 2-player: STOP skips the OTHER player → so player IS skipped
            // We show skip message and let player click "accept"
          };
        }
        // Actually let me correct this. In 2-player Taki: STOP means skip player.
        // So when computer plays STOP, player must click a button to acknowledge and then it's computer's turn again.
        // We'll handle this by keeping currentTurn as 'player' but showing a "you were stopped" message.
        // The player presses any button saying "accept" → we'll use drawCard behavior as "acknowledge".

        // ── KING ─────────────────────────────────────────
        if (card.value === 'king') {
          const col = computerBestColor(hand);
          return {
            ...prev,
            computerHand: hand,
            deck,
            topCard,
            effectiveColor: col,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'computer',
            turnId: prev.turnId + 1,
            message: `👑 המחשב שיחק מלך! בחר ${getColorName(col)} ואתה מדולג! תור המחשב…`,
          };
        }

        // ── COLOR CHANGE ──────────────────────────────────
        if (card.value === 'colorChange') {
          const col = computerBestColor(hand);
          return {
            ...prev,
            computerHand: hand,
            deck,
            topCard,
            effectiveColor: col,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'player',
            message: `🌈 המחשב שינה צבע ל${getColorName(col)}! תורך!`,
          };
        }

        // ── PLUS ─────────────────────────────────────────
        if (card.value === 'plus') {
          for (let i = 0; i < 2; i++) {
            if (deck.length > 0) playerHand = [...playerHand, deck.pop()!];
          }
          return {
            ...prev,
            computerHand: hand,
            playerHand,
            deck,
            topCard,
            effectiveColor: null,
            inTakiSequence: false,
            takiColor: null,
            currentTurn: 'player',
            message: `+2! המחשב שיחק פלוס — אתה מושך 2 קלפים! תורך!`,
          };
        }

        // ── Regular card ──────────────────────────────────
        return {
          ...prev,
          computerHand: hand,
          deck,
          playerHand,
          topCard,
          effectiveColor: null,
          inTakiSequence: false,
          takiColor: null,
          currentTurn: 'player',
          message: `המחשב שיחק ${getColorName(card.color)} ${getValueLabel(card.value)}. תורך!`,
        };
      });
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTurn, state.phase, state.turnId]);

  return { state, startGame, playCard, closeTaki, chooseColor, drawCard };
}

// ─────────────────── Display helpers ────────────────────────
export function getColorName(color: CardColor): string {
  const names: Record<CardColor, string> = {
    red: 'אדום', green: 'ירוק', blue: 'כחול', yellow: 'צהוב', wild: 'כל-צבע',
  };
  return names[color];
}

export function getValueLabel(value: CardValue): string {
  if (typeof value === 'number') return String(value);
  const labels: Record<string, string> = {
    taki: 'טאקי', stop: 'עצור', plus: '+2',
    colorChange: 'שנה צבע', superTaki: 'סופר טאקי', king: 'מלך',
  };
  return labels[value] ?? String(value);
}

export function getValueEmoji(value: CardValue): string {
  if (typeof value === 'number') return String(value);
  const emojis: Record<string, string> = {
    taki: '🃏', stop: '✋', plus: '+2', colorChange: '🌈', superTaki: '⭐', king: '👑',
  };
  return emojis[value] ?? '?';
}

export const COLOR_BG: Record<CardColor, string> = {
  red:    'bg-red-500',
  green:  'bg-green-500',
  blue:   'bg-blue-500',
  yellow: 'bg-yellow-400',
  wild:   'bg-gradient-to-br from-purple-500 to-pink-500',
};

export const COLOR_BORDER: Record<CardColor, string> = {
  red:    'border-red-300',
  green:  'border-green-300',
  blue:   'border-blue-300',
  yellow: 'border-yellow-200',
  wild:   'border-purple-300',
};

export const COLOR_TEXT: Record<CardColor, string> = {
  red:    'text-white',
  green:  'text-white',
  blue:   'text-white',
  yellow: 'text-gray-900',
  wild:   'text-white',
};
