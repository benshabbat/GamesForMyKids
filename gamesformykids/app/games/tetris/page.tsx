'use client';

import dynamic from 'next/dynamic';

const TetrisGame = dynamic(() => import('./TetrisGame'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="text-white text-2xl font-bold">🧩 טוען משחק טטריס... 🧩</div>
    </div>
  )
});

export default function TetrisPage() {
  return <TetrisGame />;
}
