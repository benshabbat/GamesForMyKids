'use client'

import { useUserProfile, useGameProgress, useAchievements } from '@/hooks'
import { useAuth } from '@/hooks/shared/auth/useAuth'
import { useState } from 'react'
import { ProfileLoadingScreen } from './components/ProfileLoadingScreen'
import { ProfileUnauthenticated } from './components/ProfileUnauthenticated'
import { ProfilePageHeader } from './components/ProfilePageHeader'
import { ProfileCard } from './components/ProfileCard'
import { ProfileStatCards } from './components/ProfileStatCards'
import { GameProgressList } from './components/GameProgressList'
import { AchievementsList } from './components/AchievementsList'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, updateProfile, uploadAvatar } = useUserProfile()
  const { progress } = useGameProgress()
  const { achievements } = useAchievements()
  const [isEditing, setIsEditing] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  if (authLoading || profileLoading) return <ProfileLoadingScreen />
  if (!user) return <ProfileUnauthenticated />

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
  const totalPlayTime = Math.floor(progress.reduce((sum, p) => sum + p.total_play_time, 0) / 60)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <ProfilePageHeader />
        <ProfileCard
          profile={profile}
          user={user}
          isEditing={isEditing}
          uploadingAvatar={uploadingAvatar}
          onAvatarUpload={handleAvatarUpload}
          onEdit={() => setIsEditing(true)}
          onSave={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
        <ProfileStatCards
          totalScore={totalScore}
          totalPlayTime={totalPlayTime}
          achievementsCount={achievements.length}
        />
        <GameProgressList progress={progress} />
        <AchievementsList achievements={achievements} />
      </div>
    </div>
  )
}
