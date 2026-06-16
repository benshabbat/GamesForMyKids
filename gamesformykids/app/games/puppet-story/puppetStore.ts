'use client';
import { create } from 'zustand';
import {
  CHARACTERS, SETTINGS, STORY_TEMPLATES,
  type Character, type Setting, type StoryTemplate,
} from './data/storyTemplates';

type Phase = 'picking' | 'story' | 'quiz' | 'result';

interface State {
  phase: Phase;
  pickStep: 0 | 1 | 2; // 0=char1, 1=char2, 2=setting
  char1: Character | null;
  char2: Character | null;
  setting: Setting | null;
  template: StoryTemplate | null;
  panelIndex: number;
  questionIndex: number;
  correctAnswers: number;
}

interface Actions {
  pickChar1: (c: Character) => void;
  pickChar2: (c: Character) => void;
  pickSetting: (s: Setting) => void;
  nextPanel: () => void;
  answerQuestion: (index: number) => void;
  restart: () => void;
}

const INITIAL: State = {
  phase: 'picking', pickStep: 0,
  char1: null, char2: null, setting: null, template: null,
  panelIndex: 0, questionIndex: 0, correctAnswers: 0,
};

function pickTemplate(): StoryTemplate {
  const t = STORY_TEMPLATES[Math.floor(Math.random() * STORY_TEMPLATES.length)];
  return t ?? STORY_TEMPLATES[0]!;
}

export const usePuppetStore = create<State & Actions>((set) => ({
  ...INITIAL,

  pickChar1: (c) => set({ char1: c, pickStep: 1 }),

  pickChar2: (c) => set({ char2: c, pickStep: 2 }),

  pickSetting: (s) => set({ setting: s, template: pickTemplate(), phase: 'story', panelIndex: 0 }),

  nextPanel: () => set((state) => {
    if (!state.template) return state;
    const next = state.panelIndex + 1;
    if (next >= state.template.panels.length) {
      return { ...state, phase: 'quiz', questionIndex: 0, correctAnswers: 0 };
    }
    return { ...state, panelIndex: next };
  }),

  answerQuestion: (index) => set((state) => {
    if (!state.template) return state;
    const q = state.template.questions[state.questionIndex];
    const correct = q?.correctIndex === index ? 1 : 0;
    const nextQ = state.questionIndex + 1;
    if (nextQ >= state.template.questions.length) {
      return { ...state, correctAnswers: state.correctAnswers + correct, phase: 'result' };
    }
    return { ...state, correctAnswers: state.correctAnswers + correct, questionIndex: nextQ };
  }),

  restart: () => set(INITIAL),
}));

export { CHARACTERS, SETTINGS };
