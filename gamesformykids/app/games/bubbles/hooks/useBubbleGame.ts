import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameAudio } from '@/hooks/shared/audio/useGameAudio';
import { useBubblesStore, type BubbleData } from '../bubblesStore';

export function useBubbleGame() {
  const { audioContext } = useGameAudio();
  const nextBubbleId = useRef(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const { isPlaying, level, score, poppedCount, bubbles } = useBubblesStore(
    useShallow((s) => ({ isPlaying: s.isPlaying, level: s.level, score: s.score, poppedCount: s.poppedCount, bubbles: s.bubbles })),
  );

  const bubbleTypes = useMemo(() => [
    { color: '#FF6B6B', frequency: 261.63 },
    { color: '#4ECDC4', frequency: 293.66 },
    { color: '#45B7D1', frequency: 329.63 },
    { color: '#96CEB4', frequency: 349.23 },
    { color: '#FECA57', frequency: 392.00 },
    { color: '#FF9FF3', frequency: 440.00 },
    { color: '#54A0FF', frequency: 493.88 },
    { color: '#5F27CD', frequency: 523.25 },
  ], []);

  const createBubble = useCallback(() => {
    if (!gameContainerRef.current) return;
    const currentLevel = useBubblesStore.getState().level;
    const containerWidth = gameContainerRef.current.offsetWidth;
    const bubbleType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    const size = 40 + Math.random() * 60;

    const newBubble: BubbleData = {
      id: nextBubbleId.current++,
      x: Math.random() * (containerWidth - size),
      y: window.innerHeight + size,
      size,
      color: bubbleType.color,
      speed: 1 + Math.random() * 2 + currentLevel * 0.3,
      frequency: bubbleType.frequency,
    };

    useBubblesStore.getState().addBubble(newBubble);
  }, [bubbleTypes]);

  const playBubbleSound = useCallback((frequency: number) => {
    if (!audioContext || frequency === 0) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.error('שגיאה בהשמעת צליל בועה:', error);
    }
  }, [audioContext]);

  const handleBubblePop = useCallback((bubbleId: number, frequency: number) => {
    useBubblesStore.getState().popBubble(bubbleId, frequency > 0);
    if (frequency > 0) playBubbleSound(frequency);
  }, [playBubbleSound]);

  // Manage bubble creation interval — recreates only when isPlaying or level changes
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = Math.max(800, 2000 - level * 100);
    const id = setInterval(createBubble, intervalMs);
    return () => clearInterval(id);
  }, [isPlaying, level, createBubble]);

  const startGame = useCallback(() => {
    useBubblesStore.getState().startGame();
    setTimeout(createBubble, 200);
  }, [createBubble]);

  const stopGame = useCallback(() => {
    useBubblesStore.getState().stopGame();
  }, []);

  const resetGame = useCallback(() => {
    useBubblesStore.getState().resetGame();
  }, []);

  return { gameContainerRef, startGame, stopGame, resetGame, handleBubblePop, isPlaying, score, level, poppedCount, bubbles };
}
