import { create } from 'zustand';
import type { TakiGameState, TakiCard, CardColor } from './takiTypes';
import { INITIAL_STATE } from './takiTypes';
import { buildDeck } from './takiDeck';
import { shuffle } from '@/lib/utils';
import { canPlay, pickBestCard, computerBestColor } from './takiLogic';
import { getColorName, getValueLabel } from './takiDisplay';

// Re-export public API so components can keep their existing imports
export type { CardColor, CardValue, TakiCard, GamePhase, TakiGameState } from './takiTypes';
export { canPlay } from './takiLogic';
export { getColorName, getValueLabel, getValueEmoji, COLOR_BG, COLOR_BORDER, COLOR_TEXT } from './takiDisplay';

//  Store 
interface TakiGameActions {
  startGame: () => void;
  playCard: (card: TakiCard) => void;
  closeTaki: () => void;
  chooseColor: (color: CardColor) => void;
  drawCard: () => void;
  computerTurn: () => void;
}

export const useTakiStore = create<TakiGameState & TakiGameActions>()((set, get) => ({
  ...INITIAL_STATE,

  startGame: () => {
    const { playerScore, computerScore } = get();
    const deck = shuffle(buildDeck());
    const playerHand = deck.splice(0, 8);
    const computerHand = deck.splice(0, 8);
    let idx = deck.findIndex(c => c.color !== 'wild');
    if (idx === -1) idx = 0;
    const spliced = deck.splice(idx, 1);
    const topCard = spliced[0];
    if (!topCard) return;
    set({ ...INITIAL_STATE, phase: 'playing', deck, playerHand, computerHand, topCard, currentTurn: 'player', message: 'תורך! בחר קלף לשחק', playerScore, computerScore, turnId: 0 });
  },

  playCard: (card: TakiCard) => {
    const prev = get();
    if (prev.phase !== 'playing' || prev.currentTurn !== 'player') return;
    if (prev.needsColorChoice) { set({ message: 'קודם בחר צבע!' }); return; }
    if (!canPlay(card, prev.topCard, prev.effectiveColor, prev.inTakiSequence, prev.takiColor)) {
      set({ message: 'לא ניתן לשחק קלף זה עכשיו ' }); return;
    }

    const newHand = prev.playerHand.filter(c => c.id !== card.id);
    if (newHand.length === 0) {
      set({ ...prev, playerHand: newHand, topCard: card, phase: 'won', playerScore: prev.playerScore + 1, inTakiSequence: false, takiColor: null, effectiveColor: null, message: ' ניצחת! כל הקלפים!' });
      return;
    }

    const takiMsg = newHand.length <= 2 ? '  טאקי! ' : '';

    if (card.value === 'taki') {
      set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: true, takiColor: card.color, needsColorChoice: false, message: ` טאקי ${getColorName(card.color)}! שחק עוד קלפים באותו צבע ולחץ "סגור טאקי"${takiMsg}` });
      return;
    }
    if (card.value === 'superTaki') {
      set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ` סופר טאקי! בחר צבע  ואז שחק קלפים באותו צבע` });
      return;
    }
    if (card.value === 'stop') {
      set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'player', message: ` עצור! המחשב מדלג. תורך שוב!${takiMsg}` });
      return;
    }
    if (card.value === 'king') {
      set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ` מלך! בחר צבע  המחשב ידולג` });
      return;
    }
    if (card.value === 'colorChange') {
      set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: true, message: ' שנה צבע  בחר צבע חדש' });
      return;
    }
    if (card.value === 'plus') {
      const newDeck = [...prev.deck];
      const compHand = [...prev.computerHand];
      for (let i = 0; i < 2; i++) { const c = newDeck.pop(); if (c) compHand.push(c); }
      set({ ...prev, playerHand: newHand, topCard: card, deck: newDeck, computerHand: compHand, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: `+2! המחשב מושך 2 קלפים${takiMsg}` });
      return;
    }
    set({ ...prev, playerHand: newHand, topCard: card, effectiveColor: null, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: `שיחקת ${getColorName(card.color)} ${card.value}. תור המחשב...${takiMsg}` });
  },

  closeTaki: () => {
    const prev = get();
    if (!prev.inTakiSequence || prev.currentTurn !== 'player') return;
    set({ ...prev, inTakiSequence: false, takiColor: null, currentTurn: 'computer', turnId: prev.turnId + 1, message: 'סגרת טאקי. תור המחשב...' });
  },

  chooseColor: (color: CardColor) => {
    const prev = get();
    if (!prev.needsColorChoice || prev.currentTurn !== 'player') return;
    if (prev.topCard.value === 'superTaki') {
      set({ ...prev, effectiveColor: color, inTakiSequence: true, takiColor: color, needsColorChoice: false, message: ` סופר טאקי ${getColorName(color)}! שחק עוד קלפים ואז לחץ "סגור טאקי"` });
      return;
    }
    if (prev.topCard.value === 'king') {
      set({ ...prev, effectiveColor: color, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'player', message: ` מלך! צבע: ${getColorName(color)}. תורך שוב!` });
      return;
    }
    set({ ...prev, effectiveColor: color, inTakiSequence: false, takiColor: null, needsColorChoice: false, currentTurn: 'computer', turnId: prev.turnId + 1, message: ` צבע חדש: ${getColorName(color)}. תור המחשב...` });
  },

  drawCard: () => {
    const prev = get();
    if (prev.phase !== 'playing' || prev.currentTurn !== 'player') return;
    if (prev.inTakiSequence) { set({ message: 'אתה בטאקי  שחק קלף או סגור' }); return; }
    if (prev.needsColorChoice) { set({ message: 'קודם בחר צבע!' }); return; }
    if (prev.deck.length === 0) { set({ message: 'הקלחפה ריקה!' }); return; }
    const newDeck = [...prev.deck];
    const drawn = newDeck.pop();
    if (!drawn) return;
    set({ ...prev, deck: newDeck, playerHand: [...prev.playerHand, drawn], currentTurn: 'computer', turnId: prev.turnId + 1, message: `משכת קלף (${getColorName(drawn.color)} ${getValueLabel(drawn.value)}). תור המחשב...` });
  },

  computerTurn: () => {
    const prev = get();
    if (prev.phase !== 'playing' || prev.currentTurn !== 'computer') return;

    let hand = [...prev.computerHand];
    const deck = [...prev.deck];
    let playerHand = [...prev.playerHand];
    let topCard = prev.topCard;
    const effectiveColor = prev.effectiveColor;

    const card = pickBestCard(hand, topCard, effectiveColor, prev.inTakiSequence, prev.takiColor);

    if (!card) {
      if (prev.inTakiSequence) {
        set({ ...prev, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: 'המחשב סגר טאקי. תורך!' });
        return;
      }
      const drawn2 = deck.pop(); if (drawn2) hand = [...hand, drawn2];
      set({ ...prev, computerHand: hand, deck, inTakiSequence: false, takiColor: null, effectiveColor, currentTurn: 'player', message: 'המחשב משך קלף. תורך!' });
      return;
    }

    hand = hand.filter(c => c.id !== card.id);
    topCard = card;

    if (hand.length === 0) {
      set({ ...prev, computerHand: hand, topCard, phase: 'lost', computerScore: prev.computerScore + 1, inTakiSequence: false, takiColor: null, effectiveColor: null, message: ' המחשב ניצח! נסה שוב' });
      return;
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
        set({ ...prev, computerHand: hand, deck, topCard, phase: 'lost', computerScore: prev.computerScore + 1, message: ' המחשב ניצח עם טאקי!' });
        return;
      }
      set({ ...prev, computerHand: hand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק טאקי ${getColorName(col)}! תורך!` });
      return;
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
        set({ ...prev, computerHand: hand, deck, topCard, phase: 'lost', computerScore: prev.computerScore + 1, message: ' המחשב ניצח עם סופר טאקי!' });
        return;
      }
      set({ ...prev, computerHand: hand, deck, topCard: card, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק סופר טאקי ${getColorName(col)}! תורך!` });
      return;
    }

    if (card.value === 'stop') {
      set({ ...prev, computerHand: hand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: ' המחשב שיחק עצור. תורך!' });
      return;
    }

    if (card.value === 'king') {
      const col = computerBestColor(hand);
      set({ ...prev, computerHand: hand, deck, topCard, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'computer', turnId: prev.turnId + 1, message: ` המחשב שיחק מלך! בחר ${getColorName(col)} ואתה מדולג! תור המחשב` });
      return;
    }

    if (card.value === 'colorChange') {
      const col = computerBestColor(hand);
      set({ ...prev, computerHand: hand, deck, topCard, effectiveColor: col, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: ` המחשב שינה צבע ל${getColorName(col)}! תורך!` });
      return;
    }

    if (card.value === 'plus') {
      for (let i = 0; i < 2; i++) { const c = deck.pop(); if (c) playerHand = [...playerHand, c]; }
      set({ ...prev, computerHand: hand, playerHand, deck, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `+2! המחשב שיחק פלוס  אתה מושך 2 קלפים! תורך!` });
      return;
    }

    set({ ...prev, computerHand: hand, deck, playerHand, topCard, effectiveColor: null, inTakiSequence: false, takiColor: null, currentTurn: 'player', message: `המחשב שיחק ${getColorName(card.color)} ${getValueLabel(card.value)}. תורך!` });
  },
}));
