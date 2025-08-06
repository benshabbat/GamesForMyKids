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

// Animation durations
export const ENCOURAGEMENT_DURATION = 3000; // 3 seconds
