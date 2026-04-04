'use client';
import dynamic from 'next/dynamic';
const MeteorDodgeGame = dynamic(() => import('./MeteorDodgeGame'), { ssr: false });
export default function MeteorDodgeClient() {
  return <MeteorDodgeGame />;
}
