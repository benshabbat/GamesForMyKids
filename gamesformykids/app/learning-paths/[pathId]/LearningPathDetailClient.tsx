'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { getLearningPath } from '@/lib/constants/learningPaths';
import { useLearningPathProgress } from '@/hooks/shared/progress/useLearningPathProgress';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';

interface Props {
  pathId: string;
}

export default function LearningPathDetailClient({ pathId }: Props) {
  const path = getLearningPath(pathId);
  const gameLabelById = useMemo(() => {
    const map = new Map<string, { title: string; emoji: string }>();
    for (const g of GamesRegistry.getAllGameRegistrations()) {
      map.set(g.id, { title: g.title, emoji: g.emoji });
    }
    return map;
  }, []);

  const { completedGameIds, completedCount, totalCount, nextGameId } = useLearningPathProgress(path);

  // path existence is already validated server-side (notFound() in page.tsx)
  if (!path) return null;

  const isPathComplete = completedCount === totalCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/learning-paths" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
            → כל המסלולים
          </Link>
          <div className="text-5xl mb-2">{path.emoji}</div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">{path.title}</h1>
          <p className="text-gray-600">{path.description}</p>
        </div>

        {isPathComplete ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-6">
            <p className="text-4xl mb-2">🎉</p>
            <p className="font-bold text-green-800">סיימתם את כל המסלול!</p>
          </div>
        ) : (
          nextGameId && (
            <Link
              href={`/games/${nextGameId}`}
              className="block bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center py-3 px-6 rounded-xl transition-colors mb-6"
            >
              ▶️ המשחק הבא: {gameLabelById.get(nextGameId)?.title ?? nextGameId}
            </Link>
          )
        )}

        <p className="text-sm text-gray-500 text-center mb-4">{completedCount}/{totalCount} הושלמו</p>

        <ol className="space-y-3">
          {path.gameIds.map((gameId, index) => {
            const isDone = completedGameIds.has(gameId);
            const label = gameLabelById.get(gameId);
            return (
              <li key={gameId}>
                <Link
                  href={`/games/${gameId}`}
                  className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                    isDone
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <span className="text-2xl w-8 text-center">{isDone ? '✅' : index + 1}</span>
                  <span className="text-2xl">{label?.emoji ?? '🎮'}</span>
                  <span className="font-medium text-gray-800">{label?.title ?? gameId}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
