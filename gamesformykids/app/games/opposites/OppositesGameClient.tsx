'use client';
import dynamic from 'next/dynamic';
const OppositesGame = dynamic(() => import('./OppositesGame'), { ssr: false });
export default function OppositesGameClient() { return <OppositesGame />; }
