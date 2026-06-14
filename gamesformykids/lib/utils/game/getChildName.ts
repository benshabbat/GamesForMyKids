import { useUserProfileStore } from '@/lib/stores/userProfileStore';

/** Returns the child's name from the logged-in profile, or the guest localStorage value, or null. */
export function getChildName(): string | null {
  if (typeof window === 'undefined') return null;
  const name = useUserProfileStore.getState().profile?.full_name;
  if (name) return name;
  return localStorage.getItem('gfk_child_name');
}
