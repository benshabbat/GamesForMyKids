'use client';
import dynamic from 'next/dynamic';
const WorldLanguagesGame = dynamic(() => import('./WorldLanguagesGame'), { ssr: false });
export default function WorldLanguagesGameClient() { return <WorldLanguagesGame />; }
