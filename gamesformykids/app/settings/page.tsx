'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUserProfile } from '@/hooks'
import { useAuth } from '@/hooks/shared/auth/useAuth'
import { AudioSection } from '@/components/settings/AudioSection'
import { AppearanceSection } from '@/components/settings/AppearanceSection'
import { AccountSection } from '@/components/settings/AccountSection'

export default function SettingsPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { settings, loading: settingsLoading, updateSettings } = useUserProfile()
  const [saving, setSaving] = useState(false)

  if (authLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-xl">טוען...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">נדרשת התחברות</h1>
          <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            התחבר כעת
          </Link>
        </div>
      </div>
    )
  }

  const handleSettingChange = async (key: string, value: boolean | string) => {
    setSaving(true)
    await updateSettings({ [key]: value })
    setSaving(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('שגיאה בהתנתקות:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            ← חזור לדף הבית
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">הגדרות</h1>
        </div>

        <div className="space-y-6">
          <AudioSection
            soundEnabled={settings?.sound_enabled ?? true}
            musicEnabled={settings?.music_enabled ?? true}
            notificationsEnabled={settings?.notifications_enabled ?? true}
            onChange={handleSettingChange}
            disabled={saving}
          />
          <AppearanceSection
            difficulty={settings?.difficulty_level ?? 'normal'}
            theme={settings?.theme ?? 'light'}
            language={settings?.preferred_language ?? 'he'}
            onChange={handleSettingChange}
            disabled={saving}
          />
          <AccountSection onSignOut={handleSignOut} />
        </div>

        {saving && (
          <div className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
            שומר...
          </div>
        )}
      </div>
    </div>
  )
}
