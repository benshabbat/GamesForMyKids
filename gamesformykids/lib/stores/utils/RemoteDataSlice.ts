/**
 * RemoteDataSlice — shared state shape for stores that fetch data
 * from Supabase on behalf of a specific user.
 *
 * Used by: achievementsStore, gameProgressDataStore, userProfileStore
 */
export interface RemoteDataSlice {
  loading: boolean;
  error: string | null;
  /** Tracks which userId's data is currently loaded — prevents duplicate fetches. */
  loadedForUserId: string | null;
}

export const INITIAL_REMOTE_SLICE: RemoteDataSlice = {
  loading: true,
  error: null,
  loadedForUserId: null,
};
