'use client';

import { useEffect, useRef } from 'react';
import { useMarketStore, type Difficulty, type MarketItem } from './marketStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';

const ITEMS_FOR_SHELF: MarketItem[] = [
  { id: 'apple',      name: 'תפוח',      emoji: '🍎' },
  { id: 'banana',     name: 'בננה',      emoji: '🍌' },
  { id: 'orange',     name: 'תפוז',      emoji: '🍊' },
  { id: 'grape',      name: 'ענב',       emoji: '🍇' },
  { id: 'carrot',     name: 'גזר',       emoji: '🥕' },
  { id: 'tomato',     name: 'עגבנייה',   emoji: '🍅' },
  { id: 'lemon',      name: 'לימון',     emoji: '🍋' },
  { id: 'watermelon', name: 'אבטיח',     emoji: '🍉' },
];

function numberWord(n: number): string {
  const words: Record<number, string> = {
    1: 'אחד', 2: 'שניים', 3: 'שלושה', 4: 'ארבעה', 5: 'חמישה',
    6: 'שישה', 7: 'שבעה', 8: 'שמונה', 9: 'תשעה', 10: 'עשרה',
    11: 'אחד עשר', 12: 'שניים עשר', 13: 'שלושה עשר', 14: 'ארבעה עשר',
    15: 'חמישה עשר', 16: 'שישה עשר', 17: 'שבעה עשר', 18: 'שמונה עשר',
    19: 'תשעה עשר', 20: 'עשרים',
  };
  return words[n] ?? String(n);
}

export default function MarketClient() {
  const {
    phase, customer, cart, score, customersServed, totalCustomers, feedback, difficulty,
    startGame, addToCart, removeFromCart, confirmSale, tickTimer, restart,
  } = useMarketStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      const text = `${customerName} אומר: אני רוצה ${numberWord(orderCount)} ${orderItemName}!`;
      setTimeout(() => speakHebrew(text), 300);
    }
  }, [customerId, phase, customerName, orderCount, orderItemName]);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-orange-800 mb-2">שוק של ילדים</h1>
          <p className="text-lg text-orange-600 mb-1">שרת לקוחות — תן להם מה שביקשו!</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
            const labels: Record<Difficulty, { he: string; desc: string; emoji: string }> = {
              easy:   { he: 'קל',    desc: '1-5 פריטים, 30 שניות',  emoji: '🌱' },
              medium: { he: 'בינוני',desc: '1-10 פריטים, 20 שניות', emoji: '🌿' },
              hard:   { he: 'קשה',   desc: '1-20 פריטים, 15 שניות', emoji: '🌳' },
            };
            const l = labels[d];
            return (
              <button
                key={d}
                onClick={() => startGame(d)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg border-2 border-orange-100 hover:border-orange-400 transition-all active:scale-95 text-right"
              >
                <div className="text-2xl mb-1">{l.emoji}</div>
                <div className="font-bold text-orange-800 text-xl">{l.he}</div>
                <div className="text-sm text-gray-500">{l.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / totalCustomers) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="text-center">
          <div className="text-7xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}</div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">סגרנו!</h1>
          <p className="text-2xl text-green-700 mb-2">שרת {score} לקוחות מתוך {totalCustomers}</p>
          <p className="text-xl text-green-600 mb-8">{pct}% הצלחה</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => startGame(difficulty)}
              className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-2xl hover:bg-green-600 active:scale-95 transition-all shadow-lg"
            >
              שחק שוב
            </button>
            <button
              onClick={restart}
              className="px-8 py-4 bg-white text-green-700 text-xl font-bold rounded-2xl border-2 border-green-400 hover:bg-green-50 active:scale-95 transition-all shadow-lg"
            >
              תפריט
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) return null;

  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartForOrder = cart[customer.order.item.id] ?? 0;
  const timerPct = (customer.timeLeft / customer.maxTime) * 100;
  const timerColor = timerPct > 50 ? 'bg-green-500' : timerPct > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={restart} className="text-sm text-orange-600 font-medium">← תפריט</button>
        <div className="font-bold text-orange-800">לקוח {customersServed + 1}/{totalCustomers}</div>
        <div className="text-sm font-bold text-green-700 bg-white px-3 py-1 rounded-full shadow">✅ {score}</div>
      </div>

      {/* Timer */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
        <div className={`${timerColor} h-3 rounded-full transition-all`} style={{ width: `${timerPct}%` }} />
      </div>

      {/* Customer + Order */}
      <div
        className="bg-white rounded-2xl p-4 mb-4 shadow-md border-2 border-orange-200 cursor-pointer flex items-center gap-4"
        onClick={() => speakHebrew(`אני רוצה ${numberWord(customer.order.count)} ${customer.order.item.name}!`)}
      >
        <div className="text-5xl">{customer.emoji}</div>
        <div>
          <div className="font-bold text-gray-800 text-lg">{customer.name} אומר/ת:</div>
          <div className="text-xl font-bold text-orange-700 mt-1">
            {'🛍️ '}
            {customer.order.count}× {customer.order.item.emoji} {customer.order.item.name}
          </div>
        </div>
        <span className="ms-auto text-2xl">🔊</span>
      </div>

      {/* Feedback overlay */}
      {feedback !== 'none' && (
        <div className={`text-center text-3xl font-bold py-3 rounded-xl mb-3 ${feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {feedback === 'correct' ? '✅ נכון! כל הכבוד!' : `❌ לא נכון! צריך ${customer.order.count}`}
        </div>
      )}

      {/* Shelf — all 8 items */}
      <div className="bg-amber-50 rounded-2xl p-3 mb-4 border-2 border-amber-200">
        <div className="text-sm font-bold text-amber-800 mb-2">🏪 מדף</div>
        <div className="grid grid-cols-4 gap-2">
          {ITEMS_FOR_SHELF.map((item) => {
            const count = cart[item.id] ?? 0;
            return (
              <button
                key={item.id}
                onClick={() => addToCart(item.id)}
                className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all active:scale-95 ${
                  item.id === customer.order.item.id
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs text-gray-600 mt-0.5">{item.name}</span>
                {count > 0 && (
                  <span className="mt-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart / Scale */}
      <div className="bg-blue-50 rounded-2xl p-3 mb-4 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-blue-800">⚖️ מאזניים</div>
          <button
            onClick={() => {
              const { cart: c } = useMarketStore.getState();
              const newCart = Object.fromEntries(Object.entries(c).filter(([, v]) => v > 0));
              useMarketStore.setState({ cart: newCart });
            }}
            className="text-xs text-red-500 hover:text-red-700"
          >
            נקה הכל
          </button>
        </div>

        {cartTotal === 0 ? (
          <p className="text-center text-gray-400 text-sm py-2">לחץ על פריט כדי להוסיף</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ITEMS_FOR_SHELF.map((item) => {
              const count = cart[item.id] ?? 0;
              if (!count) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-1 bg-white border-2 border-blue-200 rounded-xl px-3 py-1.5 text-sm font-bold active:scale-95 hover:border-red-300"
                >
                  {item.emoji} ×{count} <span className="text-red-400 text-xs">✕</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Current order hint */}
      <div className="text-center text-sm text-gray-600 mb-3">
        {customer.order.item.name}: {cartForOrder}/{customer.order.count} {cartForOrder === customer.order.count ? '✅' : ''}
      </div>

      {/* Confirm button */}
      <button
        onClick={confirmSale}
        disabled={cartTotal === 0 || feedback !== 'none'}
        className="w-full py-4 bg-orange-500 text-white text-2xl font-bold rounded-2xl shadow-lg hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        מכור! 🛒
      </button>
    </div>
  );
}
