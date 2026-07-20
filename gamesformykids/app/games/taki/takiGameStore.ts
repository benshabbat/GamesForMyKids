import { makeStore } from '@/lib/stores/createStore';
import type { TakiGameState, TakiCard, CardColor } from './takiTypes';
import { INITIAL_STATE } from './takiTypes';
import { buildDeck } from './takiDeck';
import { shuffle } from '@/lib/utils';
import { canPlay, resolvePlayCard, resolveComputerTurn } from './takiLogic';
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

export const useTakiStore = makeStore<TakiGameState & TakiGameActions>('TakiStore', (set, get) => ({
  ...INITIAL_STATE,

  startGame: () => {
    const { playerScore, computerScore } = get();
    const deck = shuffle(buildDeck());
    const playerHand = deck.splice(0, 8);
    const computerHand = deck.splice(0, 8);
    let idx = deck.findIndex(c => c.color !== 'wild');
    if (idx === -1) idx = 0;
    const topCard = deck.splice(idx, 1)[0]!;
    set({ ...INITIAL_STATE, phase: 'playing', deck, playerHand, computerHand, topCard, currentTurn: 'player', message: 'תורך! בחר קלף לשחק', playerScore, computerScore, turnId: 0 });
  },

  playCard: (card: TakiCard) => {
    const prev = get();
    if (prev.phase !== 'playing' || prev.currentTurn !== 'player') return;
    if (prev.needsColorChoice) { set({ message: 'קודם בחר צבע!' }); return; }
    if (!canPlay(card, prev.topCard, prev.effectiveColor, prev.inTakiSequence, prev.takiColor)) {
      set({ message: 'לא ניתן לשחק קלף זה עכשיו ' }); return;
    }
    set(resolvePlayCard(prev, card));
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
    set(resolveComputerTurn(prev));
  },
}));
