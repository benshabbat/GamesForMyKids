'use client';

import { useShallow } from 'zustand/react/shallow';
import { useTzedakahStore } from './tzedakahStore';
import { useCharityCoinGame } from './useCharityCoinGame';
import CharityGameHeader from './components/CharityGameHeader';
import CharityCoin from './components/CharityCoin';
import CharityBasket from './components/CharityBasket';
import GameControls from './components/GameControls';
import GameAreaBackground from './components/GameAreaBackground';
import TzedakahGameInstructions from './components/TzedakahGameInstructions';
import styles from './charity.module.css';

const CharityCoinGame = () => {
  const { gameWidth, gameHeight, handleMouseMove, handleTouchMove } = useCharityCoinGame();
  const coins = useTzedakahStore(useShallow((s) => s.coins));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-4">
      <div className="max-w-6xl mx-auto">

        <CharityGameHeader />
        <GameControls />

        <div className="flex justify-center">
          <div
            className={`relative bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400 border-8 border-white rounded-3xl overflow-hidden shadow-2xl cursor-none touch-none ${styles.charityGameArea || 'charity-game-area'}`}
            style={{ width: gameWidth, height: gameHeight, touchAction: 'none' }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => e.preventDefault()}
          >
            <GameAreaBackground />
            {coins.map(coin => <CharityCoin key={coin.id} coin={coin} />)}
            <CharityBasket />
            <TzedakahGameInstructions />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CharityCoinGame;
