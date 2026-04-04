'use client';

import dynamic from 'next/dynamic';

const DinoRunnerGame = dynamic(() => import('./DinoRunnerGame'), { ssr: false });

export default function DinoRunnerClient() {
  return <DinoRunnerGame />;
}
