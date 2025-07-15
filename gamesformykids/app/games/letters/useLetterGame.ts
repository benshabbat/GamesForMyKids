import { useState, useEffect, useRef } from "react";
import { Letter, LetterGameState } from "@/types/game";
import { findHebrewVoice } from "../../utils/speechUtils";

const HEBREW_PRONUNCIATIONS: Record<string, string> = {
  alef: "אָלֶף",
  bet: "בֵּית",
  gimel: "גִּימֶל",
  dalet: "דָּלֶת",
  hey: "הֵא",
  vav: "וָו",
  zayin: "זַיִן",
  het: "חֵית",
  tet: "טֵית",
  yud: "יוּד",
  kaf: "כַּף",
  lamed: "לָמֶד",
  mem: "מֵם",
  nun: "נוּן",
  samech: "סָמֶךְ",
  ayin: "עַיִן",
  pey: "פֵּא",
  tzadi: "צָדִי",
  kuf: "קוּף",
  resh: "רֵישׁ",
  shin: "שִׁין",
  tav: "תָּו",
};

function getHebrewPronunciation(letterName: string): string {
  return HEBREW_PRONUNCIATIONS[letterName] || letterName;
}

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
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeeching, setIsSpeeching] = useState(false);
  const repeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("speechSynthesis" in window) {
      setSpeechEnabled(true);

      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      setAudioContext(new AudioContextClass());
    }
  }, []);

  useEffect(() => {
    return () => clearRepeatTimer();
  }, []);

  function clearRepeatTimer() {
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  }

  function startRepeatTimer(letterName: string) {
    clearRepeatTimer();
    repeatTimerRef.current = setInterval(() => {
      speakLetterName(letterName);
    }, 4000);
  }

  async function speakLetterName(letterName: string): Promise<void> {
    if (!speechEnabled || !("speechSynthesis" in window) || isSpeeching) return;

    setIsSpeeching(true);

    const letter = letters.find((l) => l.name === letterName);
    if (!letter) {
      setIsSpeeching(false);
      return;
    }

    window.speechSynthesis.cancel();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const hebrewUtter = new SpeechSynthesisUtterance(getHebrewPronunciation(letterName));
    hebrewUtter.lang = "he-IL";
    hebrewUtter.rate = 0.7;
    hebrewUtter.volume = 1.0;
    hebrewUtter.pitch = 1.2;

    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = findHebrewVoice(voices);
    if (hebrewVoice) hebrewUtter.voice = hebrewVoice;

    const hebrewPromise = new Promise<boolean>((resolve) => {
      let resolved = false;
      hebrewUtter.onend = () => !resolved && (resolved = true, resolve(true));
      hebrewUtter.onerror = () => !resolved && (resolved = true, resolve(false));
      setTimeout(() => !resolved && (resolved = true, window.speechSynthesis.cancel(), resolve(false)), 3000);
    });

    window.speechSynthesis.speak(hebrewUtter);
    await hebrewPromise;
    setIsSpeeching(false);
  }

  function playSuccessSound() {
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
  }

  function getAvailableLetters(): Letter[] {
    const baseLetters = 6;
    const additionalLetters = Math.floor((gameState.level - 1) / 3) * 2;
    const totalLetters = Math.min(baseLetters + additionalLetters, letters.length);
    return letters.slice(0, totalLetters);
  }

  function generateOptions(correctLetter: Letter): Letter[] {
    const availableLetters = getAvailableLetters();
    const incorrectLetters = availableLetters.filter((l) => l.name !== correctLetter.name);
    const selectedIncorrect = incorrectLetters.sort(() => Math.random() - 0.5).slice(0, 3);
    return [correctLetter, ...selectedIncorrect].sort(() => Math.random() - 0.5);
  }

  function selectRandomLetter() {
    const availableLetters = getAvailableLetters();
    const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    const options = generateOptions(randomLetter);

    setGameState((prev) => ({
      ...prev,
      currentChallenge: randomLetter,
      options,
    }));

    setTimeout(() => {
      speakLetterName(randomLetter.name);
      startRepeatTimer(randomLetter.name);
    }, 1200);
  }

  function startGame() {
    clearRepeatTimer();
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false,
      options: [],
    });
    setTimeout(selectRandomLetter, 300);
  }

  function handleLetterClick(selectedLetter: Letter) {
    if (!gameState.currentChallenge) return;
    clearRepeatTimer();

    if (selectedLetter.name === gameState.currentChallenge.name) {
      speakLetterName(selectedLetter.name);
      playSuccessSound();

      if (speechEnabled && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance("כל הכבוד!");
        utter.lang = "he-IL";
        utter.rate = 0.9;
        utter.volume = 1.0;
        utter.pitch = 1.1;
        window.speechSynthesis.speak(utter);
      }

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
    } else {
      setTimeout(() => {
        if (gameState.currentChallenge) {
          speakLetterName(gameState.currentChallenge.name);
          startRepeatTimer(gameState.currentChallenge.name);
        }
      }, 500);
    }
  }

  function resetGame() {
    clearRepeatTimer();
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: false,
      showCelebration: false,
      options: [],
    });
  }

  return {
    gameState,
    speakLetterName,
    startGame,
    handleLetterClick,
    resetGame,
    getAvailableLetters,
  };
}