// Hebrew Letters Context - Utility Functions
import { STEP_MESSAGES, ENCOURAGEMENT_MESSAGES, PRACTICE_STEPS } from '@/lib/constants/hebrewLettersConstants';

/**
 * Get a step-specific message based on current state
 */
export const createGetStepMessage = (
  practiceState: { completedSteps: Set<number>; practiceMode: 'tracing' | 'freewriting' | 'guided' }
) => (stepIndex: number) => {
  const baseMessage = STEP_MESSAGES[stepIndex as keyof typeof STEP_MESSAGES] || "כל הכבוד!";
  const isStepCompleted = practiceState.completedSteps.has(stepIndex);
  
  if (isStepCompleted) {
    return `✅ ${baseMessage} השלב הושלם!`;
  }
  
  // הודעה מותאמת לפי מצב התרגול
  if (practiceState.practiceMode === 'tracing') {
    return `${baseMessage} עקוב אחר הקווים בעדינות`;
  } else if (practiceState.practiceMode === 'freewriting') {
    return `${baseMessage} כתוב את האות בחופשיות`;
  }
  
  return baseMessage;
};

/**
 * Generate a completion message for a letter
 */
export const createGetCompletionMessage = (
  currentLetter: { letter?: string } | null,
  practiceState: { completedSteps: Set<number> }
) => (letterName: string) => {
  const letterDisplayName = currentLetter?.letter || letterName;
  const stepsCompleted = practiceState.completedSteps.size;
  const randomMessage = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
  
  return stepsCompleted > 1 ? 
    `${randomMessage} סיימת ${stepsCompleted} שלבים של האות ${letterDisplayName}!` :
    `${randomMessage} סיימת את השלב של האות ${letterDisplayName}!`;
};

/**
 * Get instructions for current step
 */
export const createGetCurrentInstructions = (
  currentLetter: { letter?: string; pronunciation?: string } | null,
  practiceState: { currentStep: number }
) => () => {
  if (!currentLetter) return ['בחר אות לתרגול'];
  
  const stepIndex = practiceState.currentStep;
  switch (stepIndex) {
    case 0:
      return [
        `התבונני באות ${currentLetter.letter} הגדולה למעלה`,
        `האות ${currentLetter.letter} נקראת "${currentLetter.pronunciation}"`,
        `למד על צורת האות ואיך היא נכתבת`
      ];
    case 1:
      return [
        `עקבי באצבע על האותיות המנוקדות`,
        `התחילי מהנקודה העליונה של האות`,
        `עקבי לאט ובזהירות על הקווים`,
        `או תרגלי כתיבה על הקנבס עם המדריך`
      ];
    case 2:
      return [
        `עכשיו תרגלי לכתוב את האות ${currentLetter.letter} בעצמך בחופשיות`,
        `בלי מדריך - תהיי יצירתית!`,
        `השתמשי בעכבר או במגע על המסך`,
        `זכרי לכתוב מימין לשמאל`,
        `נסי צבעים וגדלים שונים`
      ];
    default:
      return [`תרגלי את האות ${currentLetter.letter}`];
  }
};

/**
 * Calculate overall progress percentage
 */
export const createGetOverallProgress = (
  practiceState: { completedSteps: Set<number> }
) => () => {
  return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
};

/**
 * UI Helper functions
 */
export const createGetStepTabStyle = (
  practiceState: { currentStep: number; completedSteps: Set<number> }
) => (stepIndex: number) => {
  const isCurrentStep = stepIndex === practiceState.currentStep;
  const isCompleted = practiceState.completedSteps.has(stepIndex);
  
  if (isCurrentStep) {
    return 'bg-green-500 text-white shadow-lg';
  } else if (isCompleted) {
    return 'bg-green-200 text-green-800 hover:bg-green-300';
  } else {
    return 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300';
  }
};

export const createGetStepTabIcon = (
  practiceState: { completedSteps: Set<number> }
) => (stepIndex: number) => {
  return practiceState.completedSteps.has(stepIndex) ? '✓' : '';
};
