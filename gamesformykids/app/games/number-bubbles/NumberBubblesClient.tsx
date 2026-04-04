'use client';
import dynamic from 'next/dynamic';
const NumberBubblesGame = dynamic(() => import('./NumberBubblesGame'), { ssr: false });
export default function NumberBubblesClient() { return <NumberBubblesGame />; }
