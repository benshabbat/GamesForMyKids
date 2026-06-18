'use client';
import { useEscapeRoomStore } from './escapeRoomStore';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';
import { ROOMS } from './components/puzzleData';

export function useEscapeRoom() {
  const phase          = useEscapeRoomStore(s => s.phase);
  const room           = useEscapeRoomStore(s => s.room);
  const solvedIds      = useEscapeRoomStore(s => s.solvedIds);
  const revealedDigits = useEscapeRoomStore(s => s.revealedDigits);
  const activePuzzle   = useEscapeRoomStore(s => s.activePuzzle);
  const funMessage     = useEscapeRoomStore(s => s.funMessage);
  const score          = useEscapeRoomStore(s => s.score);
  const hintsUsed      = useEscapeRoomStore(s => s.hintsUsed);
  const { startGame, clickHotspot, submitAnswer, dismissOverlay, applyHint, resetGame } = useEscapeRoomStore();

  const handleStart = (roomId: string) => {
    startGame(roomId);
    speakHebrew('בואו נפרוץ את החדר!');
  };

  const handleClickHotspot = (hotspotId: string) => {
    clickHotspot(hotspotId);
    const state = useEscapeRoomStore.getState();
    if (state.activePuzzle) {
      speakHebrew(state.activePuzzle.puzzle.question);
    } else if (state.funMessage) {
      speakHebrew(state.funMessage);
    }
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = submitAnswer(answer);
    const state = useEscapeRoomStore.getState();
    if (isCorrect) {
      const latestDigit = state.revealedDigits[state.revealedDigits.length - 1];
      const msg = state.phase === 'result'
        ? 'פרצת את החדר! כל הכבוד!'
        : `נכון! ספרה ${latestDigit} התגלתה!`;
      speakHebrew(msg);
    } else {
      speakHebrew('לא נכון — נסה שוב!');
    }
    return isCorrect;
  };

  const handleHint = () => {
    const hint = applyHint();
    if (hint) speakHebrew(hint);
    return hint;
  };

  const puzzleCount = room?.hotspots.filter(h => h.puzzle !== null).length ?? 0;

  return {
    phase, room, rooms: ROOMS, solvedIds, revealedDigits, activePuzzle,
    funMessage, score, hintsUsed, puzzleCount,
    handleStart, handleClickHotspot, handleAnswer, handleHint,
    dismissOverlay, resetGame,
  };
}
