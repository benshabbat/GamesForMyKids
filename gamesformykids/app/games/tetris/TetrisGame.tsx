'use client';

import GenericStartScreen from '@/components/shared/GenericStartScreen';
import { useTetrisGame } from './hooks/useTetrisGame';
import GameBoard from './components/GameBoard';
import { MobileInfoPanel, DesktopInfoPanel } from './components/InfoPanels';
import TouchControls from './components/TouchControls';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';

function TetrisGame(){
  const { gameState, actions, getBoardWithCurrentPiece } = useTetrisGame();

  if (gameState.isLoading) {
    return <LoadingScreen />;
  }

  if (gameState.showStartScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
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
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center p-4 pt-20">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 w-full max-w-6xl">
          {/* Left Info Panel */}
          <div className="col-span-3">
            <DesktopInfoPanel 
              score={gameState.score} 
              level={gameState.level} 
              linesCleared={gameState.linesCleared} 
              nextPiece={gameState.nextPiece} 
            />
          </div>

          {/* Game Board - Center */}
          <div className="col-span-6 flex justify-center">
            <GameBoard displayBoard={displayBoard} />
          </div>
          
          {/* Right Controls Panel */}
          <div className="col-span-3">
            <TouchControls
              isGameRunning={gameState.isGameRunning}
              gameOver={gameState.gameOver}
              score={gameState.score}
              onMove={actions.movePiece}
              onRotate={actions.handleRotate}
              onStartGame={actions.startNewGame}
              isDesktop={true}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center w-full max-w-sm px-4">
          {/* Mobile Info Panel */}
          <MobileInfoPanel 
            score={gameState.score} 
            level={gameState.level} 
            linesCleared={gameState.linesCleared} 
            nextPiece={gameState.nextPiece} 
          />

          {/* Game Board */}
          <div className="my-4">
            <GameBoard displayBoard={displayBoard} />
          </div>

          {/* Touch Controls */}
          <TouchControls
            isGameRunning={gameState.isGameRunning}
            gameOver={gameState.gameOver}
            score={gameState.score}
            onMove={actions.movePiece}
            onRotate={actions.handleRotate}
            onStartGame={actions.startNewGame}
            isDesktop={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;
