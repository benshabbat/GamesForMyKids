export default function QuizGameSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-pink-50 flex flex-col items-center justify-center p-6 gap-6 animate-pulse" dir="rtl">
      {/* Question card */}
      <div className="w-full max-w-md bg-white/70 rounded-3xl p-6 flex flex-col gap-4">
        <div className="h-4 w-24 bg-violet-200 rounded-full mx-auto" />
        <div className="h-6 w-full bg-violet-100 rounded-xl" />
        <div className="h-6 w-3/4 bg-violet-100 rounded-xl" />
        <div className="text-5xl text-center opacity-20">❓</div>
      </div>
      {/* 4 answer buttons */}
      <div className="w-full max-w-md grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-white/60 rounded-2xl border-2 border-violet-100" />
        ))}
      </div>
    </div>
  );
}
