import { useState, useEffect, useRef } from "react";
import { Shape, ShapeGameState } from "@/types/game";
import { findHebrewVoice } from "../../utils/speechUtils";

export function useShapeGame(shapes: Shape[]) {
  const [gameState, setGameState] = useState<ShapeGameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false,
    options: [],
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeeching, setIsSpeeching] = useState(false);
  const repeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Speech setup
    if ("speechSynthesis" in window) {
      setSpeechEnabled(true);
      const loadVoices = () => window.speechSynthesis.getVoices();
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }

    // Audio setup
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      setAudioContext(new AudioContextClass());
    }
  }, []);

  // --- Utility Functions ---

  const clearRepeatTimer = () => {
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  const speakMessage = async (text: string, lang = "he-IL", rate = 1, pitch = 1.2) => {
    if (!speechEnabled || !("speechSynthesis" in window)) return;
    return new Promise<void>(resolve => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = rate;
      utter.pitch = pitch;
      utter.volume = 1.0;
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.speak(utter);
    });
  };


  const getAvailableShapes = (): Shape[] => {
    const baseShapes = 4;
    const additionalShapes = Math.floor((gameState.level - 1) / 3);
    const totalShapes = Math.min(baseShapes + additionalShapes, shapes.length);
    return shapes.slice(0, totalShapes);
  };

  const generateOptions = (correctShape: Shape): Shape[] => {
    const availableShapes = getAvailableShapes();
    const incorrectShapes = availableShapes.filter(s => s.name !== correctShape.name);
    const shuffledIncorrect = incorrectShapes.sort(() => Math.random() - 0.5);
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    return [correctShape, ...selectedIncorrect].sort(() => Math.random() - 0.5);
  };

  // --- Audio & Speech ---

  const playSuccessSound = () => {
    if (!audioContext) return;
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(audioContext.destination);
      const startTime = audioContext.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  };

  const speakShapeName = async (shapeName: string): Promise<void> => {
    if (!speechEnabled || !("speechSynthesis" in window) || isSpeeching) return;
    try {
      setIsSpeeching(true);
      const shape = shapes.find(s => s.name === shapeName);
      if (!shape) {
        setIsSpeeching(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(shape.hebrew);
      utter.lang = "he-IL";
      utter.rate = 0.7;
      utter.volume = 1.0;
      utter.pitch = 1.2;
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoice = findHebrewVoice(voices);
      if (hebrewVoice) {
        utter.voice = hebrewVoice;
      }
      await new Promise<boolean>(resolve => {
        let resolved = false;
        utter.onend = () => { if (!resolved) { resolved = true; resolve(true); } };
        utter.onerror = () => { if (!resolved) { resolved = true; resolve(false); } };
        setTimeout(() => { if (!resolved) { resolved = true; window.speechSynthesis.cancel(); resolve(false); } }, 3000);
      });
      window.speechSynthesis.speak(utter);
      setIsSpeeching(false);
    } catch {
      setIsSpeeching(false);
    }
  };

  const startGame = () => {
    clearRepeatTimer();
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });

    setTimeout(() => {
      const availableShapes = getAvailableShapes();
      const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
      const options = generateOptions(randomShape);

      setGameState(prev => ({
        ...prev,
        currentChallenge: randomShape,
        options
      }));

      setTimeout(async () => {
        await speakMessage("בהצלחה!", "he-IL", 1.1, 1.3);
        await speakShapeName(randomShape.name);
      }, 100); // היה 500
    }, 300);
  };

  const handleShapeClick = (selectedShape: Shape) => {
    if (!gameState.currentChallenge) return;
    clearRepeatTimer();

    if (selectedShape.name === gameState.currentChallenge.name) {
      const availableShapes = getAvailableShapes();
      const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
      const options = generateOptions(randomShape);

      setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        showCelebration: true,
        currentChallenge: selectedShape,
        options: prev.options,
      }));

      (async () => {
        playSuccessSound();
        if (speechEnabled && "speechSynthesis" in window) {
          await speakMessage("כל הכבוד מצאת את הצורה הנכונה! בואו נעבור לצורה החדשה", "he-IL", 1.1, 1.5);

          setGameState(prev => ({
            ...prev,
            level: prev.level + 1,
            showCelebration: false,
            currentChallenge: randomShape,
            options,
          }));
          await speakShapeName(randomShape.name);
        }
      })();
    } else {
      (async () => {
        await speakMessage("לא נורא, נסו שוב!", "he-IL", 1.1, 1.3);
        await speakShapeName(gameState.currentChallenge!.name);
      })();
    }
  };

  const resetGame = () => {
    clearRepeatTimer();
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  };

  useEffect(() => {
    return () => clearRepeatTimer();
  }, []);

  return {
    gameState,
    speakShapeName,
    startGame,
    handleShapeClick,
    resetGame,
    getAvailableShapes,
  };
}