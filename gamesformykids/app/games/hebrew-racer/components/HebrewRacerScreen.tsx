'use client';
import { useEffect, useState, useCallback } from 'react';
import { useHebrewRacerStore } from '../hebrewRacerStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import { TOTAL_CHECKPOINTS } from '../hebrewRacerData';

const OBSTACLES = ['🪨', '🌵', '🏔️', '🚧', '🌊'];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function HebrewRacerScreen() {
  const {
    phase, lives, checkpoint, score,
    currentQuestion, feedback,
    triggerQuestion, answerQuestion, resumeRacing,
  } = useHebrewRacerStore();

  const [choices, setChoices] = useState<string[]>([]);
  const [obstacleEmoji] = useState(() => OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)] ?? '🪨');

  // Shuffle choices when a new question appears
  useEffect(() => {
    if (!currentQuestion) return;
    setChoices(shuffle([currentQuestion.answer, ...currentQuestion.wrongOptions]));
  }, [currentQuestion]);

  // Auto-trigger question 2 seconds after entering racing phase
  useEffect(() => {
    if (phase !== 'racing') return;
    const t = setTimeout(triggerQuestion, 2000);
    return () => clearTimeout(t);
  }, [phase, checkpoint, triggerQuestion]);

  // Auto-resume after jump/crash animation (1.5 s)
  useEffect(() => {
    if (phase !== 'jumping' && phase !== 'crashing') return;
    const t = setTimeout(resumeRacing, 1500);
    return () => clearTimeout(t);
  }, [phase, resumeRacing]);

  const replayAudio = useCallback(() => {
    if (currentQuestion) void speakHebrew(currentQuestion.question);
  }, [currentQuestion]);

  const riderClass =
    phase === 'jumping'  ? '-translate-y-16 transition-transform duration-500' :
    phase === 'crashing' ? 'rotate-45 opacity-60 transition-all duration-300' :
    'transition-transform duration-300';

  const progressPct = Math.round((checkpoint / TOTAL_CHECKPOINTS) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-400 to-sky-200 select-none" dir="rtl">
      {/* HUD */}
      <div className="flex justify-between items-center px-4 py-2 bg-sky-600 bg-opacity-60">
        <div className="flex gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={`text-xl ${i < lives ? '' : 'opacity-20'}`}>❤️</span>
          ))}
        </div>
        <span className="text-white font-black text-sm">{checkpoint}/{TOTAL_CHECKPOINTS} מחסומים</span>
        <span className="text-yellow-200 font-black">⭐ {score}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-sky-700 bg-opacity-30">
        <div
          className="h-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Track scene */}
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 280 }}>
        {/* Background decorations */}
        <div className="absolute top-6 left-8 text-4xl opacity-80">☁️</div>
        <div className="absolute top-12 right-16 text-3xl opacity-60">☁️</div>
        <div className="absolute top-4 left-1/2 text-2xl opacity-50">☁️</div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-600 rounded-t-3xl" />
        <div className="absolute bottom-16 left-0 right-0 h-6 bg-gray-500" />

        {/* Rider */}
        <div
          className={`absolute text-5xl ${riderClass}`}
          style={{ bottom: '4.5rem', left: '22%' }}
        >
          🏍️
        </div>

        {/* Obstacle — shown during racing approach and question */}
        {(phase === 'racing' || phase === 'question') && (
          <div
            className={`absolute text-5xl transition-all duration-1000 ${
              phase === 'racing' ? 'translate-x-0' : ''
            }`}
            style={{
              bottom: '4.5rem',
              right: phase === 'racing' ? '10%' : '30%',
            }}
          >
            {obstacleEmoji}
          </div>
        )}

        {/* Feedback overlay (jump/crash) */}
        {(phase === 'jumping' || phase === 'crashing') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-7xl animate-bounce">
              {phase === 'jumping' ? '✅' : '💥'}
            </div>
          </div>
        )}
      </div>

      {/* Status message below track */}
      <div className="py-3 text-center bg-sky-100 bg-opacity-70">
        {phase === 'racing'   && <p className="text-sky-800 font-bold text-lg">מרוץ! מכשול מתקרב...</p>}
        {phase === 'jumping'  && <p className="text-green-700 font-black text-xl">🎉 {currentQuestion?.answer} — נכון!</p>}
        {phase === 'crashing' && <p className="text-red-600 font-black text-xl">💥 התשובה: {currentQuestion?.answer}</p>}
      </div>

      {/* Q&A modal */}
      {phase === 'question' && currentQuestion && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl" dir="rtl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-1">{currentQuestion.emoji}</div>
              <p className="text-xl font-black text-gray-800 leading-snug">{currentQuestion.question}</p>
              <button
                onClick={replayAudio}
                className="text-sm text-sky-500 hover:text-sky-700 mt-1 underline"
              >
                🔊 שמע שוב
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => answerQuestion(choice)}
                  className="bg-sky-50 hover:bg-sky-100 active:scale-95 border-2 border-sky-200 hover:border-sky-400 text-sky-900 font-bold py-3 px-2 rounded-2xl text-lg transition-all"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
