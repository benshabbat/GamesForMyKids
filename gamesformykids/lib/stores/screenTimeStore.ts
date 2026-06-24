'use client';

import { makePersistStore } from './createStore';

const MIDNIGHT_RESETS = true;

function todayStart(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

interface ScreenTimeState {
  /** null = no limit */
  timeLimitMinutes: number | null;
  /** timestamp when the current session started (resets at midnight) */
  sessionStartMs: number | null;
  /** whether the user has already used "5 more minutes" this session */
  extended: boolean;
}

interface ScreenTimeActions {
  setTimeLimit: (minutes: number | null) => void;
  ensureSessionStart: () => void;
  extend5Minutes: () => void;
  resetSession: () => void;
}

export const useScreenTimeStore = makePersistStore<ScreenTimeState & ScreenTimeActions>(
  'ScreenTimeStore',
  'gfk-screen-time',
  (set, get) => ({
    timeLimitMinutes: null,
    sessionStartMs: null,
    extended: false,

    setTimeLimit: (minutes) => set({ timeLimitMinutes: minutes }, false, 'screenTime/setLimit'),

    ensureSessionStart: () => {
      const { sessionStartMs } = get();
      const now = Date.now();
      if (!sessionStartMs) {
        set({ sessionStartMs: now, extended: false }, false, 'screenTime/startSession');
        return;
      }
      // Reset at midnight
      if (MIDNIGHT_RESETS && sessionStartMs < todayStart()) {
        set({ sessionStartMs: now, extended: false }, false, 'screenTime/midnightReset');
      }
    },

    extend5Minutes: () => set({ extended: true }, false, 'screenTime/extend'),

    resetSession: () => set({ sessionStartMs: Date.now(), extended: false }, false, 'screenTime/reset'),
  }),
  { version: 1 },
);
