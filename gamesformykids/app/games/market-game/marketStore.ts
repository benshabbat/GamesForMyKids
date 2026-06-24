'use client';

import { create } from 'zustand';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MarketItem {
  id: string;
  name: string;
  emoji: string;
}

export interface CustomerOrder {
  item: MarketItem;
  count: number;
}

export interface Customer {
  id: number;
  emoji: string;
  name: string;
  order: CustomerOrder;
  timeLeft: number;
  maxTime: number;
}

export type Phase = 'menu' | 'playing' | 'result';

const ITEMS: MarketItem[] = [
  { id: 'apple',  name: 'תפוח',  emoji: '🍎' },
  { id: 'banana', name: 'בננה',  emoji: '🍌' },
  { id: 'orange', name: 'תפוז',  emoji: '🍊' },
  { id: 'grape',  name: 'ענב',   emoji: '🍇' },
  { id: 'carrot', name: 'גזר',   emoji: '🥕' },
  { id: 'tomato', name: 'עגבנייה', emoji: '🍅' },
  { id: 'lemon',  name: 'לימון', emoji: '🍋' },
  { id: 'watermelon', name: 'אבטיח', emoji: '🍉' },
];

const CUSTOMER_EMOJIS = ['👦', '👧', '👴', '👵', '🧒', '🧑', '👱', '🧔'];
const CUSTOMER_NAMES = ['יעל', 'נועם', 'תום', 'מיה', 'ארי', 'לי', 'עדן', 'איתי'];

function randomItem() {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)]!;
}

function getMaxCount(difficulty: Difficulty) {
  if (difficulty === 'easy') return 5;
  if (difficulty === 'medium') return 10;
  return 20;
}

function getCustomerTime(difficulty: Difficulty) {
  if (difficulty === 'easy') return 30;
  if (difficulty === 'medium') return 20;
  return 15;
}

function buildCustomer(difficulty: Difficulty, id: number): Customer {
  const idx = Math.floor(Math.random() * CUSTOMER_EMOJIS.length);
  const max = getMaxCount(difficulty);
  const count = Math.floor(Math.random() * max) + 1;
  const t = getCustomerTime(difficulty);
  return {
    id,
    emoji: CUSTOMER_EMOJIS[idx]!,
    name: CUSTOMER_NAMES[idx]!,
    order: { item: randomItem(), count },
    timeLeft: t,
    maxTime: t,
  };
}

interface MarketState {
  phase: Phase;
  difficulty: Difficulty;
  customer: Customer | null;
  cart: Record<string, number>; // itemId → count in cart
  score: number;
  customersServed: number;
  feedback: 'none' | 'correct' | 'wrong';
  totalCustomers: number;
  nextCustomerId: number;
}

interface MarketActions {
  startGame: (difficulty: Difficulty) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  confirmSale: () => void;
  tickTimer: () => void;
  endGame: () => void;
  restart: () => void;
}

export const useMarketStore = create<MarketState & MarketActions>((set, get) => ({
  phase: 'menu',
  difficulty: 'easy',
  customer: null,
  cart: {},
  score: 0,
  customersServed: 0,
  feedback: 'none',
  totalCustomers: 10,
  nextCustomerId: 1,

  startGame: (difficulty) => {
    const customer = buildCustomer(difficulty, 1);
    set({
      phase: 'playing',
      difficulty,
      customer,
      cart: {},
      score: 0,
      customersServed: 0,
      feedback: 'none',
      totalCustomers: 10,
      nextCustomerId: 2,
    });
  },

  addToCart: (itemId) => {
    const { cart, customer } = get();
    if (!customer) return;
    const cur = cart[itemId] ?? 0;
    set({ cart: { ...cart, [itemId]: cur + 1 } });
  },

  removeFromCart: (itemId) => {
    const { cart } = get();
    const cur = cart[itemId] ?? 0;
    if (cur <= 0) return;
    const next = { ...cart, [itemId]: cur - 1 };
    if (next[itemId] === 0) delete next[itemId];
    set({ cart: next });
  },

  confirmSale: () => {
    const { customer, cart, score, customersServed, difficulty, totalCustomers, nextCustomerId } = get();
    if (!customer) return;

    const cartCount = cart[customer.order.item.id] ?? 0;
    const correct = cartCount === customer.order.count;

    set({ feedback: correct ? 'correct' : 'wrong', score: correct ? score + 1 : score });

    setTimeout(() => {
      const served = customersServed + 1;
      if (served >= totalCustomers) {
        set({ phase: 'result', customersServed: served, feedback: 'none' });
        return;
      }
      const next = buildCustomer(difficulty, nextCustomerId);
      set({
        customer: next,
        cart: {},
        feedback: 'none',
        customersServed: served,
        nextCustomerId: nextCustomerId + 1,
      });
    }, 1200);
  },

  tickTimer: () => {
    const { customer, difficulty, customersServed, totalCustomers, nextCustomerId } = get();
    if (!customer) return;
    const newTime = customer.timeLeft - 1;
    if (newTime <= 0) {
      const served = customersServed + 1;
      if (served >= totalCustomers) {
        set({ phase: 'result', customersServed: served });
        return;
      }
      const next = buildCustomer(difficulty, nextCustomerId);
      set({
        customer: next,
        cart: {},
        feedback: 'none',
        customersServed: served,
        nextCustomerId: nextCustomerId + 1,
      });
      return;
    }
    set({ customer: { ...customer, timeLeft: newTime } });
  },

  endGame: () => set({ phase: 'result' }),
  restart: () => set({ phase: 'menu', customer: null, cart: {}, score: 0, customersServed: 0, feedback: 'none' }),
}));
