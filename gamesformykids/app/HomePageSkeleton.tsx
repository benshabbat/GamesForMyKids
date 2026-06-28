export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 motion-safe:animate-pulse">
      {/* Header skeleton */}
      <div className="text-center py-6 md:py-8 lg:py-12">
        <div className="h-10 md:h-14 lg:h-16 bg-purple-200 dark:bg-purple-900 rounded-2xl mx-auto mb-4 max-w-xs" />
        <div className="h-6 bg-purple-100 dark:bg-purple-800 rounded-xl mx-auto max-w-[200px]" />
      </div>
      {/* Game grid skeleton */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-3xl bg-white/40 dark:bg-gray-700/40" />
          ))}
        </div>
      </div>
    </div>
  );
}
