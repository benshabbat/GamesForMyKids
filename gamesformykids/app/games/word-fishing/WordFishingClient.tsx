'use client';
import { useWordFishingGame } from './useWordFishingGame';

export default function WordFishingClient() {
  const {
    phase, score, lives, question, feedback, wave,
    feedbackTimerRef, heartStr, totalWaves,
    canvasRef, startGame, handlePointerDown,
  } = useWordFishingGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-7xl mb-4">🎣</div>
        <h1 className="text-4xl font-bold mb-2">דיג מילים</h1>
        <p className="text-xl mb-2 text-blue-200">תפוס את הדג הנכון לפי השאלה!</p>
        <p className="text-sm text-blue-300 mb-8">לחץ על הדג הנכון כדי לדוג אותו</p>
        <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm w-full">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👀</div><div>קרא את השאלה</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🔍</div><div>מצא את הדג</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🎣</div><div>לחץ לדוג!</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🎮 בואו נדוג!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / totalWaves) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2">כל הכבוד, דַּיָּג!</h1>
        <p className="text-xl mb-6 text-blue-200">תפסת {score} מתוך {totalWaves} דגים!</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
            <div className="text-sm text-blue-200">דגים שתפסת</div>
          </div>
          <div className="text-center bg-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-400">{pct}%</div>
            <div className="text-sm text-blue-200">דיוק</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col" dir="rtl">
      <div className="flex items-center justify-between px-4 py-2 bg-blue-950/70 text-white z-10">
        <div className="text-lg">{heartStr}</div>
        <div className="text-sm text-blue-300">גל {wave + 1}/{totalWaves}</div>
        <div className="text-lg font-bold bg-yellow-400/20 px-3 py-1 rounded-lg text-yellow-300">
          🎣 {score}
        </div>
      </div>
      <div className="bg-white/10 text-white text-center py-3 px-4 text-xl font-bold z-10 min-h-14 flex items-center justify-center">
        {question}
      </div>
      {feedback && feedbackTimerRef.current > 0 && (
        <div className={`absolute top-32 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-white font-bold text-lg shadow-lg whitespace-nowrap ${feedback.ok ? 'bg-green-500' : 'bg-red-500'}`}>
          {feedback.text}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none cursor-pointer"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
      />
    </div>
  );
}
