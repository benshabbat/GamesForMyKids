// Barrel — re-exports all speech utilities.
// Import from here or from '@/lib/utils/speech' (index.ts).
export type { SpeechOptions } from "./voiceSelector";
export {
  isSpeaking,
  speechEnabled,
  initializeSpeech,
  findHebrewVoice,
  getOptimizedSpeechSettings,
} from "./voiceSelector";
export {
  speak,
  speakHebrew,
  speakEnglish,
  testSpeech,
  cancelSpeech,
  isSpeechEnabled,
  isCurrentlySpeaking,
  initSpeechAndAudio,
  useSpeech,
} from "./speaker";