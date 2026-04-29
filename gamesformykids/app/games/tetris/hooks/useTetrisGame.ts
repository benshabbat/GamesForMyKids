'use client';

import { useEffect } from 'react';
import { useTetrisStore } from '@/lib/stores/tetrisStore';

/**
 * הוק דק שמנהל רק את ה-side-effects של המשחק:
 * טעינה ראשונית, לולאת נפילה, ופקדי מקלדת.
 * כל המצב והפעולות נמצאים ב-useTetrisStore.
 */
export const useTetrisGame = () => {
  const setLoaded = useTetrisStore(s => s.setLoaded);
  const isGameRunning = useTetrisStore(s => s.isGameRunning);
  const level = useTetrisStore(s => s.level);
  const movePiece = useTetrisStore(s => s.movePiece);

  // אופטימיזציה למובייל — התחלה לאחר טעינה מלאה
  useEffect(() => {
    const timer = setTimeout(setLoaded, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // לולאת נפילה — תלויה ברמה כדי לעדכן מהירות
  useEffect(() => {
    if (!isGameRunning) return;
    const dropSpeed = Math.max(200, 1000 - (level - 1) * 100);
    const gameLoop = setInterval(() => {
      movePiece(0, 1);
    }, dropSpeed);
    return () => clearInterval(gameLoop);
  }, [isGameRunning, level, movePiece]);

  // פקדי מקלדת — משתמש ב-getState() כדי להמנע מ-stale closures
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!useTetrisStore.getState().isGameRunning) return;

      // מנע גלילת מסך במהלך המשחק
      if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }

      const { movePiece: move, handleRotate } = useTetrisStore.getState();
      switch (e.key) {
        case 'ArrowLeft':  move(-1, 0); break;
        case 'ArrowRight': move(1, 0);  break;
        case 'ArrowDown':  move(0, 1);  break;
        case 'ArrowUp':
        case ' ':          handleRotate(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // [] intentional — handler uses getState() to avoid stale closures
  }, []);
};
