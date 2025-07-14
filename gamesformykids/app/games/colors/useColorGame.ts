import { useState, useEffect } from "react";
import { Color, GameState } from "@/types/game";

export function useColorGame(colors: Color[]) {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)()
      );
    }
  }, []);

  // קריאת שם הצבע בעברית
  const speakColorName = (colorName: string): void => {
    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(colorName);
      utter.lang = "he-IL";
      window.speechSynthesis.speak(utter);
    }
  };

  // השמעת צליל צבע
  const playAnimalSound = (colorSounds: number[]): void => {
    if (!audioContext) return;
    colorSounds.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.value = 0.2;
      osc.start(audioContext.currentTime + i * 0.2);
      osc.stop(audioContext.currentTime + i * 0.2 + 0.18);
    });
  };

  // צליל הצלחה
  const playSuccessSound = (): void => {
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(audioContext.destination);
    gain.gain.value = 0.3;
    osc.start();
    osc.stop(audioContext.currentTime + 0.3);
  };

  // בחירת צבע אקראי לאתגר
  const selectRandomColor = (): void => {
    const availableColors = getAvailableColors();
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
    setGameState((prev) => ({ ...prev, currentChallenge: randomColor }));
    setTimeout(() => {
      speakColorName(randomColor.hebrew);
    }, 1000);
  };

  // התחלת המשחק
  const startGame = (): void => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
    });
    setTimeout(selectRandomColor, 300);
  };

  // טיפול בלחיצה על צבע
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;
    playAnimalSound(selectedColor.sound);

    if (selectedColor.name === gameState.currentChallenge.name) {
      playSuccessSound();
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 10,
        showCelebration: true,
      }));
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          level: prev.level + 1,
          showCelebration: false,
        }));
        selectRandomColor();
      }, 1500);
    }
  };

  // רענון המשחק
  const resetGame = (): void => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
    });
  };

  // קביעת כמות הצבעים לפי רמה
  const getAvailableColors = (): Color[] => {
    const count = Math.min(3 + gameState.level, colors.length);
    return colors.slice(0, count);
  };

  return {
    gameState,
    speakColorName,
    startGame,
    handleColorClick,
    resetGame,
    getAvailableColors,
  };
}