import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameItem, GameTypeDbRecord } from '@/lib/types/hooks/game-state';

interface GameDataState {
  gameItems: GameItem[];
  gameTypes: GameTypeDbRecord[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
  setGameData: (items: GameItem[], types: GameTypeDbRecord[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useGameDataStore = create<GameDataState>()(
  devtools(
    (set) => ({
      gameItems: [],
      gameTypes: [],
      loading: false,
      error: null,
      loaded: false,
      setGameData: (items, types) => set({ gameItems: items, gameTypes: types, loaded: true }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      reset: () => set({ gameItems: [], gameTypes: [], loading: false, error: null, loaded: false }),
    }),
    { name: 'GameDataStore' }
  )
);
