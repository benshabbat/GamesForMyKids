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

// קריאה ראשונית
if (typeof window !== "undefined") {
  initializeSpeech();
}

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

export async function speak(
  text: string,
  options: SpeechOptions = {}
): Promise<boolean> {
  if (
    !speechEnabled ||
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    isSpeaking
  ) {
    console.log("Speech not available or already speaking");
    return false;
  }

  const { lang = "he-IL", rate = 0.7, pitch = 1.2, volume = 1.0 } = options;

  try {
    isSpeaking = true;

    // עצור כל הקראה קודמת
    window.speechSynthesis.cancel();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const utterance = new SpeechSynthesisUtterance(text);

    // הגדר את המאפיינים
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // נסה להשתמש בקול עברי
    if (lang.includes("he")) {
      const hebrewVoice = findHebrewVoice();
      if (hebrewVoice) {
        utterance.voice = hebrewVoice;
      }
    }

    return new Promise<boolean>((resolve) => {
      let resolved = false;

      utterance.onend = () => {
        if (!resolved) {
          resolved = true;
          isSpeaking = false;
          resolve(true);
        }
      };

      utterance.onerror = (event) => {
        console.log("Speech error:", event.error);
        if (!resolved) {
          resolved = true;
          isSpeaking = false;
          resolve(false);
        }
      };

      // הגבלת זמן מקסימלי
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          window.speechSynthesis.cancel();
          isSpeaking = false;
          resolve(false);
        }
      }, 4000);

      window.speechSynthesis.speak(utterance);
    });
  } catch (error) {
    console.log("Speech failed:", error);
    isSpeaking = false;
    return false;
  }
}

export async function speakHebrew(text: string): Promise<boolean> {
  return speak(text, {
    lang: "he-IL",
    rate: 0.7,
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

export async function testSpeech(): Promise<boolean> {
  return speakHebrew("בדיקה");
}

export function cancelSpeech(): void {
  if (
    speechEnabled &&
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
}

export function isSpeechEnabled(): boolean {
  return speechEnabled;
}

export function isCurrentlySpeaking(): boolean {
  return isSpeaking;
}

// Hook לשימוש ב-React
export function useSpeech() {
  return {
    speak,
    speakHebrew,
    speakEnglish,
    testSpeech,
    cancel: cancelSpeech,
    isCurrentlySpeaking: isCurrentlySpeaking(),
    isEnabled: isSpeechEnabled(),
  };
}
