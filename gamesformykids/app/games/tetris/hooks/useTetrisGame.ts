'use client';

import { useEffect, useRef } from 'react';
import { useTetrisStore } from '../store/tetrisStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { useKeyboardControls } from '@/hooks/shared/game-controls';

/**
 * הוק דק שמנהל רק את ה-side-effects של המשחק:
 * טעינה ראשונית, לולאת נפילה, ופקדי מקלדת.
 * כל המצב והפעולות נמצאים ב-useTetrisStore.
 */
export const useTetrisGame = () => {
  const setLoaded = useTetrisStore(s => s.setLoaded);
  const phase = useTetrisStore(s => s.phase);
  const level = useTetrisStore(s => s.level);
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotate = useTetrisStore(s => s.handleRotate);
  const togglePause = useTetrisStore(s => s.togglePause);

  const { saveGameResultRef } = useGameCompletion('tetris');
  const startTimeRef = useRef(0);
  const prevGameOverRef = useRef(false);
  const prevPhaseRef = useRef(phase);

  // אופטימיזציה למובייל — התחלה לאחר טעינה מלאה
  useEffect(() => {
    const timer = setTimeout(setLoaded, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPlaying = phase === 'playing';
  const isPaused = phase === 'paused';
  const isGameOver = phase === 'gameover';

  // מעקב אחר זמן תחילת המשחק — לא מתאפס בחזרה מהשהיה
  useEffect(() => {
    if (isPlaying && prevPhaseRef.current !== 'paused') {
      startTimeRef.current = Date.now();
      prevGameOverRef.current = false;
    }
    prevPhaseRef.current = phase;
  }, [phase, isPlaying]);

  // שמירת ניקוד בסיום המשחק
  useEffect(() => {
    if (isGameOver && !prevGameOverRef.current) {
      const { score, level: finalLevel } = useTetrisStore.getState();
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score, level: finalLevel, durationSeconds });
    }
    prevGameOverRef.current = isGameOver;
  }, [isGameOver, saveGameResultRef]);

  // לולאת נפילה — תלויה ברמה כדי לעדכן מהירות
  useEffect(() => {
    if (!isPlaying) return;
    const dropSpeed = Math.max(200, 1000 - (level - 1) * 100);
    const gameLoop = setInterval(() => {
      movePiece(0, 1);
    }, dropSpeed);
    return () => clearInterval(gameLoop);
  }, [isPlaying, level, movePiece]);

  // פקדי מקלדת בזמן משחק
  useKeyboardControls({
    ArrowLeft: () => movePiece(-1, 0),
    ArrowRight: () => movePiece(1, 0),
    ArrowDown: () => movePiece(0, 1),
    ArrowUp: handleRotate,
    ' ': handleRotate,
  }, isPlaying);

  // השהיה/המשך — פעיל גם במצב מושהה כדי לאפשר לחזור למשחק
  useKeyboardControls({
    Escape: togglePause,
    p: togglePause,
    P: togglePause,
  }, isPlaying || isPaused);
};
