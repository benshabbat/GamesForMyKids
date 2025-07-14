'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Home, Volume2 } from 'lucide-react';

interface Color {
  name: string;
  hebrew: string;
  value: string;
  sound: number[];
}

interface GameState {
  currentChallenge: Color | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
}

export default function ColorGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: null,
    score: 0,
    level: 1,
    isPlaying: false,
    showCelebration: false
  });

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // צבעים עם צלילים תואמים
  const colors: Color[] = [
    { name: 'red', hebrew: 'אדום', value: 'bg-red-500', sound: [440, 550, 660] },
    { name: 'blue', hebrew: 'כחול', value: 'bg-blue-500', sound: [523, 659, 784] },
    { name: 'green', hebrew: 'ירוק', value: 'bg-green-500', sound: [349, 440, 523] },
    { name: 'yellow', hebrew: 'צהוב', value: 'bg-yellow-500', sound: [392, 494, 587] },
    { name: 'purple', hebrew: 'סגול', value: 'bg-purple-500', sound: [294, 370, 440] },
    { name: 'orange', hebrew: 'כתום', value: 'bg-orange-500', sound: [330, 415, 494] }
  ];

  // יצירת AudioContext לצלילים
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioContext(new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)());
    }
  }, []);

  // פונקציה להקראת הצבע בעברית עם Web Speech API
  const speakColorName = (colorName: string): void => {
    console.log('מנסה להקריא:', colorName);
    
    if (typeof window === 'undefined') {
      console.log('אין window object');
      return;
    }
    
    if (!('speechSynthesis' in window)) {
      console.log('Speech API לא נתמך, משתמש בצלילים');
      playColorSound(colorName);
      return;
    }

    try {
      // עצירת דיבור קודם אם יש
      window.speechSynthesis.cancel();
      
      // חכה לטעינת הקולות
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('קולות זמינים:', voices.length);
        
        const utterance = new SpeechSynthesisUtterance(colorName);
        utterance.lang = 'he-IL';
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;
        
        // נסה למצוא קול עברי
        const hebrewVoice = voices.find(voice => 
          voice.lang.includes('he') || 
          voice.lang.includes('iw') ||
          voice.name.includes('Hebrew') ||
          voice.name.includes('עברית')
        );
        
        if (hebrewVoice) {
          utterance.voice = hebrewVoice;
          console.log('מצא קול עברי:', hebrewVoice.name);
        } else {
          console.log('לא מצא קול עברי, משתמש בברירת מחדל');
          // אם אין עברית, נסה עם קול ברירת מחדל
          if (voices.length > 0) {
            utterance.voice = voices[0];
          }
        }
        
        // האזנה לאירועים
        utterance.onstart = () => console.log('התחיל דיבור');
        utterance.onend = () => console.log('סיים דיבור');
        utterance.onerror = (e) => {
          console.log('שגיאה בדיבור:', e);
          playColorSound(colorName); // fallback
        };
        
        console.log('מפעיל דיבור...');
        window.speechSynthesis.speak(utterance);
      };

      // אם הקולות לא נטענו עדיין
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        console.log('ממתין לטעינת קולות...');
        window.speechSynthesis.onvoiceschanged = loadVoices;
        // timeout fallback
        setTimeout(() => {
          if (window.speechSynthesis.getVoices().length === 0) {
            console.log('timeout - עובר לצלילים');
            playColorSound(colorName);
          } else {
            loadVoices();
          }
        }, 1000);
      } else {
        loadVoices();
      }
      
    } catch (error) {
      console.error('שגיאה ב-Speech API:', error);
      playColorSound(colorName);
    }
  };

  // פונקציה לצליל הצבע (fallback)
  const playColorSound = (colorName: string): void => {
    if (!audioContext) return;

    const colorSoundMap: { [key: string]: number[] } = {
      'אדום': [440, 550, 660],
      'כחול': [523, 659, 784], 
      'ירוק': [349, 440, 523],
      'צהוב': [392, 494, 587],
      'סגול': [294, 370, 440],
      'כתום': [330, 415, 494]
    };

    const frequencies = colorSoundMap[colorName];
    if (!frequencies) return;

    frequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.2);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.2);
      gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * 0.2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.15);
      
      osc.start(audioContext.currentTime + index * 0.2);
      osc.stop(audioContext.currentTime + index * 0.2 + 0.15);
    });
  };

  // השמעת צליל צבע כשנלחץ עליו
  const playAnimalSound = (colorSounds: number[]): void => {
    if (!audioContext) return;

    colorSounds.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + index * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.08);
      
      osc.start(audioContext.currentTime + index * 0.1);
      osc.stop(audioContext.currentTime + index * 0.1 + 0.08);
    });
  };

  // השמעת צליל הצלחה
  const playSuccessSound = (): void => {
    if (!audioContext) return;

    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    
    notes.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0, audioContext.currentTime + index * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * 0.15 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.12);
      
      osc.start(audioContext.currentTime + index * 0.15);
      osc.stop(audioContext.currentTime + index * 0.15 + 0.12);
    });
  };

  // בחירת צבע אקראי לאתגר
  const selectRandomColor = (): void => {
    const availableColors = colors.slice(0, Math.min(3 + gameState.level, colors.length));
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    
    setGameState(prev => ({ ...prev, currentChallenge: randomColor }));
    
    // השמעת שם הצבע אחרי זמן יותר ארוך
    setTimeout(() => {
      console.log('מקריא צבע חדש:', randomColor.hebrew);
      speakColorName(randomColor.hebrew);
    }, 1000); // יותר זמן
  };

  // התחלת המשחק
  const startGame = (): void => {
    setGameState({
      currentChallenge: null,
      score: 0,
      level: 1,
      isPlaying: true,
      showCelebration: false
    });
    selectRandomColor();
  };

  // טיפול בלחיצה על צבע
  const handleColorClick = (selectedColor: Color): void => {
    if (!gameState.currentChallenge) return;

    // השמעת צליל הצבע שנלחץ
    playAnimalSound(selectedColor.sound);

    if (selectedColor.name === gameState.currentChallenge.name) {
      // תשובה נכונה!
      playSuccessSound();
      
      const newScore = gameState.score + 10;
      const newLevel = Math.floor(newScore / 50) + 1;
      
      setGameState(prev => ({
        ...prev,
        score: newScore,
        level: newLevel,
        showCelebration: true
      }));

      // חגיגה קצרה ומעבר לאתגר הבא
      setTimeout(() => {
        setGameState(prev => ({ ...prev, showCelebration: false }));
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
      showCelebration: false
    });
  };

  // קביעת כמות הצבעים לפי רמה
  const getAvailableColors = (): Color[] => {
    const count = Math.min(3 + gameState.level, colors.length);
    return colors.slice(0, count);
  };

  if (!gameState.isPlaying) {
    return (
      <div className="min-h-screen p-4" 
           style={{background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)'}}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => window.location.href = '/'}
              className="mb-4 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-bold text-purple-600 hover:bg-purple-50"
            >
              <Home className="inline w-6 h-6 ml-2" />
              ← חזרה לעמוד הראשי
            </button>
            <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
              🎨 משחק צבעים 🎨
            </h1>
            <p className="text-xl md:text-2xl text-purple-600 font-semibold mb-8">
              למד צבעים דרך משחק!
            </p>
          </div>

          {/* הסבר המשחק */}
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">איך משחקים?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              <div className="text-center">
                <div className="text-4xl mb-3">👀</div>
                <p><strong>1. תראה</strong><br/>איזה צבע אני מבקש</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎤</div>
                <p><strong>2. תשמע</strong><br/>את שם הצבע</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">👆</div>
                <p><strong>3. תלחץ</strong><br/>על הצבע הנכון</p>
              </div>
            </div>
          </div>

          {/* כפתור התחלה */}
          <button
            onClick={startGame}
            className="px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-3xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
          >
            בואו נתחיל! 🚀
          </button>

          {/* כפתור בדיקת דיבור */}
          <div className="mb-8">
            <button
              onClick={() => speakColorName('בדיקה')}
              className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              🎤 בדיקת קול
            </button>
            <p className="text-sm text-gray-600 mt-2">לחץ לבדיקה אם אתה שומע &quot;בדיקה&quot;</p>
          </div>

          {/* דוגמת צבעים */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-700 mb-6">הצבעים שנלמד:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className={`w-20 h-20 rounded-full shadow-lg ${color.value} border-4 border-white transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                  onClick={() => speakColorName(color.hebrew)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Volume2 className="w-6 h-6 text-white opacity-70" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4">לחץ על צבע כדי לשמוע את השם שלו!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold text-gray-600 hover:bg-gray-50"
            >
              <Home className="inline w-5 h-5 ml-2" />
              חזרה
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">
                ניקוד: {gameState.score}
              </div>
              <div className="text-lg text-purple-600">
                רמה: {gameState.level}
              </div>
            </div>

            <button
              onClick={resetGame}
              className="px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw className="inline w-5 h-5 ml-2" />
              מחדש
            </button>
          </div>

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                מצא את הצבע:
              </h2>
              <div 
                className="text-4xl md:text-6xl font-bold mb-4 text-purple-800 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => speakColorName(gameState.currentChallenge!.hebrew)}
              >
                {gameState.currentChallenge.hebrew}
                <div className="text-2xl mt-2 text-gray-500">
                  🔊 (לחץ לשמיעה חוזרת)
                </div>
              </div>
              <p className="text-xl text-gray-600">לחץ על הצבע הנכון!</p>
            </div>
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && (
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-8 mb-8 shadow-xl animate-bounce-gentle">
              <h2 className="text-4xl font-bold text-orange-800 mb-2">
                🎉 מעולה! 🎉
              </h2>
              <p className="text-2xl text-orange-700">
                מצאת את הצבע {gameState.currentChallenge?.hebrew}!
              </p>
              <div className="text-3xl mt-4">
                +10 נקודות! ⭐
              </div>
            </div>
          )}
        </div>

        {/* לוח הצבעים */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {getAvailableColors().map((color) => (
            <div
              key={color.name}
              onClick={() => handleColorClick(color)}
              className={`
                aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                ${color.value}
                border-8 border-white
                ${gameState.currentChallenge?.name === color.name ? 'ring-4 ring-yellow-400 ring-offset-4' : ''}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-2xl md:text-4xl font-bold mb-2">
                  {color.hebrew}
                </div>
                <Volume2 className="w-8 h-8 opacity-70" />
              </div>
            </div>
          ))}
        </div>

        {/* רמזים */}
        <div className="text-center mt-8">
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              💡 טיפ: תשמע את שם הצבע כשהאתגר מופיע!
            </h3>
            <p className="text-gray-600">
              לחץ על שם הצבע כדי לשמוע שוב, או על הצבעים למטה לתרגול
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}