"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading fallback component
const GridSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 pb-8">
    <div className="flex justify-center space-x-4 mb-8">
      <div className="h-12 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="h-12 w-32 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
      ))}
    </div>
  </div>
);

// Lazy load the main grid component
const CategorizedGamesGridDynamic = dynamic(
  () => import('./CategorizedGamesGrid'),
  {
    loading: () => <GridSkeleton />,
    ssr: false, // This component has client-side state
  }
);

export default function CategorizedGamesGridLazy() {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <CategorizedGamesGridDynamic />
    </Suspense>
  );
}
