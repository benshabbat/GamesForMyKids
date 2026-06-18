'use client';
import { create } from 'zustand';
import { DEFAULT_SELECTIONS, type AvatarArea } from '@/lib/constants/avatarParts';

interface AvatarMakerState {
  selections: Record<AvatarArea, string>;
  selectPart: (area: AvatarArea, partId: string) => void;
  reset: () => void;
}

export const useAvatarMakerStore = create<AvatarMakerState>((set) => ({
  selections: { ...DEFAULT_SELECTIONS },
  selectPart: (area, partId) => set(s => ({ selections: { ...s.selections, [area]: partId } })),
  reset: () => set({ selections: { ...DEFAULT_SELECTIONS } }),
}));
