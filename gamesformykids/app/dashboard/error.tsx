'use client';

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">שגיאה בטעינת הנתונים</h2>
        <p className="text-gray-500 text-sm mb-6">לא ניתן היה לטעון את לוח ההורים</p>
        <button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}
