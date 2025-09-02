import { AUDIO_CONSTANTS } from '../../../../lib/constants/core';

// Hebrew Letters Game Constants
export const STROKE_COLORS = [
  '#2E7D32', // ירוק
  '#1976D2', // כחול
  '#D32F2F', // אדום
  '#7B1FA2', // סגול
  '#F57C00', // כתום
  '#795548', // חום
  '#424242', // אפור
  '#000000'  // שחור
] as const;

export const STROKE_WIDTHS = [4, 8, 12, 16, 20] as const;

export const PRACTICE_STEPS = [
  'הכרות עם האות',
  'תרגול עקיבה וכתיבה מודרכת',
  'כתיבה חופשית ויצירתית'
] as const;

export const ENCOURAGEMENT_MESSAGES = [
  "כל הכבוד! 🌟",
  "מעולה! 👏", 
  "איזה יופי! 🎉",
  "פנטסטי! ✨",
  "מדהים! 🚀",
  "יש לך זה! 💪",
  "מושלם! 🎯",
  "ברבו! 👑"
] as const;

export const STEP_MESSAGES = {
  0: "התבוננו באות יפה! 👀",
  1: "עכשיו בואו נעקוב עליה! ✏️", 
  2: "זמן לכתוב בעצמנו! 🎨"
} as const;

// Default states
export const DEFAULT_DRAWING_STATE = {
  isDrawing: false,
  paths: [] as ImageData[],
  currentStrokeWidth: 12,
  currentStrokeColor: '#2E7D32',
  showLetterGuide: true,
  canvasWidth: 800,
  canvasHeight: 400,
  backgroundColor: '#ffffff',
  lastDrawPosition: null as { x: number; y: number } | null,
};

export const DEFAULT_PRACTICE_STATE = {
  currentStep: 0,
  completedSteps: new Set<number>(),
  practiceMode: 'guided' as const,
};

export const DEFAULT_ENCOURAGEMENT_STATE = {
  showEncouragement: false,
  currentMessage: '',
  isStepCompleted: false,
};

export const DEFAULT_AUDIO_STATE = {
  isAudioEnabled: true,
  volume: AUDIO_CONSTANTS.SPEECH.DEFAULT_VOLUME * 0.7, // מעט יותר שקט
  speechRate: AUDIO_CONSTANTS.SPEECH.HEBREW_RATE * 1.3, // קצת יותר מהיר למשחק האותיות
  speechPitch: AUDIO_CONSTANTS.SPEECH.DEFAULT_PITCH,
} as const;

export const DEFAULT_LEARNING_STATS = {
  totalPracticeTime: 0,
  lettersStarted: new Set<string>(),
  lettersCompleted: new Set<string>(),
  totalStrokes: 0,
  sessionStartTime: 0,
  practiceHistory: [],
} as const;

// Animation durations
export const ENCOURAGEMENT_DURATION = 3000; // 3 seconds
