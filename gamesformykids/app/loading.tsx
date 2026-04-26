export default function RootLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="flex flex-col items-center gap-6">
        <div className="text-7xl animate-bounce">🎮</div>
        <div className="flex gap-2">
          <span className="w-4 h-4 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-4 h-4 rounded-full bg-pink-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="text-xl font-bold text-purple-700">טוען...</p>
      </div>
    </div>
  );
}
