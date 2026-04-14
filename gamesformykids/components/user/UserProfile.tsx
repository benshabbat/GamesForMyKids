'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useUserProfile } from './useUserProfile'
import { buildAvatarUrl, USER_PROFILE_LABELS as L, USER_PROFILE_ROUTES as R } from './userProfileConstants'

export function UserProfile() {
  const { user, loading, isGuest, isMenuOpen, toggleMenu, closeMenu, handleSignOut } = useUserProfile()

  if (loading) {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
  }

  if (isGuest) {
    return (
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center">
          <span className="mr-1">{L.guestEmoji}</span>
          {L.guest}
        </div>
        <Link href={R.login} prefetch={false}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {L.login}
        </Link>
      </div>
    )
  }

  if (!user) {
    return (
      <Link href={R.login} prefetch={false}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
        {L.login}
      </Link>
    )
  }

  const displayName = user.user_metadata?.full_name || user.email
  const avatarSrc   = user.user_metadata?.avatar_url || buildAvatarUrl(user.email)

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center space-x-2 space-x-reverse">
        <Image src={avatarSrc} alt="תמונת פרופיל" width={32} height={32}
          className="w-8 h-8 rounded-full border-2 border-purple-300" />
        <span className="text-sm text-gray-700 hidden sm:block">{displayName}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <div className="font-medium">{user.user_metadata?.full_name || L.defaultName}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
            <Link href={R.profile} onClick={closeMenu}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {L.profile}
            </Link>
            <Link href={R.settings} onClick={closeMenu}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {L.settings}
            </Link>
            <button onClick={handleSignOut}
              className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              {L.signOut}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
