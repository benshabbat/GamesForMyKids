import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

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
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single()

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError
      }

      setProfile(profileData)
      setSettings(settingsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הפרופיל')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    fetchProfile()
  }, [user, fetchProfile])

  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

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
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      setSettings(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בעדכון ההגדרות')
      return null
    }
  }

  async function uploadAvatar(file: File) {
    if (!user) return null

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update profile with new avatar URL
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
