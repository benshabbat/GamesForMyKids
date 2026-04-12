'use client';
import dynamic from 'next/dynamic';
const ChessGame = dynamic(() => import('./ChessGame'), { ssr: false });
export default function ChessClient() { return <ChessGame />; }
