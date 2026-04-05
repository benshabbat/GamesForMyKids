'use client';
import { useSimonGame } from './useSimonGame';
import SimonMenuScreen from './components/SimonMenuScreen';
import SimonBoard from './components/SimonBoard';
import SimonGameOverScreen from './components/SimonGameOverScreen';

export default function SimonGame() {
  const { phase, activeColor, playerIdx, best, roundScore, sequenceRef, startGame, handleTap } = useSimonGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {phase === 'menu' && (
        <SimonMenuScreen best={best} onStart={startGame} />
      )}

      {(phase === 'showing' || phase === 'input') && (
        <SimonBoard
          phase={phase}
          activeColor={activeColor}
          playerIdx={playerIdx}
          sequenceLength={sequenceRef.current.length}
          best={best}
          onTap={handleTap}
        />
      )}

      {phase === 'dead' && (
        <SimonGameOverScreen roundScore={roundScore} best={best} onRestart={startGame} />
      )}
    </div>
  );
}
