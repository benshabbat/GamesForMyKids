'use client';

import dynamic from 'next/dynamic';

const ReflexGame = dynamic(() => import('./ReflexGame'), { ssr: false });

export default function ReflexGameClient() {
  return <ReflexGame />;
}
