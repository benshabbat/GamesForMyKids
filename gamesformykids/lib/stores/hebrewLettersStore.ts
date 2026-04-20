/**
 * ===============================================
 * Hebrew Letters Store — Zustand
 * ===============================================
 * מנהל את כל מצב משחק האותיות העבריות:
 * - האות הנוכחית + אותיות שהושלמו
 * - מצב אודיו
 * - מצב ציור (drawingState)
 * - מצב תרגול (practiceState)
 * - מצב עידוד (encouragementState)
 * - סטטיסטיקות למידה (learningStats)
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import {
  DrawingState,
  PracticeState,
  EncouragementState,
  LearningStats,
} from '@/app/games/hebrew-letters/types/hebrew-letters';
import {
  PRACTICE_STEPS,
  DEFAULT_DRAWING_STATE,
  DEFAULT_PRACTICE_STATE,
  DEFAULT_ENCOURAGEMENT_STATE,
  DEFAULT_AUDIO_STATE,
  ENCOURAGEMENT_MESSAGES,
  STEP_MESSAGES,
} from '@/app/games/hebrew-letters/constants/hebrewLettersConstants';

// ── Module-level refs ──────────────────────────────────────
let encouragementTimerRef: ReturnType<typeof setTimeout> | null = null;

// ── State ──────────────────────────────────────────────────
export interface HebrewLettersState {
  currentLetter: HebrewLetter | null;
  completedLetters: Set<string>;
  isAudioEnabled: boolean;
  drawingState: DrawingState;
  practiceState: PracticeState;
  encouragementState: EncouragementState;
  learningStats: LearningStats;
}

// ── Actions ────────────────────────────────────────────────
export interface HebrewLettersStoreActions {
  // Letter management
  setCurrentLetter: (letter: HebrewLetter | null) => void;
  addCompletedLetter: (letterName: string) => void;
  resetCompletedLetters: () => void;

  // Audio
  setIsAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
  speakText: (text: string, settings?: { rate?: number; pitch?: number; volume?: number; lang?: string }) => void;
  playLetterSound: (letter?: string) => void;
  playEncouragementSound: () => void;
  playStepCompletionSound: () => void;

  // Drawing
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  clearCanvas: () => void;
  saveCanvasState: (imageData: ImageData) => void;
  undoLastAction: () => void;
  initializeCanvas: (width: number, height: number, backgroundColor?: string) => void;
  startDrawing: (x: number, y: number) => void;
  continueDrawing: (x: number, y: number) => void;
  stopDrawing: () => void;
  resetCanvas: () => void;
  updateStrokeColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;

  // Practice
  selectLetter: (letter: HebrewLetter) => void;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (stepIndex: number) => void;
  completeCurrentStep: () => void;
  completeLetter: () => void;
  resetPracticeProgress: () => void;

  // Encouragement
  showEncouragement: (message?: string, duration?: number) => void;
  hideEncouragement: () => void;

  // Session / stats
  startPracticeSession: (letterName: string) => void;
  endPracticeSession: () => void;
  resetAllStats: () => void;
}

const INITIAL_LEARNING_STATS: LearningStats = {
  totalPracticeTime: 0,
  lettersStarted: new Set<string>(),
  lettersCompleted: new Set<string>(),
  totalStrokes: 0,
  sessionStartTime: 0,
  practiceHistory: [],
};

// ── Store ──────────────────────────────────────────────────
export const useHebrewLettersStore = create<HebrewLettersState & HebrewLettersStoreActions>()(
  devtools(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────
      currentLetter: null,
      completedLetters: new Set<string>(),
      isAudioEnabled: true,
      drawingState: { ...DEFAULT_DRAWING_STATE },
      practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() },
      encouragementState: { ...DEFAULT_ENCOURAGEMENT_STATE },
      learningStats: { ...INITIAL_LEARNING_STATS },

      // ── Letter management ──────────────────────────────
      setCurrentLetter: (letter) =>
        set({ currentLetter: letter }, false, 'hebrewLetters/setCurrentLetter'),

      addCompletedLetter: (letterName) =>
        set(
          (s) => ({ completedLetters: new Set([...s.completedLetters, letterName]) }),
          false,
          'hebrewLetters/addCompletedLetter',
        ),

      resetCompletedLetters: () =>
        set({ completedLetters: new Set<string>() }, false, 'hebrewLetters/resetCompleted'),

      // ── Audio ──────────────────────────────────────────
      setIsAudioEnabled: (enabled) =>
        set({ isAudioEnabled: enabled }, false, 'hebrewLetters/setAudio'),

      toggleAudio: () =>
        set((s) => ({ isAudioEnabled: !s.isAudioEnabled }), false, 'hebrewLetters/toggleAudio'),

      speakText: (text, settings) => {
        const { isAudioEnabled } = get();
        if (!isAudioEnabled || !('speechSynthesis' in window)) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = settings?.lang ?? 'he-IL';
        utterance.rate = settings?.rate ?? DEFAULT_AUDIO_STATE.speechRate;
        utterance.pitch = settings?.pitch ?? DEFAULT_AUDIO_STATE.speechPitch;
        utterance.volume = settings?.volume ?? DEFAULT_AUDIO_STATE.volume;
        speechSynthesis.speak(utterance);
      },

      playLetterSound: (letter) => {
        const { isAudioEnabled, currentLetter, speakText } = get();
        if (!isAudioEnabled) return;
        const letterToSpeak = letter ?? currentLetter?.letter ?? '';
        const pronunciation = currentLetter?.pronunciation ?? letter ?? '';
        speakText(`האות ${letterToSpeak}, ${pronunciation}`);
      },

      playEncouragementSound: () => {
        const { isAudioEnabled, speakText } = get();
        if (!isAudioEnabled) return;
        const msg = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
        speakText(msg);
      },

      playStepCompletionSound: () => {
        const { isAudioEnabled, practiceState, speakText } = get();
        if (!isAudioEnabled) return;
        const msg = STEP_MESSAGES[practiceState.currentStep as keyof typeof STEP_MESSAGES];
        if (msg) speakText(msg);
      },

      // ── Drawing ────────────────────────────────────────
      updateDrawingState: (updates) =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, ...updates } }),
          false,
          'hebrewLetters/updateDrawing',
        ),

      clearCanvas: () =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, paths: [], isDrawing: false } }),
          false,
          'hebrewLetters/clearCanvas',
        ),

      saveCanvasState: (imageData) =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, paths: [...s.drawingState.paths, imageData] } }),
          false,
          'hebrewLetters/saveCanvas',
        ),

      undoLastAction: () =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, paths: s.drawingState.paths.slice(0, -1) } }),
          false,
          'hebrewLetters/undo',
        ),

      initializeCanvas: (width, height, backgroundColor = '#ffffff') =>
        set(
          (s) => ({
            drawingState: {
              ...s.drawingState,
              canvasWidth: width,
              canvasHeight: height,
              backgroundColor,
              paths: [],
              isDrawing: false,
              lastDrawPosition: null,
            },
          }),
          false,
          'hebrewLetters/initCanvas',
        ),

      startDrawing: (x, y) =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, isDrawing: true, lastDrawPosition: { x, y } } }),
          false,
          'hebrewLetters/startDrawing',
        ),

      continueDrawing: (x, y) => {
        // Read live state to avoid stale closure
        if (!get().drawingState.isDrawing) return;
        set(
          (s) => ({ drawingState: { ...s.drawingState, lastDrawPosition: { x, y } } }),
          false,
          'hebrewLetters/continueDrawing',
        );
      },

      stopDrawing: () =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, isDrawing: false, lastDrawPosition: null } }),
          false,
          'hebrewLetters/stopDrawing',
        ),

      resetCanvas: () =>
        set(
          { drawingState: { ...DEFAULT_DRAWING_STATE } },
          false,
          'hebrewLetters/resetCanvas',
        ),

      updateStrokeColor: (color) =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, currentStrokeColor: color } }),
          false,
          'hebrewLetters/strokeColor',
        ),

      updateStrokeWidth: (width) =>
        set(
          (s) => ({ drawingState: { ...s.drawingState, currentStrokeWidth: width } }),
          false,
          'hebrewLetters/strokeWidth',
        ),

      // ── Practice ───────────────────────────────────────
      selectLetter: (letter) =>
        set(
          (s) => ({
            currentLetter: letter,
            practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() },
            encouragementState: { ...DEFAULT_ENCOURAGEMENT_STATE },
            learningStats: {
              ...s.learningStats,
              lettersStarted: new Set([...s.learningStats.lettersStarted, letter.letter]),
              sessionStartTime: Date.now(),
            },
          }),
          false,
          'hebrewLetters/selectLetter',
        ),

      nextStep: () =>
        set(
          (s) => {
            const next = Math.min(s.practiceState.currentStep + 1, PRACTICE_STEPS.length - 1);
            return {
              practiceState: {
                ...s.practiceState,
                currentStep: next,
                completedSteps: new Set([...s.practiceState.completedSteps, s.practiceState.currentStep]),
              },
            };
          },
          false,
          'hebrewLetters/nextStep',
        ),

      previousStep: () =>
        set(
          (s) => ({
            practiceState: {
              ...s.practiceState,
              currentStep: Math.max(s.practiceState.currentStep - 1, 0),
            },
          }),
          false,
          'hebrewLetters/prevStep',
        ),

      jumpToStep: (stepIndex) => {
        if (stepIndex < 0 || stepIndex >= PRACTICE_STEPS.length) return;
        set(
          (s) => ({ practiceState: { ...s.practiceState, currentStep: stepIndex } }),
          false,
          'hebrewLetters/jumpToStep',
        );
      },

      completeCurrentStep: () => {
        const { practiceState, showEncouragement } = get();
        if (practiceState.completedSteps.has(practiceState.currentStep)) return;
        set(
          (s) => ({
            practiceState: {
              ...s.practiceState,
              completedSteps: new Set([...s.practiceState.completedSteps, s.practiceState.currentStep]),
            },
          }),
          false,
          'hebrewLetters/completeStep',
        );
        showEncouragement();
      },

      completeLetter: () => {
        const { currentLetter, learningStats, showEncouragement } = get();
        if (!currentLetter) return;
        const letterName = currentLetter.letter;
        const sessionTime = learningStats.sessionStartTime
          ? Date.now() - learningStats.sessionStartTime
          : 0;
        set(
          (s) => ({
            completedLetters: new Set([...s.completedLetters, letterName]),
            practiceState: { ...s.practiceState, isCompleted: true } as PracticeState,
            learningStats: {
              ...s.learningStats,
              lettersCompleted: new Set([...s.learningStats.lettersCompleted, letterName]),
              totalPracticeTime: s.learningStats.totalPracticeTime + sessionTime,
              sessionStartTime: 0,
              practiceHistory: [
                ...s.learningStats.practiceHistory,
                {
                  letter: letterName,
                  stepCompleted: s.practiceState.completedSteps.size,
                  timeSpent: sessionTime,
                  timestamp: Date.now(),
                },
              ],
            },
          }),
          false,
          'hebrewLetters/completeLetter',
        );
        showEncouragement('כל הכבוד! סיימת את התרגול בהצלחה!', 3000);
      },

      resetPracticeProgress: () =>
        set(
          { practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() } },
          false,
          'hebrewLetters/resetPractice',
        ),

      // ── Encouragement ──────────────────────────────────
      showEncouragement: (message, duration = 2000) => {
        if (encouragementTimerRef) clearTimeout(encouragementTimerRef);
        const msg = message ?? ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
        set(
          { encouragementState: { showEncouragement: true, currentMessage: msg, isStepCompleted: false } },
          false,
          'hebrewLetters/showEncouragement',
        );
        encouragementTimerRef = setTimeout(() => {
          set(
            (s) => ({ encouragementState: { ...s.encouragementState, showEncouragement: false } }),
            false,
            'hebrewLetters/hideEncouragement',
          );
          encouragementTimerRef = null;
        }, duration);
      },

      hideEncouragement: () => {
        if (encouragementTimerRef) { clearTimeout(encouragementTimerRef); encouragementTimerRef = null; }
        set(
          (s) => ({ encouragementState: { ...s.encouragementState, showEncouragement: false } }),
          false,
          'hebrewLetters/hideEncouragement',
        );
      },

      // ── Session / stats ────────────────────────────────
      startPracticeSession: (letterName) =>
        set(
          (s) => ({
            learningStats: {
              ...s.learningStats,
              lettersStarted: new Set([...s.learningStats.lettersStarted, letterName]),
              sessionStartTime: Date.now(),
            },
          }),
          false,
          'hebrewLetters/startSession',
        ),

      endPracticeSession: () =>
        set(
          (s) => ({ learningStats: { ...s.learningStats, sessionStartTime: 0 } }),
          false,
          'hebrewLetters/endSession',
        ),

      resetAllStats: () =>
        set(
          {
            completedLetters: new Set<string>(),
            learningStats: { ...INITIAL_LEARNING_STATS },
          },
          false,
          'hebrewLetters/resetAllStats',
        ),
    }),
    { name: 'hebrewLettersStore' },
  ),
);

// ── Pure utility functions ─────────────────────────────────

export function getStepMessage(practiceState: PracticeState, stepIndex: number): string {
  const baseMessage = STEP_MESSAGES[stepIndex as keyof typeof STEP_MESSAGES] ?? 'כל הכבוד!';
  if (practiceState.completedSteps.has(stepIndex)) return `✅ ${baseMessage} השלב הושלם!`;
  if (practiceState.practiceMode === 'tracing') return `${baseMessage} עקוב אחר הקווים בעדינות`;
  if (practiceState.practiceMode === 'freewriting') return `${baseMessage} כתוב את האות בחופשיות`;
  return baseMessage;
}

export function getCurrentInstructions(
  currentLetter: HebrewLetter | null,
  practiceState: PracticeState,
): string[] {
  if (!currentLetter) return ['בחר אות לתרגול'];
  switch (practiceState.currentStep) {
    case 0:
      return [
        `התבונני באות ${currentLetter.letter} הגדולה למעלה`,
        `האות ${currentLetter.letter} נקראת "${currentLetter.pronunciation}"`,
        `למד על צורת האות ואיך היא נכתבת`,
      ];
    case 1:
      return [
        `עקבי באצבע על האותיות המנוקדות`,
        `התחילי מהנקודה העליונה של האות`,
        `עקבי לאט ובזהירות על הקווים`,
        `או תרגלי כתיבה על הקנבס עם המדריך`,
      ];
    case 2:
      return [
        `עכשיו תרגלי לכתוב את האות ${currentLetter.letter} בעצמך בחופשיות`,
        `בלי מדריך - תהיי יצירתית!`,
        `השתמשי בעכבר או במגע על המסך`,
        `זכרי לכתוב מימין לשמאל`,
        `נסי צבעים וגדלים שונים`,
      ];
    default:
      return [`תרגלי את האות ${currentLetter.letter}`];
  }
}

export function getOverallProgress(practiceState: PracticeState): number {
  return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
}

export function getStepTabStyle(practiceState: PracticeState, stepIndex: number): string {
  if (practiceState.currentStep === stepIndex) return 'bg-purple-500 text-white';
  if (practiceState.completedSteps.has(stepIndex)) return 'bg-green-200 text-green-800 hover:bg-green-300';
  return 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300';
}

export function getStepTabIcon(practiceState: PracticeState, stepIndex: number): string {
  return practiceState.completedSteps.has(stepIndex) ? '✓' : '';
}

export function getLetterProgress(letterName: string): number {
  const { completedLetters, currentLetter, practiceState } = useHebrewLettersStore.getState();
  if (completedLetters.has(letterName)) return 100;
  if (currentLetter?.letter === letterName) {
    return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
  }
  return 0;
}

export function getCanvasPosition(
  event: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  let clientX: number, clientY: number;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    clientX = event.touches[0]?.clientX ?? 0;
    clientY = event.touches[0]?.clientY ?? 0;
  }
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}
