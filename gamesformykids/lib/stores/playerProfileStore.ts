import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PlayerProfileData } from '@/hooks/shared/common/usePlayerProfile';

interface PlayerProfileState {
  profiles: Record<string, PlayerProfileData | null>;
  loadingStates: Record<string, boolean>;
  setProfile: (playerId: string, data: PlayerProfileData | null) => void;
  setLoading: (playerId: string, loading: boolean) => void;
  removeProfile: (playerId: string) => void;
}

export const usePlayerProfileStore = create<PlayerProfileState>()(
  devtools(
    (set) => ({
      profiles: {},
      loadingStates: {},
      setProfile: (playerId, data) =>
        set((state) => ({
          profiles: { ...state.profiles, [playerId]: data },
        })),
      setLoading: (playerId, loading) =>
        set((state) => ({
          loadingStates: { ...state.loadingStates, [playerId]: loading },
        })),
      removeProfile: (playerId) =>
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [playerId]: _p, ...restProfiles } = state.profiles;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [playerId]: _l, ...restLoading } = state.loadingStates;
          return { profiles: restProfiles, loadingStates: restLoading };
        }),
    }),
    { name: 'PlayerProfileStore' }
  )
);
