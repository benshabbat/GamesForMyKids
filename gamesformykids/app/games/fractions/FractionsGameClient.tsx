'use client';
import dynamic from 'next/dynamic';
const FractionsGame = dynamic(() => import('./FractionsGame'), { ssr: false });
export default function FractionsGameClient() { return <FractionsGame />; }
