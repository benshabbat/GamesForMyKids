'use client';

import { useMarketStore, type Customer } from '../marketStore';
import { ITEMS_FOR_SHELF, numberWord } from '../marketData';
import { speakHebrew } from '@/lib/utils/speech/speaker';

interface MarketPlayScreenProps {
  customer: Customer;
  cart: Record<string, number>;
  score: number;
  customersServed: number;
  totalCustomers: number;
  feedback: 'none' | 'correct' | 'wrong';
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
  onConfirmSale: () => void;
  onRestart: () => void;
}

export default function MarketPlayScreen({
  customer, cart, score, customersServed, totalCustomers, feedback,
  onAddToCart, onRemoveFromCart, onConfirmSale, onRestart,
}: MarketPlayScreenProps) {
  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartForOrder = cart[customer.order.item.id] ?? 0;
  const timerPct = (customer.timeLeft / customer.maxTime) * 100;
  const timerColor = timerPct > 50 ? 'bg-green-500' : timerPct > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={onRestart} className="text-sm text-orange-600 font-medium">← תפריט</button>
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
        onClick={() => speakHebrew(`אֲנִי רוֹצֶה ${numberWord(customer.order.count)} ${customer.order.item.name}!`)}
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
                onClick={() => onAddToCart(item.id)}
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
                  onClick={() => onRemoveFromCart(item.id)}
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
        onClick={onConfirmSale}
        disabled={cartTotal === 0 || feedback !== 'none'}
        className="w-full py-4 bg-orange-500 text-white text-2xl font-bold rounded-2xl shadow-lg hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        מכור! 🛒
      </button>
    </div>
  );
}
