'use client'

import { useUserProfile, useGameProgress, useAchievements } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, updateProfile, uploadAvatar } = useUserProfile()
  const { progress } = useGameProgress()
  const { achievements } = useAchievements()
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  if (authLoading || profileLoading) {
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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    await uploadAvatar(file)
    setUploadingAvatar(false)
  }

  const handleProfileUpdate = async (updates: { full_name: string }) => {
    await updateProfile(updates)
    setIsEditing(false)
  }

  const totalScore = progress.reduce((sum, p) => sum + p.best_score, 0)
  const totalPlayTime = Math.floor(progress.reduce((sum, p) => sum + p.total_play_time, 0) / 60) // in minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            ← חזור לדף הבית
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">הפרופיל שלי</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="relative">
              <Image
                src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=8b5cf6&color=fff`}
                alt="תמונת פרופיל"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full border-4 border-purple-300"
              />
              <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                  className="hidden"
                />
                {uploadingAvatar ? '⏳' : '📷'}
              </label>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <EditProfileForm
                  initialName={profile?.full_name || user.user_metadata?.full_name || ''}
                  onSave={handleProfileUpdate}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profile?.full_name || user.user_metadata?.full_name || 'משתמש'}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-purple-600 hover:text-purple-800"
                  >
                    ערוך פרופיל
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-lg font-semibold text-gray-700">סך הניקוד</h3>
            <p className="text-2xl font-bold text-purple-600">{totalScore}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="text-lg font-semibold text-gray-700">זמן משחק</h3>
            <p className="text-2xl font-bold text-purple-600">{totalPlayTime} דקות</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🎖️</div>
            <h3 className="text-lg font-semibold text-gray-700">הישגים</h3>
            <p className="text-2xl font-bold text-purple-600">{achievements.length}</p>
          </div>
        </div>

        {/* Game Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">התקדמות במשחקים</h3>
          {progress.length > 0 ? (
            <div className="space-y-4">
              {progress.map((gameProgress) => (
                <div key={gameProgress.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold capitalize">{gameProgress.game_type}</h4>
                    <p className="text-sm text-gray-600">רמה {gameProgress.level}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-purple-600">{gameProgress.best_score} נקודות</p>
                    <p className="text-sm text-gray-600">{Math.floor(gameProgress.total_play_time / 60)} דקות</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">עדיין לא שיחקת במשחקים! בוא נתחיל!</p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">הישגים אחרונים</h3>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.slice(0, 6).map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 space-x-reverse p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{achievement.achievement_name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">עדיין אין הישגים. שחק כדי לזכות בהישגים!</p>
          )}
        </div>
      </div>
    </div>
  )
}

function EditProfileForm({ 
  initialName, 
  onSave, 
  onCancel 
}: { 
  initialName: string
  onSave: (updates: { full_name: string }) => void
  onCancel: () => void 
}) {
  const [name, setName] = useState(initialName)

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="השם שלך"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => onSave({ full_name: name })}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          שמור
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          ביטול
        </button>
      </div>
    </div>
  )
}
