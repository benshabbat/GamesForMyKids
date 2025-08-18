export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

// מצב גלובלי פשוט
let isSpeaking = false;
let speechEnabled = false;

// אתחול Speech API
function initializeSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    speechEnabled = true;

    // טען קולות אם הם לא נטענו עדיין
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }
}

// קריאה ראשונית רק אם אנחנו בצד הלקוח
if (typeof window !== "undefined") {
  initializeSpeech();
}

// מציאת קול עברי (מהקוד הקיים ב-shapes)
export function findHebrewVoice(voices?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (!speechEnabled || typeof window === "undefined") return undefined;

  const availableVoices = voices || window.speechSynthesis.getVoices();

  // חפש קול עברי נשי מועדף
  return (
    availableVoices.find(
      (voice) =>
        (voice.lang.includes("he") ||
          voice.lang.includes("iw") ||
          voice.name.toLowerCase().includes("hebrew")) &&
        (voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("woman") ||
          voice.name.toLowerCase().includes("carmit") ||
          voice.name.toLowerCase().includes("dana") ||
          !voice.name.toLowerCase().includes("male"))
    ) ||
    availableVoices.find(
      (voice) =>
        voice.lang.includes("he") ||
        voice.lang.includes("iw") ||
        voice.name.toLowerCase().includes("hebrew")
    )
  );
}

// פונקציית דיבור משותפת (משופרת)
export async function speak(
  text: string,
  options: SpeechOptions = {}
): Promise<boolean> {
  // בדיקת זמינות ה-API
  if (!speechEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }
  
  // אם כבר מדבר, אל תתחיל דיבור נוסף
  if (isSpeaking) {
    return false;
  }

  // הגדרות ברירת מחדל
  const { 
    lang = "he-IL", 
    rate = 0.7, 
    pitch = 1.2, 
    volume = 1.0 
  } = options;

  try {
    // סמן שמדבר
    isSpeaking = true;

    // עצור כל דיבור קודם
    window.speechSynthesis.cancel();
    
    // השהייה קצרה כדי לוודא שהדיבור הקודם באמת נעצר
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // בדיקה נוספת - אם עדיין יש דיבור פעיל, חכה עוד קצת
    if (window.speechSynthesis.speaking) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // יצירת אובייקט דיבור חדש
    const utterance = new SpeechSynthesisUtterance(text);

    // הגדר את המאפיינים
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // השתמש בקול עברי עבור טקסט בעברית
    if (lang.includes("he")) {
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoice = findHebrewVoice(voices);
      if (hebrewVoice) {
        utterance.voice = hebrewVoice;
      }
    }

    // החזר Promise שיושלם כאשר הדיבור יסתיים
    return new Promise<boolean>((resolve) => {
      let resolved = false;

      // פונקציית עזר לסיום הדיבור
      const finishSpeaking = (success: boolean) => {
        if (!resolved) {
          resolved = true;
          isSpeaking = false;
          resolve(success);
        }
      };

      // טיפול באירועים
      utterance.onend = () => {
        finishSpeaking(true);
      };
      
      utterance.onerror = () => {
        finishSpeaking(false);
      };
      
      utterance.onstart = () => {
        console.log("Speech started");
      };

      // הגבלת זמן מקסימלי למניעת "תקיעה" - זמן ארוך יותר לתיאורים ארוכים
      const timeout = Math.max(8000, text.length * 100); // לפחות 8 שניות או 100ms לכל תו
      setTimeout(() => {
        if (!resolved) {
          console.log("Speech timeout, cancelling");
          window.speechSynthesis.cancel();
          finishSpeaking(false);
        }
      }, timeout);

      // התחל את הדיבור
      window.speechSynthesis.speak(utterance);
    });
  } catch (error) {
    // טיפול בשגיאות בלתי צפויות
    console.error("Speech failed with error:", error);
    isSpeaking = false;
    return false;
  }
}

// פונקציות ספציפיות לעברית ואנגלית
export async function speakHebrew(text: string): Promise<boolean> {
  return speak(text, {
    lang: "he-IL",
    rate: 0.6, // קצב איטי יותר לבהירות טובה יותר
    pitch: 1.2,
    volume: 1.0,
  });
}

export async function speakEnglish(text: string): Promise<boolean> {
  return speak(text, {
    lang: "en-US",
    rate: 0.8,
    pitch: 1.1,
    volume: 1.0,
  });
}

// פונקציה לבדיקת שמע
export async function testSpeech(): Promise<boolean> {
  return speakHebrew("בדיקה");
}

// עצירת דיבור
export function cancelSpeech(): void {
  if (
    speechEnabled &&
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    console.log("Cancelling speech");
    window.speechSynthesis.cancel();
    isSpeaking = false;
    
    // השהייה קצרה כדי לוודא שהביטול הושלם
    setTimeout(() => {
      if (window.speechSynthesis.speaking) {
        console.log("Speech still active after cancel, forcing stop");
        window.speechSynthesis.cancel();
      }
    }, 100);
  }
}

// בדיקת זמינות דיבור
export function isSpeechEnabled(): boolean {
  return speechEnabled;
}

// בדיקה אם כרגע מדבר
export function isCurrentlySpeaking(): boolean {
  return isSpeaking;
}

// אתחול שמע ואודיו (מהקוד הקיים)
export function initSpeechAndAudio(
  setSpeechEnabled: (enabled: boolean) => void,
  setAudioContext: (ctx: AudioContext | null) => void
) {
  if (typeof window === "undefined") return;

  // אתחול Speech API באמצעות הפונקציה הקיימת
  initializeSpeech();
  
  // עדכון ה-state החיצוני
  if (speechEnabled) {
    setSpeechEnabled(true);
  }

  // אתחול AudioContext
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (AudioContextClass) {
    setAudioContext(new AudioContextClass());
  }
}

// Hook לשימוש ב-React
export function useSpeech() {
  return {
    // פונקציות דיבור בסיסיות
    speak,
    speakHebrew,
    speakEnglish,
    
    // שליטה ובדיקות
    cancel: cancelSpeech,
    testSpeech,
    
    // בדיקות מצב
    isCurrentlySpeaking: isCurrentlySpeaking(),
    isEnabled: isSpeechEnabled(),
    
    // פונקציות עזר
    findHebrewVoice,
    
    // אתחול
    initSpeechAndAudio,
  };
}