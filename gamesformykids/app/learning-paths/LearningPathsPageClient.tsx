'use client';

import Link from 'next/link';
import { LEARNING_PATHS, type LearningPath } from '@/lib/constants/learningPaths';
import { useLearningPathProgress } from '@/hooks/shared/progress/useLearningPathProgress';

function LearningPathCard({ path }: { path: LearningPath }) {
  const { completedCount, totalCount } = useLearningPathProgress(path);
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <Link
      href={`/learning-paths/${path.id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="text-4xl mb-2">{path.emoji}</div>
      <h2 className="text-lg font-bold text-gray-800 mb-1">{path.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{path.description}</p>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">{completedCount}/{totalCount} הושלמו</p>
    </Link>
  );
}

export default function LearningPathsPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
            → חזור לדף הבית
          </Link>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">🗺️ מסלולי למידה</h1>
          <p className="text-gray-600">רצף משחקים מומלץ סביב נושא — שלב אחרי שלב</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {LEARNING_PATHS.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
}
