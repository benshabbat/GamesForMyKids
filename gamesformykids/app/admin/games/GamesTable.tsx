'use client';

import { useState, useMemo, useTransition } from 'react';
import { setGameOverride } from '@/lib/supabase/adminService';
import type { GameOverrideStatus } from '@/lib/registry/gameOverrides';

export interface AdminGameRow {
  id: string;
  title: string;
  emoji: string;
  available: boolean;
  status: GameOverrideStatus;
  playerCount: number;
}

const STATUS_LABEL: Record<GameOverrideStatus, string> = {
  visible: 'רגיל',
  hidden: 'מוסתר',
  featured: 'מומלץ',
};

export function GamesTable({ games }: { games: AdminGameRow[] }) {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(games);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((g) => g.title.toLowerCase().includes(term) || g.id.includes(term));
  }, [rows, search]);

  function handleStatusChange(gameId: string, status: GameOverrideStatus) {
    setError(null);
    setPendingId(gameId);
    startTransition(async () => {
      const result = await setGameOverride(gameId, status);
      setPendingId(null);
      if (result.success) {
        setRows((prev) => prev.map((g) => (g.id === gameId ? { ...g, status } : g)));
      } else {
        setError(result.error ?? 'משהו השתבש');
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="חיפוש משחק..."
        className="w-full mb-4 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <div className="overflow-x-auto max-h-[70vh]">
        <table className="w-full text-sm text-right">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-100 text-gray-500">
              <th className="py-2 px-2 font-medium">משחק</th>
              <th className="py-2 px-2 font-medium">שחקנים</th>
              <th className="py-2 px-2 font-medium">סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => {
              const busy = isPending && pendingId === g.id;
              return (
                <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 px-2">
                    <span className="me-2">{g.emoji}</span>
                    {g.title}
                    {!g.available && (
                      <span className="ms-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        לא זמין בקוד
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-gray-500">{g.playerCount}</td>
                  <td className="py-2 px-2">
                    <select
                      value={g.status}
                      disabled={busy}
                      onChange={(e) => handleStatusChange(g.id, e.target.value as GameOverrideStatus)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 disabled:opacity-40"
                    >
                      {(Object.keys(STATUS_LABEL) as GameOverrideStatus[]).map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-6">לא נמצאו משחקים</p>}
      </div>
    </div>
  );
}
