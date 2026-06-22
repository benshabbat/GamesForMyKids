'use client';
import { useState, useEffect, useCallback } from 'react';

const LS_KEY = 'gfk_timer_hidden';

export function useTimerVisibility() {
  const [timerHidden, setTimerHidden] = useState(false);

  useEffect(() => {
    try {
      setTimerHidden(localStorage.getItem(LS_KEY) === 'true');
    } catch {}
  }, []);

  const toggleTimer = useCallback(() => {
    setTimerHidden(prev => {
      const next = !prev;
      try {
        if (next) localStorage.setItem(LS_KEY, 'true');
        else localStorage.removeItem(LS_KEY);
      } catch {}
      return next;
    });
  }, []);

  return { timerHidden, toggleTimer };
}
