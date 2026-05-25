'use client';

import { useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/shared/auth/useAuth'
import {
  fetchUserProfile,
  fetchUserSettings,
  updateUserProfile as updateUserProfileService,
  updateUserSettings as updateUserSettingsService,
  uploadAvatar as uploadAvatarService,
} from '@/lib/supabase/userProfile'
import { useUserProfileStore } from '@/lib/stores/userProfileStore'
import { useAudioSettingsStore } from '@/lib/stores/audioSettingsStore'
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore'
import type { DifficultyLevel } from '@/lib/types'

const DIFFICULTY_MAP: Record<string, DifficultyLevel> = {
  easy: 'easy', medium: 'medium', hard: 'hard', normal: 'medium',
}

function syncSettingsToLocalStores(settings: { sound_enabled: boolean; difficulty_level: string } | null) {
  if (!settings) return
  useAudioSettingsStore.getState().saveSettings({ enabled: settings.sound_enabled })
  const difficulty = DIFFICULTY_MAP[settings.difficulty_level] ?? 'medium'
  useGameDifficulty.getState().setDifficulty(difficulty)
}

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  sound_enabled: boolean
  music_enabled: boolean
  notifications_enabled: boolean
  preferred_language: string
  theme: string
  difficulty_level: string
  created_at: string
  updated_at: string
}

export function useUserProfile() {
  const { user } = useAuth()
  const profile = useUserProfileStore((s) => s.profile)
  const settings = useUserProfileStore((s) => s.settings)
  const loading = useUserProfileStore((s) => s.loading)
  const error = useUserProfileStore((s) => s.error)
  const loadedForUserId = useUserProfileStore((s) => s.loadedForUserId)
  const {
    setProfile,
    setSettings,
    setLoading,
    setError,
    setLoadedForUserId,
  } = useUserProfileStore()

  const fetchProfile = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)

      const [profileData, settingsData] = await Promise.all([
        fetchUserProfile(user.id),
        fetchUserSettings(user.id),
      ])

      setProfile(profileData)
      setSettings(settingsData)
      syncSettingsToLocalStores(settingsData)
      setLoadedForUserId(user.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הפרופיל')
    } finally {
      setLoading(false)
    }
  }, [user, setProfile, setSettings, setLoading, setError, setLoadedForUserId])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    if (loadedForUserId === user.id) return
    fetchProfile()
  }, [user, loadedForUserId, fetchProfile, setLoading])

  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return null

    try {
      const data = await updateUserProfileService(user.id, updates)
      setProfile(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון הפרופיל')
      return null
    }
  }

  async function updateSettings(updates: Partial<UserSettings>) {
    if (!user) return null

    try {
      const data = await updateUserSettingsService(user.id, updates)
      setSettings(data)
      syncSettingsToLocalStores(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון ההגדרות')
      return null
    }
  }

  async function uploadAvatar(file: File) {
    if (!user) return null

    try {
      const publicUrl = await uploadAvatarService(user.id, file)
      return updateProfile({ avatar_url: publicUrl })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהעלאת התמונה')
      return null
    }
  }

  return {
    profile,
    settings,
    loading,
    error,
    updateProfile,
    updateSettings,
    uploadAvatar,
    refreshProfile: fetchProfile
  }
}
