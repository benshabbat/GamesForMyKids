import { useState, useEffect } from "react";
import { Letter, LetterGameState } from "@/types/game";

export function useLetterGame(letters: Letter[]) {
  const [gameState, setGameState] = useState<LetterGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
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

  // קריאת שם האות בעברית
  const speakLetterName = (letterName: string): void => {
    if ("speechSynthesis" in window) {
      const letter = letters.find(l => l.name === letterName);
      if (letter) {
        const utter = new window.SpeechSynthesisUtterance(letter.hebrew);
        utter.lang = "he-IL";
        utter.rate = 0.8; // קצב איטי יותר לילדים
        window.speechSynthesis.speak(utter);
      }
    }
  };

  // השמעת צליל אות
  const playLetterSound = (letterSounds: number[]): void => {
    if (!audioContext) return;
    letterSounds.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.value = 0.2;
      osc.start(audioContext.currentTime + i * 0.15);
      osc.stop(audioContext.currentTime + i * 0.15 + 0.12);
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

  // יצירת 4 אפשרויות (1 נכונה + 3 לא נכונות)
  const generateOptions = (correctLetter: Letter): Letter[] => {
    const availableLetters = getAvailableLetters();
    const incorrectLetters = availableLetters.filter(
      letter => letter.name !== correctLetter.name
    );
    
    // בחירת 3 אותיות לא נכונות באופן אקראי
    const shuffledIncorrect = incorrectLetters.sort(() => Math.random() - 0.5);
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    
    // יצירת מערך של 4 אפשרויות וערבוב
    const options = [correctLetter, ...selectedIncorrect];
    return options.sort(() => Math.random() - 0.5);
  };

  // בחירת אות אקראית לאתגר
  const selectRandomLetter = (): void => {
    const availableLetters = getAvailableLetters();
    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    const options = generateOptions(randomLetter);
    
    setGameState((prev) => ({ 
      ...prev, 
      currentChallenge: randomLetter,
      options 
    }));
    
    setTimeout(() => {
      speakLetterName(randomLetter.name);
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
      options: [],
    });
    setTimeout(selectRandomLetter, 300);
  };

  // טיפול בלחיצה על אות
  const handleLetterClick = (selectedLetter: Letter): void => {
    if (!gameState.currentChallenge) return;
    playLetterSound(selectedLetter.sound);

    if (selectedLetter.name === gameState.currentChallenge.name) {
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
        selectRandomLetter();
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
      options: [],
    });
  };

  // קביעת כמות האותיות לפי רמה
  const getAvailableLetters = (): Letter[] => {
    const count = Math.min(4 + gameState.level, letters.length);
    return letters.slice(0, count);
  };

  return {
    gameState,
    speakLetterName,
    startGame,
    handleLetterClick,
    resetGame,
    getAvailableLetters,
  };
}