'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setUserRole, suspendUser, deleteUser } from '@/lib/supabase/adminService';

export function UserActions({
  userId,
  role,
  banned,
  isSelf,
}: {
  userId: string;
  role: 'user' | 'admin';
  banned: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<{ success: boolean; error?: string }>, onSuccess?: () => void) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        router.refresh();
        onSuccess?.();
      } else {
        setError(result.error ?? 'משהו השתבש');
      }
    });
  }

  function handleDelete() {
    if (!confirm('למחוק את המשתמש הזה? פעולה זו בלתי הפיכה.')) return;
    run(() => deleteUser(userId), () => router.push('/admin/users'));
  }

  if (isSelf) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">⚙️ פעולות</h3>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <button
          disabled={isPending}
          onClick={() => run(() => setUserRole(userId, role === 'admin' ? 'user' : 'admin'))}
          className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-purple-200 transition-colors"
        >
          {role === 'admin' ? 'הסר הרשאת אדמין' : 'הפוך לאדמין'}
        </button>
        <button
          disabled={isPending}
          onClick={() => run(() => suspendUser(userId, banned ? 'unsuspend' : 'suspend'))}
          className="text-sm bg-orange-100 text-orange-700 px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-orange-200 transition-colors"
        >
          {banned ? 'ביטול השעיה' : 'השעיית משתמש'}
        </button>
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-red-200 transition-colors"
        >
          מחיקת משתמש
        </button>
      </div>
    </div>
  );
}
