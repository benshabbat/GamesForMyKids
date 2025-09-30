"use client";

import dynamic from 'next/dynamic';

// Dynamic import without SSR for the problematic component
const DynamicCallToActionContent = dynamic(() => import('./DynamicCallToActionContent'), {
  ssr: false,
  loading: () => (
    <div className="mt-6">
      <div className="inline-block bg-gradient-to-r from-gray-300 to-gray-300 text-gray-500 px-8 py-3 rounded-full font-bold text-lg shadow-md animate-pulse cursor-not-allowed">
        ✨ טוען... ✨
      </div>
    </div>
  )
});

export function ClientOnlyDynamicCallToAction() {
  return <DynamicCallToActionContent />;
}