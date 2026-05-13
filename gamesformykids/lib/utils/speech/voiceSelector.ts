import { AUDIO_CONSTANTS } from "../../constants/core";

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

// מצב גלובלי פשוט
export let isSpeaking = false;
export let speechEnabled = false;

// setter — used by speaker.ts to update isSpeaking
export function setIsSpeaking(value: boolean): void {
  isSpeaking = value;
}

// אתחול Speech API
export function initializeSpeech(): void {
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

// פונקציה להקטנת השהייה בהשמעת דיבור
export function getOptimizedSpeechSettings(options: SpeechOptions = {}) {
  // נסה לטעון הגדרות מושמרות
  let savedSettings = null;
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('games-audio-settings');
      if (saved) {
        savedSettings = JSON.parse(saved);
      }
    } catch {
      // אם יש שגיאה, השתמש בהגדרות ברירת מחדל
    }
  }

  return {
    lang: options.lang || "he-IL",
    rate: options.rate || savedSettings?.speechRate || AUDIO_CONSTANTS.SPEECH.HEBREW_RATE,
    pitch: options.pitch || savedSettings?.speechPitch || AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH,
    volume: options.volume || savedSettings?.volume || AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME,
  };
}
