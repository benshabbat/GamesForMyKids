'use client';

import { useState } from 'react';

interface EditProfileFormProps {
  initialName: string;
  onSave: (updates: { full_name: string }) => void;
  onCancel: () => void;
}

export function EditProfileForm({ initialName, onSave, onCancel }: EditProfileFormProps) {
  const [name, setName] = useState(initialName);

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
  );
}
