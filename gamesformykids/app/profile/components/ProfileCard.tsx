import Image from 'next/image';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '@/hooks/shared/user/useUserProfile';
import { EditProfileForm } from './EditProfileForm';

interface ProfileCardProps {
  profile: UserProfile | null;
  user: User;
  isEditing: boolean;
  uploadingAvatar: boolean;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: () => void;
  onSave: (updates: { full_name: string }) => void;
  onCancel: () => void;
}

export function ProfileCard({
  profile,
  user,
  isEditing,
  uploadingAvatar,
  onAvatarUpload,
  onEdit,
  onSave,
  onCancel,
}: ProfileCardProps) {
  const displayName = profile?.full_name || user.user_metadata?.full_name || 'משתמש';
  const avatarSrc =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=8b5cf6&color=fff`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-6 space-x-reverse">
        <div className="relative">
          <Image
            src={avatarSrc}
            alt="תמונת פרופיל"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border-4 border-purple-300"
          />
          <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600">
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              disabled={uploadingAvatar}
              className="hidden"
            />
            {uploadingAvatar ? '⏳' : '📷'}
          </label>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <EditProfileForm
              initialName={displayName}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={onEdit}
                className="mt-2 text-purple-600 hover:text-purple-800"
              >
                ערוך פרופיל
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
