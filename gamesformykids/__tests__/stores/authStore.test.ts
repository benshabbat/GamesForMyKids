import { describe, it, expect, vi, beforeEach } from 'vitest';

const signOutMock = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  supabase: { auth: { signOut: (...args: unknown[]) => signOutMock(...args) } },
  isSupabaseConfigured: true,
}));

import { isIntentionalSignOut, signOutIntentionally } from '@/lib/stores/authStore';

describe('signOutIntentionally', () => {
  beforeEach(() => {
    signOutMock.mockReset();
  });

  it('is not flagged by default (e.g. a session expiring on its own)', () => {
    expect(isIntentionalSignOut()).toBe(false);
  });

  it('flags the SIGNED_OUT event emitted during supabase signOut as intentional', async () => {
    let flaggedDuringSignOut: boolean | undefined;
    signOutMock.mockImplementation(async () => {
      // supabase emits SIGNED_OUT to onAuthStateChange listeners before signOut resolves
      flaggedDuringSignOut = isIntentionalSignOut();
      return { error: null };
    });

    await signOutIntentionally();

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(flaggedDuringSignOut).toBe(true);
    expect(isIntentionalSignOut()).toBe(false);
  });

  it('clears the flag when supabase signOut rejects', async () => {
    signOutMock.mockRejectedValue(new Error('network'));
    await expect(signOutIntentionally()).resolves.toBeUndefined();
    expect(isIntentionalSignOut()).toBe(false);
  });
});
