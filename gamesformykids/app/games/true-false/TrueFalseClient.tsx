'use client';
import dynamic from 'next/dynamic';
const TrueFalseGame = dynamic(() => import('./TrueFalseGame'), { ssr: false });
export default function TrueFalseClient() { return <TrueFalseGame />; }
