'use client';

import { useCallback } from 'react';
import { useCrosswordStore } from './crosswordStore';
import CrosswordMenuScreen from './components/CrosswordMenuScreen';
import CrosswordResultScreen from './components/CrosswordResultScreen';
import CrosswordPlayScreen from './components/CrosswordPlayScreen';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export default function CrosswordClient() {
  const {
    phase, puzzle, grid, selectedClue, selectedCell, score, completedClues,
    startGame, selectClue, selectCell, typeLetter, deleteLastLetter, nextPuzzle, restart,
  } = useCrosswordStore();

  const handleSelectClue = useCallback((clue: Parameters<typeof selectClue>[0]) => {
    selectClue(clue);
    speakHebrew(clue.clue);
  }, [selectClue]);

  const handleCellClick = useCallback((row: number, col: number) => {
    selectCell(row, col);
    const { selectedClue: clue } = useCrosswordStore.getState();
    if (clue) speakHebrew(clue.clue);
  }, [selectCell]);

  const handleLetter = useCallback((letter: string) => {
    typeLetter(letter);
    const state = useCrosswordStore.getState();
    if (state.selectedClue && state.completedClues.has(state.selectedClue.number)) {
      speakHebrew(`כָּל הַכָּבוֹד! ${state.selectedClue.answer}!`);
    }
  }, [typeLetter]);

  if (phase === 'menu') {
    return <CrosswordMenuScreen onStart={startGame} />;
  }

  if (phase === 'result') {
    return <CrosswordResultScreen score={score} onNextPuzzle={nextPuzzle} onRestart={restart} />;
  }

  if (!puzzle || !grid.length) return null;

  return (
    <CrosswordPlayScreen
      puzzle={puzzle}
      grid={grid}
      selectedClue={selectedClue}
      selectedCell={selectedCell}
      completedClues={completedClues}
      onCellClick={handleCellClick}
      onLetter={handleLetter}
      onDelete={deleteLastLetter}
      onSelectClue={handleSelectClue}
      onRestart={restart}
    />
  );
}
