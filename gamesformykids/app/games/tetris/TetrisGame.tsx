'use client';

import React from 'react';
import UnifiedHeader from '@/components/shared/UnifiedHeader';
import GenericStartScreen from '@/components/shared/GenericStartScreen';
import { TetrisGameProps } from './types';
import { useTetrisGame } from './hooks/useTetrisGame';
import GameBoard from './components/GameBoard';
import { MobileInfoPanel, DesktopInfoPanel } from './components/InfoPanels';
import TouchControls from './components/TouchControls';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';

const TetrisGame: React.FC<TetrisGameProps> = ({ onBack }) => {
  const { gameState, actions, getBoardWithCurrentPiece } = useTetrisGame();

  if (gameState.isLoading) {
    return <LoadingScreen />;
  }

  if (gameState.showStartScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <UnifiedHeader 
          title="🧩 טטריס לילדים"
          onHome={onBack}
          variant="start-screen"
          className="bg-gradient-to-r from-purple-600 to-indigo-600"
        />
        <GenericStartScreen
          title="🧩 טטריס לילדים 🧩"
          subTitle="המשחק הכי כיפי בעולם!"
          gameSteps={[
            { icon: "⬇️", title: "חלקים נופלים", description: "חלקים נופלים מלמעלה" },
            { icon: "🔄", title: "סיבוב חלקים", description: "סובב חלקים בחץ למעלה או רווח" },
            { icon: "➡️", title: "הזזה", description: "הזז ימינה ושמאלה בחיצים" },
            { icon: "⚡", title: "ניקוי שורות", description: "מלא שורות כדי לנקות אותן" },
            { icon: "🏆", title: "ניקוד גבוה", description: "השג ניקוד גבוה!" }
          ]}
          gameStepsBgClass="bg-white/20"
          items={[]}
          onStart={actions.startNewGame}
          buttonFromColor="from-yellow-400"
          buttonToColor="to-orange-500"
          backgroundStyle="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"
          itemsTitle="איך משחקים:"
          itemsDescription="למד את החוקים והתחל לשחק!"
          itemsDescriptionColor="text-blue-100"
          itemsGridClass="grid-cols-1"
          textColorHeader="text-yellow-300"
          textColorSubHeader="text-white/90"
          customItemsRenderer={() => <div></div>}
        />
      </div>
    );
  }

  const displayBoard = getBoardWithCurrentPiece();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 relative overflow-hidden">
      <UnifiedHeader 
        title="🧩 טטריס לילדים"
        onHome={actions.goToStartScreen}
        variant="game-header"
        className="bg-gradient-to-r from-purple-600 to-indigo-600"
      />
      
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center p-2 sm:p-4 pt-20">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 items-center xl:items-start w-full max-w-7xl">
          
          {/* Mobile Info Panel */}
          <MobileInfoPanel 
            score={gameState.score} 
            level={gameState.level} 
            linesCleared={gameState.linesCleared} 
            nextPiece={gameState.nextPiece} 
          />

          {/* Game Board */}
          <GameBoard displayBoard={displayBoard} />
          
          {/* Desktop Info Panel */}
          <DesktopInfoPanel 
            score={gameState.score} 
            level={gameState.level} 
            linesCleared={gameState.linesCleared} 
            nextPiece={gameState.nextPiece} 
          />
        </div>

        {/* Touch Controls */}
        <TouchControls
          isGameRunning={gameState.isGameRunning}
          gameOver={gameState.gameOver}
          score={gameState.score}
          onMove={actions.movePiece}
          onRotate={actions.handleRotate}
          onStartGame={actions.startNewGame}
        />
      </div>
    </div>
  );
};

export default TetrisGame;
