'use client';

import dynamic from 'next/dynamic';

const HealthyFoodGame = dynamic(() => import('./HealthyFoodGame'), { ssr: false });

export default function HealthyFoodGameClient() {
  return <HealthyFoodGame />;
}
