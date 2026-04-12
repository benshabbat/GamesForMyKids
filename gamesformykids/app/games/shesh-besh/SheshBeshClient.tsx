'use client';
import dynamic from 'next/dynamic';
const SheshBeshGame = dynamic(() => import('./SheshBeshGame'), { ssr: false });
export default function SheshBeshClient() { return <SheshBeshGame />; }
