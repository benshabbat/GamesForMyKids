'use client';

import { useMarketGame } from './useMarketGame';
import MarketMenuScreen from './components/MarketMenuScreen';
import MarketResultScreen from './components/MarketResultScreen';
import MarketPlayScreen from './components/MarketPlayScreen';

export default function MarketClient() {
  const {
    phase, customer, cart, score, customersServed, totalCustomers, feedback, difficulty,
    startGame, addToCart, removeFromCart, confirmSale, restart,
  } = useMarketGame();

  if (phase === 'menu') {
    return <MarketMenuScreen onStart={startGame} />;
  }

  if (phase === 'result') {
    return (
      <MarketResultScreen
        score={score}
        totalCustomers={totalCustomers}
        onPlayAgain={() => startGame(difficulty)}
        onRestart={restart}
      />
    );
  }

  if (!customer) return null;

  return (
    <MarketPlayScreen
      customer={customer}
      cart={cart}
      score={score}
      customersServed={customersServed}
      totalCustomers={totalCustomers}
      feedback={feedback}
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
      onConfirmSale={confirmSale}
      onRestart={restart}
    />
  );
}
