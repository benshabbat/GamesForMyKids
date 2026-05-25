/**
 * ===============================================
 * Supabase Service — User Profile & Settings
 * ===============================================
 * All raw `supabase.from('profiles')`, `supabase.from('user_settings')`,
 * and `supabase.storage.from('avatars')` calls live here.
 * Hooks import these functions instead of calling supabase directly.
 */

import { supabase } from './client';
import type { UserProfile, UserSettings } from '@/hooks/shared/user/useUserProfile';

/** Fetch the profile row for a user. Returns null if no row exists yet. */
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    // PGRST116 = no rows found — not an error
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as UserProfile;
}

/** Fetch the settings row for a user. Returns null if no row exists yet. */
export async function fetchUserSettings(userId: string): Promise<UserSettings | null> {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as UserSettings;
}

/** Upsert profile fields and return the saved row. */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
}

/** Upsert settings fields and return the saved row. */
export async function updateUserSettings(
  userId: string,
  updates: Partial<UserSettings>,
): Promise<UserSettings> {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data as UserSettings;
}

/** Upload an avatar file and return the public URL. */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}
