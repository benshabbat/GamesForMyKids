'use client';
import dynamic from 'next/dynamic';
const InstrumentsGame = dynamic(() => import('./InstrumentsGame'), { ssr: false });
export default function InstrumentsGameClient() { return <InstrumentsGame />; }
