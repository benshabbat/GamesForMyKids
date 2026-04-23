'use client';

import CharityGameHeader from './components/CharityGameHeader';
import CharityCoin from './components/CharityCoin';
import CharityBasket from './components/CharityBasket';
import GameControls from './components/GameControls';
import GameAreaBackground from './components/GameAreaBackground';
import TzedakahGameInstructions from './components/TzedakahGameInstructions';
import styles from './charity.module.css';
import { useCharityCoinGame } from './useCharityCoinGame';
import { ROUTES } from '@/lib/constants/routes';

const CharityCoinGame = () => {
  const {
    coins,
    score,
    gameStarted,
    basketX,
    gameTime,
    collectedCoins,
    isMobile,
    gameWidth,
    gameHeight,
    basketWidth,
    basketHeight,
    nextGame,
    startGame,
    handleMouseMove,
    handleTouchMove,
    router,
  } = useCharityCoinGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* כותרת ולוח תוצאות */}
        <CharityGameHeader 
          score={score}
          gameTime={gameTime}
          collectedCoins={collectedCoins}
          isMobile={isMobile}
        />

        {/* כפתורי התחלה וסיום */}
        <GameControls
          gameStarted={gameStarted}
          gameTime={gameTime}
          score={score}
          collectedCoins={collectedCoins}
          nextGame={nextGame}
          isMobile={isMobile}
          onStartGame={startGame}
          onNavigateToNext={() => router.push(nextGame.href)}
          onNavigateHome={() => router.push(ROUTES.HOME)}
        />

        {/* איזור המשחק מעוצב */}
        <div className="flex justify-center">
          <div
            className={`relative bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400 border-8 border-white rounded-3xl overflow-hidden shadow-2xl cursor-none touch-none ${styles.charityGameArea || 'charity-game-area'}`}
            style={{ 
              width: gameWidth, 
              height: gameHeight, 
              touchAction: 'none' 
            }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => e.preventDefault()}
          >
            
            {/* רקע מעוצב */}
            <GameAreaBackground isMobile={isMobile} />

            {/* מטבעות מעוצבים */}
            {coins.map(coin => (
              <CharityCoin 
                key={coin.id}
                coin={coin}
                isMobile={isMobile}
              />
            ))}

            {/* הסל המעוצב */}
            <CharityBasket 
              basketX={basketX}
              basketWidth={basketWidth}
              basketHeight={basketHeight}
              gameStarted={gameStarted}
              isMobile={isMobile}
            />

            {/* הוראות מעוצבות */}
            <TzedakahGameInstructions 
              gameStarted={gameStarted}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityCoinGame;
