'use client'

import { useUserProfile } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import Link from 'next/link'

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

  const handleSettingChange = async (setting: string, value: boolean | string) => {
    setSaving(true)
    await updateSettings({ [setting]: value })
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
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            ← חזור לדף הבית
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">הגדרות</h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Audio Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🔊 הגדרות שמע
            </h2>
            <div className="space-y-4">
              <SettingToggle
                label="צלילי משחק"
                description="הפעלת צלילים במשחקים"
                checked={settings?.sound_enabled ?? true}
                onChange={(checked) => handleSettingChange('sound_enabled', checked)}
                disabled={saving}
              />
              <SettingToggle
                label="מוזיקת רקע"
                description="הפעלת מוזיקה ברקע"
                checked={settings?.music_enabled ?? true}
                onChange={(checked) => handleSettingChange('music_enabled', checked)}
                disabled={saving}
              />
            </div>
          </div>

          {/* Game Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🎮 הגדרות משחק
            </h2>
            <div className="space-y-4">
              <SettingSelect
                label="רמת קושי"
                description="רמת הקושי הברירת מחדל"
                value={settings?.difficulty_level ?? 'normal'}
                options={[
                  { value: 'easy', label: 'קל' },
                  { value: 'normal', label: 'רגיל' },
                  { value: 'hard', label: 'קשה' }
                ]}
                onChange={(value) => handleSettingChange('difficulty_level', value)}
                disabled={saving}
              />
              <SettingSelect
                label="ערכת נושא"
                description="מראה האפליקציה"
                value={settings?.theme ?? 'light'}
                options={[
                  { value: 'light', label: 'בהיר' },
                  { value: 'dark', label: 'כהה' },
                  { value: 'auto', label: 'אוטומטי' }
                ]}
                onChange={(value) => handleSettingChange('theme', value)}
                disabled={saving}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🔔 הגדרות התראות
            </h2>
            <div className="space-y-4">
              <SettingToggle
                label="התראות משחק"
                description="התראות על הישגים והתקדמות"
                checked={settings?.notifications_enabled ?? true}
                onChange={(checked) => handleSettingChange('notifications_enabled', checked)}
                disabled={saving}
              />
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🌐 שפה
            </h2>
            <div className="space-y-4">
              <SettingSelect
                label="שפת האפליקציה"
                description="השפה העיקרית"
                value={settings?.preferred_language ?? 'he'}
                options={[
                  { value: 'he', label: 'עברית' },
                  { value: 'en', label: 'English' }
                ]}
                onChange={(value) => handleSettingChange('preferred_language', value)}
                disabled={saving}
              />
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              👤 חשבון
            </h2>
            <div className="space-y-4">
              <Link
                href="/profile"
                className="block w-full text-left p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                ערוך פרופיל
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                התנתק מהחשבון
              </button>
            </div>
          </div>
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

function SettingToggle({ 
  label, 
  description, 
  checked, 
  onChange, 
  disabled 
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div>
        <h3 className="font-medium text-gray-800">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
      </label>
    </div>
  )
}

function SettingSelect({ 
  label, 
  description, 
  value, 
  options, 
  onChange, 
  disabled 
}: {
  label: string
  description: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  disabled?: boolean
}) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
