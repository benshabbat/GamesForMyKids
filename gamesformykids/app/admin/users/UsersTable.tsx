'use client';

import { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { setUserRole, suspendUser, deleteUser } from '@/lib/supabase/adminService';

export interface AdminUserRow {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  created_at: string;
  banned: boolean;
}

export function UsersTable({ users, currentUserId }: { users: AdminUserRow[]; currentUserId: string }) {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(users);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((u) => (u.full_name ?? '').toLowerCase().includes(term) || u.id.includes(term));
  }, [rows, search]);

  function runAction(id: string, action: () => Promise<{ success: boolean; error?: string }>, onSuccess: () => void) {
    setError(null);
    setPendingId(id);
    startTransition(async () => {
      const result = await action();
      setPendingId(null);
      if (result.success) onSuccess();
      else setError(result.error ?? 'משהו השתבש');
    });
  }

  function handleRoleToggle(u: AdminUserRow) {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    runAction(u.id, () => setUserRole(u.id, newRole), () => {
      setRows((prev) => prev.map((r) => (r.id === u.id ? { ...r, role: newRole } : r)));
    });
  }

  function handleSuspendToggle(u: AdminUserRow) {
    const action = u.banned ? 'unsuspend' : 'suspend';
    runAction(u.id, () => suspendUser(u.id, action), () => {
      setRows((prev) => prev.map((r) => (r.id === u.id ? { ...r, banned: !r.banned } : r)));
    });
  }

  function handleDelete(u: AdminUserRow) {
    if (!confirm(`למחוק את המשתמש ${u.full_name ?? u.id}? פעולה זו בלתי הפיכה.`)) return;
    runAction(u.id, () => deleteUser(u.id), () => {
      setRows((prev) => prev.filter((r) => r.id !== u.id));
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="חיפוש לפי שם או מזהה..."
        className="w-full mb-4 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500">
              <th className="py-2 px-2 font-medium">שם</th>
              <th className="py-2 px-2 font-medium">תפקיד</th>
              <th className="py-2 px-2 font-medium">נרשם</th>
              <th className="py-2 px-2 font-medium">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const isSelf = u.id === currentUserId;
              const busy = isPending && pendingId === u.id;
              return (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-2">
                    <Link href={`/admin/users/${u.id}`} className="text-purple-700 hover:underline">
                      {u.full_name ?? '(ללא שם)'}
                    </Link>
                  </td>
                  <td className="py-2 px-2">
                    <span className={u.role === 'admin' ? 'text-purple-700 font-semibold' : 'text-gray-500'}>
                      {u.role === 'admin' ? 'אדמין' : 'משתמש'}
                    </span>
                    {u.banned && (
                      <span className="ms-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">מושעה</span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-gray-500">
                    {new Date(u.created_at).toLocaleDateString('he-IL')}
                  </td>
                  <td className="py-2 px-2 space-x-2 space-x-reverse whitespace-nowrap">
                    <button
                      disabled={isSelf || busy}
                      onClick={() => handleRoleToggle(u)}
                      className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-purple-200 transition-colors"
                    >
                      {u.role === 'admin' ? 'הסר הרשאה' : 'הפוך לאדמין'}
                    </button>
                    <button
                      disabled={isSelf || busy}
                      onClick={() => handleSuspendToggle(u)}
                      className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-orange-200 transition-colors"
                    >
                      {u.banned ? 'ביטול השעיה' : 'השעיה'}
                    </button>
                    <button
                      disabled={isSelf || busy}
                      onClick={() => handleDelete(u)}
                      className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-red-200 transition-colors"
                    >
                      מחיקה
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-6">לא נמצאו משתמשים</p>}
      </div>
    </div>
  );
}
