'use client';
import dynamic from 'next/dynamic';
const IsraelGame = dynamic(() => import('./IsraelGame'), { ssr: false });
export default function IsraelGameClient() { return <IsraelGame />; }
