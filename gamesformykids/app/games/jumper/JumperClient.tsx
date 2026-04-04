'use client';
import dynamic from 'next/dynamic';

const JumperGame = dynamic(() => import('./JumperGame'), { ssr: false });

export default function JumperClient() {
  return <JumperGame />;
}
