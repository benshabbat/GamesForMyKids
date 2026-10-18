'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useGameOverrideStatus } from '@/hooks/shared/app/useGameOverrides';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Game pages are statically generated, so an admin "hidden" override can't 404 them.
 * Once the overrides load, a hidden game shows this notice instead of the game, so a
 * game pulled from the site isn't still playable from an old link or bookmark.
 */
export default function HiddenGameGuard({ gameId, children }: { gameId: string; children: ReactNode }) {
  if (useGameOverrideStatus(gameId) !== 'hidden') return <>{children}</>;

  return (
    <div dir="rtl" className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-6xl" aria-hidden="true">🚧</div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">המשחק הזה לא זמין כרגע</h1>
      <p className="text-gray-600 dark:text-gray-300">יש עוד המון משחקים שמחכים לך!</p>
      <Link
        href={ROUTES.HOME}
        className="rounded-2xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-purple-700"
      >
        🏠 לכל המשחקים
      </Link>
    </div>
  );
}
