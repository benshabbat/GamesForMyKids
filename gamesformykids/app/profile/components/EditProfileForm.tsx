import { useUserProfile } from '@/hooks';
import { useProfileStore } from '../stores/useProfileStore';

export function EditProfileForm() {
  const { updateProfile } = useUserProfile();
  const { editingName, setEditingName, handleProfileUpdate, cancelEdit } = useProfileStore();

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={editingName}
        onChange={(e) => setEditingName(e.target.value)}
        placeholder="השם שלך"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => handleProfileUpdate(updateProfile)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          שמור
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          ביטול
        </button>
      </div>
    </div>
  );
}
