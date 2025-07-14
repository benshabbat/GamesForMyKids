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
  const [isSpeeching, setIsSpeeching] = useState(false); // מניעת התנגשויות

  useEffect(() => {
    if (typeof window !== "undefined") {
      // בדיקה אם Speech Synthesis זמין
      if ('speechSynthesis' in window) {
        setSpeechEnabled(true);
        
        // טעינת קולות מראש
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
      
      // יצירת AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        setAudioContext(ctx);
      }
    }
  }, []);

  // פונקציה להפעלת שמע עם מספר נסיונות
  const enableAudio = async (): Promise<boolean> => {
    try {
      // הפעלת AudioContext
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      return true;
    } catch (error) {
      console.log('Audio activation failed:', error);
      return false;
    }
  };

  // קריאת שם האות - רק דיבור, בלי צלילים
  const speakLetterName = async (letterName: string): Promise<void> => {
    if (!speechEnabled || !('speechSynthesis' in window) || isSpeeching) {
      console.log('Speech not available or already speaking');
      return;
    }

    try {
      setIsSpeeching(true);
      
      // הפעלת שמע קודם
      await enableAudio();
      
      const letter = letters.find(l => l.name === letterName);
      if (!letter) return;

      // עצירת כל הקראה קודמת והמתנה
      window.speechSynthesis.cancel();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // נסיון 1: עברית
      let success = false;
      
      try {
        const hebrewUtter = new SpeechSynthesisUtterance(letter.hebrew);
        hebrewUtter.lang = "he-IL";
        hebrewUtter.rate = 0.7;
        hebrewUtter.volume = 1.0;
        hebrewUtter.pitch = 1.0;
        
        // חיפוש קול עברי
        const voices = window.speechSynthesis.getVoices();
        const hebrewVoice = voices.find(voice => 
          voice.lang.includes('he') || 
          voice.lang.includes('iw')
        );
        
        if (hebrewVoice) {
          hebrewUtter.voice = hebrewVoice;
        }

        const hebrewPromise = new Promise<boolean>((resolve) => {
          let resolved = false;
          
          hebrewUtter.onend = () => {
            if (!resolved) {
              resolved = true;
              console.log('Hebrew speech succeeded');
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
          }, 2000);
        });

        window.speechSynthesis.speak(hebrewUtter);
        success = await hebrewPromise;
      } catch (error) {
        console.log('Hebrew attempt failed:', error);
      }

      // נסיון 2: אם עברית נכשלה - ננסה אנגלית
      if (!success) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        try {
          // שמות האותיות באנגלית
          const letterNames: { [key: string]: string } = {
            'alef': 'Alef',
            'bet': 'Bet', 
            'gimel': 'Gimel',
            'dalet': 'Dalet',
            'hey': 'Hey',
            'vav': 'Vav',
            'zayin': 'Zayin',
            'het': 'Chet',
            'tet': 'Tet',
            'yud': 'Yud',
            'kaf': 'Kaf',
            'lamed': 'Lamed',
            'mem': 'Mem',
            'nun': 'Nun',
            'samech': 'Samech',
            'ayin': 'Ayin',
            'pey': 'Pey',
            'tzadi': 'Tzadi',
            'kuf': 'Kuf',
            'resh': 'Resh',
            'shin': 'Shin',
            'tav': 'Tav'
          };

          const englishName = letterNames[letterName] || letter.name;
          const englishUtter = new SpeechSynthesisUtterance(englishName);
          englishUtter.lang = "en-US";
          englishUtter.rate = 0.8;
          englishUtter.volume = 1.0;
          englishUtter.pitch = 1.0;

          const englishPromise = new Promise<boolean>((resolve) => {
            let resolved = false;
            
            englishUtter.onend = () => {
              if (!resolved) {
                resolved = true;
                console.log('English speech succeeded');
                resolve(true);
              }
            };
            
            englishUtter.onerror = (event) => {
              if (!resolved) {
                resolved = true;
                console.log('English speech failed:', event.error);
                resolve(false);
              }
            };
            
            setTimeout(() => {
              if (!resolved) {
                resolved = true;
                window.speechSynthesis.cancel();
                resolve(false);
              }
            }, 2000);
          });

          window.speechSynthesis.speak(englishUtter);
          success = await englishPromise;
        } catch (error) {
          console.log('English attempt failed:', error);
        }
      }

      // אם שום דיבור לא עבד - פשוט נגמור בשקט
      if (!success) {
        console.log('No speech available - silent mode');
      }
      
      setIsSpeeching(false);
      
    } catch (error) {
      console.log('Speech failed completely:', error);
      setIsSpeeching(false);
    }
  };

  // השמעת צליל אות - משופרת עם מנגינה נעימה
  const playLetterSound = async (letterSounds: number[]): Promise<void> => {
    if (!audioContext) return;
    
    try {
      // הפעלת AudioContext אם נדרש
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // יצירת צליל מנגינה יפה
      letterSounds.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        // צליל חם ונעים
        osc.type = "triangle";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        // עיצוב הצליל בצורה מוזיקלית
        const startTime = audioContext.currentTime + i * 0.25;
        const duration = 0.4;
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      });
      
      console.log('Playing musical sound for letter');
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
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
    
    // לא נגן צליל כשלוחץ על אות - רק דיבור אם זמין
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
    // התחלה עם 6 אותיות ראשונות, הוספת 2 אותיות כל 3 רמות
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