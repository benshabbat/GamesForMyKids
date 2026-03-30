'use client';
import dynamic from 'next/dynamic';
const NatureGame = dynamic(() => import('./NatureGame'), { ssr: false });
export default function NatureGameClient() { return <NatureGame />; }
