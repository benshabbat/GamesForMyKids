import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameRegistration } from '@/lib/registry/gamesRegistry';

interface FeaturedGameState {
  featuredGame: GameRegistration | null;
  isClient: boolean;
  setFeaturedGame: (game: GameRegistration | null) => void;
  setIsClient: (isClient: boolean) => void;
}

export const useFeaturedGameStore = create<FeaturedGameState>()(
  devtools(
    (set) => ({
      featuredGame: null,
      isClient: false,
      setFeaturedGame: (game) => set({ featuredGame: game }),
      setIsClient: (isClient) => set({ isClient }),
    }),
    { name: 'FeaturedGameStore' }
  )
);
