import { AUDIO_CONSTANTS } from "../../constants/core";
import {
  type SpeechOptions,
  isSpeaking,
  speechEnabled,
  userMuted,
  setIsSpeaking,
  findHebrewVoice,
  getOptimizedSpeechSettings,
  initializeSpeech,
} from "./voiceSelector";

// פונקציית דיבור משותפת (משופרת)
export async function speak(
  text: string,
  options: SpeechOptions = {}
): Promise<boolean> {
  // בדיקת זמינות ה-API
  if (!speechEnabled || userMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }

  // אם כבר מדבר, אל תתחיל דיבור נוסף
  if (isSpeaking) {
    return false;
  }

  // השתמש בהגדרות מותאמות
  const { lang, rate, pitch, volume } = getOptimizedSpeechSettings(options);

  try {
    // סמן שמדבר
    setIsSpeaking(true);

    // עצור כל דיבור קודם
    window.speechSynthesis.cancel();

    // השהייה מינימלית - מקבועים מרכזיים
    await new Promise((resolve) => setTimeout(resolve, AUDIO_CONSTANTS.SPEECH.CANCEL_DELAY));

    // בדיקה נוספת - מקבועים מרכזיים
    if (window.speechSynthesis.speaking) {
      await new Promise((resolve) => setTimeout(resolve, AUDIO_CONSTANTS.SPEECH.VERIFICATION_DELAY));
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
          setIsSpeaking(false);
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
        // Speech started
      };

      // הגבלת זמן מקסימלי למניעת "תקיעה" - זמן ארוך יותר לתיאורים ארוכים
      const timeout = Math.max(8000, text.length * 100); // לפחות 8 שניות או 100ms לכל תו
      setTimeout(() => {
        if (!resolved) {
          // Speech timeout, cancelling
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
    setIsSpeaking(false);
    return false;
  }
}

// פונקציות ספציפיות לעברית ואנגלית
export async function speakHebrew(text: string): Promise<boolean> {
  return speak(text, {
    lang: "he-IL",
    rate: AUDIO_CONSTANTS.SPEECH.HEBREW_RATE,
    pitch: AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH,
    volume: AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME,
  });
}

export async function speakEnglish(text: string): Promise<boolean> {
  return speak(text, {
    lang: "en-US",
    rate: AUDIO_CONSTANTS.SPEECH.ENGLISH_RATE,
    pitch: AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH,
    volume: AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME,
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
    // Cancelling speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    // השהייה קצרה כדי לוודא שהביטול הושלם
    setTimeout(() => {
      if (window.speechSynthesis.speaking) {
        // Speech still active after cancel, forcing stop
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
