'use client';

import dynamic from 'next/dynamic';

const HolidaysGame = dynamic(() => import('./HolidaysGame'), { ssr: false });

export default function HolidaysGameClient() {
  return <HolidaysGame />;
}
