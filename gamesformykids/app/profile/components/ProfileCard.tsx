import Image from 'next/image';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useUserProfile } from '@/hooks';
import { useProfileStore, getDisplayName, getAvatarSrc } from '../stores/useProfileStore';
import { EditProfileForm } from './EditProfileForm';

export function ProfileCard() {
  const { user } = useAuth();
  const { profile, uploadAvatar } = useUserProfile();
  const { isEditing, uploadingAvatar, startEdit, handleAvatarUpload } = useProfileStore();

  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-6 space-x-reverse">
        <div className="relative">
          <Image
            src={getAvatarSrc(profile, user)}
            alt="תמונת פרופיל"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border-4 border-purple-300"
          />
          <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAvatarUpload(file, uploadAvatar);
              }}
              disabled={uploadingAvatar}
              className="hidden"
            />
            {uploadingAvatar ? '⏳' : '📷'}
          </label>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <EditProfileForm />
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{getDisplayName(profile, user)}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button onClick={startEdit} className="mt-2 text-purple-600 hover:text-purple-800">
                ערוך פרופיל
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
