export default function GameLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex flex-col items-center gap-6">
        <div className="text-7xl animate-spin" style={{ animationDuration: '2s' }}>⭐</div>
        <div className="flex gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-4 h-4 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-4 h-4 rounded-full bg-pink-400 animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="text-xl font-bold text-blue-700">המשחק נטען...</p>
      </div>
    </div>
  );
}
