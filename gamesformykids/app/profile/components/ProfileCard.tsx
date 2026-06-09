import Image from 'next/image';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { useUserProfile } from '@/hooks';
import { useProfileStore, getDisplayName, getAvatarSrc } from '../stores/useProfileStore';
import { EditProfileForm } from './EditProfileForm';

function formatMemberSince(iso: string): string {
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' });
}

export function ProfileCard() {
  const { user } = useAuth();
  const { profile, uploadAvatar } = useUserProfile();
  const { isEditing, uploadingAvatar, startEdit, handleAvatarUpload } = useProfileStore();

  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-6">
        {/* avatar */}
        <div className="relative shrink-0">
          <Image
            src={getAvatarSrc(profile, user)}
            alt="תמונת פרופיל"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-4 border-purple-300 object-cover"
          />
          <label
            className="absolute bottom-0 right-0 bg-purple-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-purple-600 transition-colors"
            title="שנה תמונה"
          >
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
            <span className="text-sm">{uploadingAvatar ? '⏳' : '📷'}</span>
          </label>
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <EditProfileForm />
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 truncate">
                {getDisplayName(profile, user)}
              </h2>
              <p className="text-gray-500 text-sm truncate">{user.email}</p>
              {profile?.created_at && (
                <p className="text-xs text-gray-400 mt-0.5">
                  חבר מאז {formatMemberSince(profile.created_at)}
                </p>
              )}
              <button
                onClick={startEdit}
                className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                ✏️ ערוך פרופיל
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
