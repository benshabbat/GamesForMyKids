'use client';

import { useEffect, useRef } from 'react';
import { useMarketStore } from './marketStore';
import { numberWord } from './marketData';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export function useMarketGame() {
  const phase = useMarketStore((s) => s.phase);
  const customer = useMarketStore((s) => s.customer);
  const cart = useMarketStore((s) => s.cart);
  const score = useMarketStore((s) => s.score);
  const customersServed = useMarketStore((s) => s.customersServed);
  const totalCustomers = useMarketStore((s) => s.totalCustomers);
  const feedback = useMarketStore((s) => s.feedback);
  const difficulty = useMarketStore((s) => s.difficulty);
  const confirming = useMarketStore((s) => s.confirming);
  const startGame = useMarketStore((s) => s.startGame);
  const addToCart = useMarketStore((s) => s.addToCart);
  const removeFromCart = useMarketStore((s) => s.removeFromCart);
  const confirmSale = useMarketStore((s) => s.confirmSale);
  const advanceCustomer = useMarketStore((s) => s.advanceCustomer);
  const tickTimer = useMarketStore((s) => s.tickTimer);
  const restart = useMarketStore((s) => s.restart);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Advance to the next customer a beat after showing sale feedback
  useEffect(() => {
    if (!confirming) return;
    const timeout = setTimeout(() => advanceCustomer(), 1200);
    return () => clearTimeout(timeout);
  }, [confirming, advanceCustomer]);

  useEffect(() => {
    if (phase === 'playing' && customer) {
      timerRef.current = setInterval(() => tickTimer(), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // customer.id identifies when a new customer arrives — no need to add the full object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, customer?.id, tickTimer]);

  // Speak the order when a new customer arrives
  const customerId = customer?.id;
  const customerName = customer?.name;
  const orderCount = customer?.order.count;
  const orderItemName = customer?.order.item.name;
  useEffect(() => {
    if (customerId && phase === 'playing' && customerName && orderCount !== undefined && orderItemName) {
      const text = `${customerName} אוֹמֵר: אֲנִי רוֹצֶה ${numberWord(orderCount)} ${orderItemName}!`;
      setTimeout(() => speakHebrew(text), 300);
    }
  }, [customerId, phase, customerName, orderCount, orderItemName]);

  return {
    phase, customer, cart, score, customersServed, totalCustomers, feedback, difficulty,
    startGame, addToCart, removeFromCart, confirmSale, restart,
  };
}
