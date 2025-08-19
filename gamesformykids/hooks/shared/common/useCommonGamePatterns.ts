/**
 * ===============================================
 * Common Game Patterns Hook - פאתרנים נפוצים במשחקים
 * ===============================================
 * 
 * Hook משותף לפאתרנים חוזרים במשחקים
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface GameTimer {
  timeElapsed: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => void;
}

export interface GameScore {
  current: number;
  best: number;
  increment: (points?: number) => void;
  reset: () => void;
  saveBest: () => void;
}

export interface GameAudio {
  isMuted: boolean;
  volume: number;
  playSound: (soundType: 'correct' | 'incorrect' | 'complete' | 'click') => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

/**
 * Hook לניהול טיימר במשחק
 */
export const useGameTimer = (): GameTimer => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
    setTimeElapsed(0);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeElapsed(0);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    timeElapsed,
    isRunning,
    start,
    pause,
    resume,
    reset,
    stop
  };
};

/**
 * Hook לניהול ציון במשחק
 */
export const useGameScore = (gameId: string): GameScore => {
  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`game_best_score_${gameId}`);
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const increment = useCallback((points: number = 10) => {
    setCurrent(prev => prev + points);
  }, []);

  const reset = useCallback(() => {
    setCurrent(0);
  }, []);

  const saveBest = useCallback(() => {
    if (current > best) {
      setBest(current);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`game_best_score_${gameId}`, current.toString());
      }
    }
  }, [current, best, gameId]);

  return {
    current,
    best,
    increment,
    reset,
    saveBest
  };
};

/**
 * Hook לניהול אודיו במשחק
 */
export const useGameAudio = (): GameAudio => {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_audio_muted');
      return saved === 'true';
    }
    return false;
  });

  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_audio_volume');
      return saved ? parseFloat(saved) : 0.7;
    }
    return 0.7;
  });

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_audio_muted', muted.toString());
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_audio_volume', clampedVolume.toString());
    }
  }, []);

  const playSound = useCallback((soundType: 'correct' | 'incorrect' | 'complete' | 'click') => {
    if (isMuted || typeof window === 'undefined') return;

    // יצירת צליל פשוט באמצעות Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // הגדרת תדירות לפי סוג הצליל
    const frequencies = {
      correct: [523.25, 659.25, 783.99], // C5, E5, G5 (major chord)
      incorrect: [220, 185], // A3, F#3 (minor sound)
      complete: [523.25, 659.25, 783.99, 1046.5], // C5, E5, G5, C6 (victory)
      click: [800] // Simple click
    };

    const freq = frequencies[soundType];
    let currentTime = audioContext.currentTime;

    freq.forEach((frequency, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(frequency, currentTime);
      gain.gain.setValueAtTime(0, currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.3, currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);
      
      osc.start(currentTime);
      osc.stop(currentTime + 0.3);
      
      currentTime += soundType === 'complete' ? 0.1 : 0.05;
    });
  }, [isMuted, volume]);

  return {
    isMuted,
    volume,
    playSound,
    setMuted,
    setVolume
  };
};

/**
 * Hook משולב לניהול כל הפאתרנים הנפוצים במשחק
 */
export const useCommonGamePatterns = (gameId: string) => {
  const timer = useGameTimer();
  const score = useGameScore(gameId);
  const audio = useGameAudio();

  return {
    timer,
    score,
    audio
  };
};
