'use client';

export function GameCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl md:rounded-3xl shadow-lg overflow-hidden bg-gray-200 animate-pulse"
      style={{ minHeight: '140px' }}
    >
      <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
    </div>
  );
}

export function GameCardSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}
