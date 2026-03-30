'use client';
import dynamic from 'next/dynamic';
const CapitalsGame = dynamic(() => import('./CapitalsGame'), { ssr: false });
export default function CapitalsGameClient() { return <CapitalsGame />; }
