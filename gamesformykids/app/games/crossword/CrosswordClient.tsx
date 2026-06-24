'use client';

import { useCallback } from 'react';
import { useCrosswordStore } from './crosswordStore';
import { CrosswordGrid } from './components/CrosswordGrid';
import { HebrewKeyboard } from './components/HebrewKeyboard';
import { CROSSWORD_PUZZLES } from './data/puzzles';
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
      speakHebrew(`כל הכבוד! ${state.selectedClue.answer}!`);
    }
  }, [typeLetter]);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔤</div>
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">תשבץ עברי</h1>
          <p className="text-lg text-indigo-600">מלא את התשבץ עם מילים עבריות!</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm w-full">
          {CROSSWORD_PUZZLES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => startGame(i)}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg border-2 border-indigo-100 hover:border-indigo-400 transition-all active:scale-95 text-center"
            >
              <div className="text-2xl mb-1">🧩</div>
              <div className="font-bold text-indigo-800 text-sm">{p.title}</div>
              <div className="text-xs text-gray-500 mt-1">תשבץ {i + 1}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center p-4" dir="rtl">
        <div className="text-center">
          <div className="text-7xl mb-6">🏆</div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">כל הכבוד!</h1>
          <p className="text-2xl text-green-700 mb-2">פתרת את התשבץ!</p>
          <p className="text-xl text-green-600 mb-8">השלמת {score} מילים</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={nextPuzzle}
              className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-2xl hover:bg-green-600 active:scale-95 transition-all shadow-lg"
            >
              תשבץ הבא ➡️
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

  if (!puzzle || !grid.length) return null;

  const totalClues = puzzle.clues.length;
  const acrossClues = puzzle.clues.filter((c) => c.direction === 'across');
  const downClues = puzzle.clues.filter((c) => c.direction === 'down');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={restart} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          ← תפריט
        </button>
        <h1 className="text-2xl font-bold text-indigo-800">תשבץ: {puzzle.title}</h1>
        <div className="text-sm font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow">
          {completedClues.size}/{totalClues}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedClues.size / totalClues) * 100}%` }}
        />
      </div>

      {/* Selected clue banner */}
      {selectedClue && (
        <div
          className="bg-white rounded-xl p-3 mb-4 shadow-md border-2 border-indigo-200 flex items-center gap-3 cursor-pointer"
          onClick={() => speakHebrew(selectedClue.clue)}
        >
          <span className="text-3xl">{selectedClue.emoji}</span>
          <div>
            <div className="text-xs text-gray-500 font-medium">
              {selectedClue.number} {selectedClue.direction === 'across' ? 'אופקי' : 'אנכי'}
            </div>
            <div className="font-bold text-gray-800">{selectedClue.clue}</div>
          </div>
          <span className="ms-auto text-2xl">🔊</span>
        </div>
      )}

      {/* Grid */}
      <div className="flex justify-center mb-4">
        <CrosswordGrid
          grid={grid}
          puzzle={puzzle}
          selectedClue={selectedClue}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
        />
      </div>

      {/* Keyboard */}
      <HebrewKeyboard onLetter={handleLetter} onDelete={deleteLastLetter} />

      {/* Clue lists */}
      <div className="mt-4 grid grid-cols-2 gap-3 max-w-lg mx-auto">
        <div>
          <h3 className="font-bold text-indigo-700 mb-2 text-sm">אופקי</h3>
          <div className="space-y-1">
            {acrossClues.map((c) => (
              <button
                key={c.number}
                onClick={() => handleSelectClue(c)}
                className={`w-full text-right text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  selectedClue?.number === c.number && selectedClue.direction === 'across'
                    ? 'bg-indigo-500 text-white font-bold'
                    : completedClues.has(c.number)
                    ? 'bg-green-100 text-green-700 line-through'
                    : 'bg-white text-gray-700 hover:bg-indigo-50'
                }`}
              >
                <span className="font-bold">{c.number}.</span> {c.emoji} {c.clue}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-indigo-700 mb-2 text-sm">אנכי</h3>
          <div className="space-y-1">
            {downClues.map((c) => (
              <button
                key={c.number}
                onClick={() => handleSelectClue(c)}
                className={`w-full text-right text-xs px-2 py-1.5 rounded-lg transition-colors ${
                  selectedClue?.number === c.number && selectedClue.direction === 'down'
                    ? 'bg-indigo-500 text-white font-bold'
                    : completedClues.has(c.number)
                    ? 'bg-green-100 text-green-700 line-through'
                    : 'bg-white text-gray-700 hover:bg-indigo-50'
                }`}
              >
                <span className="font-bold">{c.number}.</span> {c.emoji} {c.clue}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
