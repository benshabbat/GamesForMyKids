'use client';

export default function OfflineReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]"
    >
      🔄 נסה שוב
    </button>
  );
}
