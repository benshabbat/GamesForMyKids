'use client';
import { create } from 'zustand';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { RACER_QUESTIONS, TOTAL_CHECKPOINTS, type RacerQuestion } from './hebrewRacerData';

const MAX_LIVES = 3;

type Phase = 'idle' | 'racing' | 'question' | 'jumping' | 'crashing' | 'result';

interface HebrewRacerState {
  phase: Phase;
  lives: number;
  checkpoint: number;
  score: number;
  won: boolean;
  currentQuestion: RacerQuestion | null;
  usedQuestionIds: number[];
  feedback: 'correct' | 'wrong' | null;
}

interface HebrewRacerActions {
  startGame: () => void;
  triggerQuestion: () => void;
  answerQuestion: (choice: string) => void;
  resumeRacing: () => void;
  reset: () => void;
}

function pickQuestion(usedIds: number[]): RacerQuestion {
  const available = RACER_QUESTIONS.filter(q => !usedIds.includes(q.id));
  const pool = available.length > 0 ? available : RACER_QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)] ?? RACER_QUESTIONS[0]!;
}

export const useHebrewRacerStore = create<HebrewRacerState & HebrewRacerActions>((set, get) => ({
  phase: 'idle',
  lives: MAX_LIVES,
  checkpoint: 0,
  score: 0,
  won: false,
  currentQuestion: null,
  usedQuestionIds: [],
  feedback: null,

  startGame: () => set({
    phase: 'racing',
    lives: MAX_LIVES,
    checkpoint: 0,
    score: 0,
    won: false,
    currentQuestion: null,
    usedQuestionIds: [],
    feedback: null,
  }),

  triggerQuestion: () => {
    const { usedQuestionIds } = get();
    const q = pickQuestion(usedQuestionIds);
    void speakHebrew(q.question);
    set({
      phase: 'question',
      currentQuestion: q,
      usedQuestionIds: [...usedQuestionIds, q.id],
    });
  },

  answerQuestion: (choice: string) => {
    const { currentQuestion, lives, checkpoint, score } = get();
    if (!currentQuestion) return;

    const isCorrect = choice === currentQuestion.answer;
    const newCheckpoint = isCorrect ? checkpoint + 1 : checkpoint;
    const newLives = isCorrect ? lives : lives - 1;
    const newScore = isCorrect ? score + 10 : score;
    const won = newCheckpoint >= TOTAL_CHECKPOINTS;
    const lost = newLives <= 0;

    void speakHebrew(isCorrect ? 'כל הכבוד!' : 'אוי, לא נכון');

    const newPhase: Phase = (won || lost) ? 'result' : (isCorrect ? 'jumping' : 'crashing');

    set({
      phase: newPhase,
      checkpoint: newCheckpoint,
      lives: newLives,
      score: newScore,
      won,
      feedback: isCorrect ? 'correct' : 'wrong',
    });
  },

  resumeRacing: () => {
    const { lives, checkpoint } = get();
    if (lives <= 0 || checkpoint >= TOTAL_CHECKPOINTS) {
      set({ phase: 'result' });
      return;
    }
    set({ phase: 'racing', feedback: null, currentQuestion: null });
  },

  reset: () => set({
    phase: 'idle',
    lives: MAX_LIVES,
    checkpoint: 0,
    score: 0,
    won: false,
    currentQuestion: null,
    usedQuestionIds: [],
    feedback: null,
  }),
}));
