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
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isSpeeching, setIsSpeeching] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ('speechSynthesis' in window) {
        setSpeechEnabled(true);
        
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log('Voices loaded:', voices.length);
        };
        
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        } else {
          loadVoices();
        }
      }
      
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        setAudioContext(ctx);
      }
    }
  }, []);

  // הגייה עברית לאותיות
  const getHebrewPronunciation = (letterName: string): string => {
    const pronunciations: { [key: string]: string } = {
      'alef': 'אָלֶף',
      'bet': 'בֵּית',
      'gimel': 'גִּימֶל',
      'dalet': 'דָּלֶת',
      'hey': 'הֵא',
      'vav': 'וָו',
      'zayin': 'זַיִן',
      'het': 'חֵית',
      'tet': 'טֵית',
      'yud': 'יוּד',
      'kaf': 'כַּף',
      'lamed': 'לָמֶד',
      'mem': 'מֵם',
      'nun': 'נוּן',
      'samech': 'סָמֶךְ',
      'ayin': 'עַיִן',
      'pey': 'פֵּא',
      'tzadi': 'צָדִי',
      'kuf': 'קוּף',
      'resh': 'רֵישׁ',
      'shin': 'שִׁין',
      'tav': 'תָּו'
    };

    return pronunciations[letterName] || letterName;
  };

  // הקראת שמות האותיות בעברית
  const speakLetterName = async (letterName: string): Promise<void> => {
    if (!speechEnabled || !('speechSynthesis' in window) || isSpeeching) {
      console.log('Speech not available or already speaking');
      return;
    }

    try {
      setIsSpeeching(true);

      const letter = letters.find(l => l.name === letterName);
      const hebrewName = getHebrewPronunciation(letterName);

      if (!letter) {
        setIsSpeeching(false);
        return;
      }

      window.speechSynthesis.cancel();
      await new Promise(resolve => setTimeout(resolve, 200));

      const hebrewUtter = new SpeechSynthesisUtterance(hebrewName);
      hebrewUtter.lang = "he-IL";
      hebrewUtter.rate = 0.7;
      hebrewUtter.volume = 1.0;
      hebrewUtter.pitch = 1.2;

      const voices = window.speechSynthesis.getVoices();
      
      // חיפוש קול עברי נשי
      const hebrewFemaleVoice = voices.find(voice =>
        (voice.lang.includes('he') || voice.lang.includes('iw') || voice.name.toLowerCase().includes('hebrew')) &&
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('carmit') ||
         voice.name.toLowerCase().includes('dana') ||
         !voice.name.toLowerCase().includes('male'))
      );

      const hebrewVoice = hebrewFemaleVoice || voices.find(voice =>
        voice.lang.includes('he') ||
        voice.lang.includes('iw') ||
        voice.name.toLowerCase().includes('hebrew')
      );

      if (hebrewVoice) {
        hebrewUtter.voice = hebrewVoice;
        console.log('Using Hebrew voice:', hebrewVoice.name);
      }

      const hebrewPromise = new Promise<boolean>((resolve) => {
        let resolved = false;

        hebrewUtter.onend = () => {
          if (!resolved) {
            resolved = true;
            console.log('Hebrew speech succeeded:', hebrewName);
            resolve(true);
          }
        };

        hebrewUtter.onerror = (event) => {
          if (!resolved) {
            resolved = true;
            console.log('Hebrew speech failed:', event.error);
            resolve(false);
          }
        };

        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            window.speechSynthesis.cancel();
            resolve(false);
          }
        }, 3000);
      });

      window.speechSynthesis.speak(hebrewUtter);
      await hebrewPromise;

      setIsSpeeching(false);

    } catch (error) {
      console.log('Speech failed completely:', error);
      setIsSpeeching(false);
    }
  };

  // צליל הצלחה נעים
  const playSuccessSound = (): void => {
    if (!audioContext) return;
    
    const notes = [523, 659, 784]; // C-E-G chord
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

  const generateOptions = (correctLetter: Letter): Letter[] => {
    const availableLetters = getAvailableLetters();
    const incorrectLetters = availableLetters.filter(
      letter => letter.name !== correctLetter.name
    );
    
    const shuffledIncorrect = incorrectLetters.sort(() => Math.random() - 0.5);
    const selectedIncorrect = shuffledIncorrect.slice(0, 3);
    
    const options = [correctLetter, ...selectedIncorrect];
    return options.sort(() => Math.random() - 0.5);
  };

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
    }, 1200);
  };

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

  const handleLetterClick = (selectedLetter: Letter): void => {
    if (!gameState.currentChallenge) return;
    
    speakLetterName(selectedLetter.name);

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

  const getAvailableLetters = (): Letter[] => {
    const baseLetters = 6;
    const additionalLetters = Math.floor((gameState.level - 1) / 3) * 2;
    const totalLetters = Math.min(baseLetters + additionalLetters, letters.length);
    return letters.slice(0, totalLetters);
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