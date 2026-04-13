'use client';

import { useTakiGame } from './useTakiGame';
import {
  TakiMenuScreen,
  TakiResultScreen,
  TakiGameBoard,
  TakiColorPicker,
} from './components';

export default function TakiGame() {
  const { state, startGame, playCard, closeTaki, chooseColor, drawCard } = useTakiGame();
  const {
    phase, playerHand, computerHand, topCard, effectiveColor,
    inTakiSequence, takiColor, needsColorChoice, message,
    playerScore, computerScore, currentTurn, deck,
  } = state;

  const displayColor = (inTakiSequence && takiColor) ? takiColor : effectiveColor ?? topCard.color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-950 to-teal-950 select-none" dir="rtl">

      {needsColorChoice && currentTurn === 'player' && (
        <TakiColorPicker onPick={chooseColor} />
      )}

      {phase === 'menu' && (
        <TakiMenuScreen
          playerScore={playerScore}
          computerScore={computerScore}
          onStart={startGame}
        />
      )}

      {(phase === 'won' || phase === 'lost') && (
        <TakiResultScreen
          phase={phase}
          message={message}
          playerScore={playerScore}
          computerScore={computerScore}
          onRestart={startGame}
        />
      )}

      {phase === 'playing' && (
        <TakiGameBoard
          playerHand={playerHand}
          computerHand={computerHand}
          topCard={topCard}
          effectiveColor={effectiveColor}
          displayColor={displayColor}
          inTakiSequence={inTakiSequence}
          takiColor={takiColor}
          needsColorChoice={needsColorChoice}
          currentTurn={currentTurn}
          message={message}
          deckSize={deck.length}
          playerScore={playerScore}
          computerScore={computerScore}
          onPlayCard={playCard}
          onDrawCard={drawCard}
          onCloseTaki={closeTaki}
        />
      )}
    </div>
  );
}

