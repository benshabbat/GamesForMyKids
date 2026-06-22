export default function CanvasGameSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col p-4 gap-4 animate-pulse" dir="rtl">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-indigo-200 rounded-xl" />
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-purple-200 rounded-xl" />
          <div className="h-8 w-16 bg-pink-200 rounded-xl" />
        </div>
      </div>
      {/* Canvas placeholder */}
      <div className="flex-1 min-h-[60vh] bg-white/60 rounded-3xl border-2 border-indigo-100 flex items-center justify-center">
        <div className="text-6xl opacity-20">🎮</div>
      </div>
      {/* Controls row */}
      <div className="flex justify-center gap-3">
        <div className="h-12 w-24 bg-indigo-200 rounded-2xl" />
        <div className="h-12 w-24 bg-purple-200 rounded-2xl" />
      </div>
    </div>
  );
}
