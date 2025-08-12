'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function UserProfile() {
  const { user, signOut, loading, isGuest } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (loading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    )
  }

  // Guest user
  if (isGuest) {
    return (
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center">
          <span className="mr-1">🎮</span>
          משתמש אורח
        </div>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          התחבר
        </Link>
      </div>
    )
  }

  // No user and not guest - show login
  if (!user) {
    return (
      <Link
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
      >
        התחבר
      </Link>
    )
  }

  // Authenticated user
  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 space-x-reverse"
      >
        <Image
          src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=8b5cf6&color=fff`}
          alt="תמונת פרופיל"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full border-2 border-purple-300"
        />
        <span className="text-sm text-gray-700 hidden sm:block">
          {user.user_metadata?.full_name || user.email}
        </span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <div className="font-medium">{user.user_metadata?.full_name || 'משתמש'}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              פרופיל
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              הגדרות
            </Link>
            <button
              onClick={() => {
                signOut()
                setIsMenuOpen(false)
              }}
              className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              התנתק
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
