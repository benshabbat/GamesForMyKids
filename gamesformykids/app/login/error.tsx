'use client';

export default function LoginError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">שגיאה בטעינת הדף</h2>
        <p className="text-gray-500 text-sm mb-6">לא ניתן היה לטעון את דף ההתחברות</p>
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}
