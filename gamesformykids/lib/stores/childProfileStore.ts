'use client';
import { makePersistStore } from './createStore';

export interface ChildProfile {
  id: string;
  name: string;
  emoji: string;
}

interface ChildProfileState {
  profiles: ChildProfile[];
  activeProfileId: string | null;
}

interface ChildProfileActions {
  addProfile: (name: string, emoji: string) => void;
  removeProfile: (id: string) => void;
  updateProfile: (id: string, changes: Partial<Omit<ChildProfile, 'id'>>) => void;
  switchProfile: (id: string | null) => void;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const useChildProfileStore = makePersistStore<ChildProfileState & ChildProfileActions>(
  'ChildProfileStore',
  'gfk-child-profiles',
  (set) => ({
    profiles: [],
    activeProfileId: null,

    addProfile: (name, emoji) =>
      set(
        (s) => ({ profiles: [...s.profiles, { id: generateId(), name, emoji }] }),
        false,
        'childProfile/add',
      ),

    removeProfile: (id) =>
      set(
        (s) => ({
          profiles: s.profiles.filter((p) => p.id !== id),
          activeProfileId: s.activeProfileId === id ? null : s.activeProfileId,
        }),
        false,
        'childProfile/remove',
      ),

    updateProfile: (id, changes) =>
      set(
        (s) => ({
          profiles: s.profiles.map((p) => (p.id === id ? { ...p, ...changes } : p)),
        }),
        false,
        'childProfile/update',
      ),

    switchProfile: (id) =>
      set({ activeProfileId: id }, false, 'childProfile/switch'),
  }),
  { version: 1 },
);
