'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useChampionshipStore } from '@/lib/stores/championshipStore';

const ROUND_LABELS = ['סיבוב א׳', 'סיבוב ב׳', 'סיבוב ג׳'];
const ROUND_EMOJIS = ['1️⃣', '2️⃣', '3️⃣'];

interface Props {
  categoryId: string;
}

export default function ChampionshipClient({ categoryId }: Props) {
  const router = useRouter();
  const { active, categoryId: storedCat, categoryTitle, gameIds, round, scores, resetChampionship } =
    useChampionshipStore();

  // Redirect home if no championship active for this category
  useEffect(() => {
    if (!active || storedCat !== categoryId) {
      router.replace('/');
    }
  }, [active, storedCat, categoryId, router]);

  if (!active || storedCat !== categoryId || !gameIds) return null;

  const isDone = round === 4;
  const totalScore = scores.reduce<number>((sum, s) => sum + (s ?? 0), 0);

  if (isDone) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-yellow-100 to-amber-200 p-6 text-center"
        dir="rtl"
      >
        <div className="text-8xl mb-4 motion-safe:animate-bounce">🏆</div>
        <h1 className="text-4xl font-black text-amber-800 mb-2">
          אלוף{categoryTitle ? ` ה${categoryTitle}` : ''}!
        </h1>
        <p className="text-2xl font-bold text-amber-700 mb-1">
          ניקוד כולל: <span className="text-amber-900">{totalScore}</span> נקודות
        </p>

        <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-sm">
          {gameIds.map((gid, i) => (
            <div
              key={gid}
              className="bg-white rounded-2xl p-3 shadow flex flex-col items-center gap-1"
            >
              <span className="text-2xl">{ROUND_EMOJIS[i]}</span>
              <span className="text-xs text-gray-500 font-medium">{ROUND_LABELS[i]}</span>
              <span className="text-lg font-black text-purple-700">{scores[i] ?? 0}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              resetChampionship();
              router.push('/');
            }}
            className="w-full py-4 rounded-2xl bg-linear-to-l from-amber-500 to-yellow-400 text-white font-black text-lg hover:opacity-90 active:scale-95 transition-[transform,opacity]"
          >
            🏠 חזור לדף הבית
          </button>
          <button
            onClick={() => router.back()}
            className="w-full py-3 rounded-2xl border-2 border-amber-300 text-amber-700 font-semibold hover:bg-amber-50 active:scale-95 transition-[transform,background-color]"
          >
            שחק שוב אליפות
          </button>
        </div>
      </div>
    );
  }

  // Active championship — show rounds progress + play button
  const currentGameId = round >= 1 && round <= 3 ? gameIds[round - 1] : null;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-yellow-50 to-amber-100 p-6"
      dir="rtl"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🏆</div>
          <h1 className="text-3xl font-black text-amber-800">
            אליפות{categoryTitle ? ` ${categoryTitle}` : ''}
          </h1>
          <p className="text-amber-600 mt-1 text-sm">3 סיבובים — ניקוד מצטבר</p>
        </div>

        {/* Round cards */}
        <div className="space-y-3 mb-8">
          {gameIds.map((gid, i) => {
            const roundNum = i + 1;
            const isCurrentRound = round === roundNum;
            const isCompleted = (round - 1) > i;
            const isPending = round < roundNum;

            return (
              <div
                key={gid}
                className={`
                  rounded-2xl p-4 flex items-center justify-between shadow-sm
                  ${isCurrentRound ? 'bg-amber-400 shadow-amber-200 shadow-md' : ''}
                  ${isCompleted ? 'bg-green-100 border-2 border-green-300' : ''}
                  ${isPending ? 'bg-white opacity-60' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ROUND_EMOJIS[i]}</span>
                  <div>
                    <p className={`font-bold ${isCurrentRound ? 'text-white' : 'text-gray-800'}`}>
                      {ROUND_LABELS[i]}
                    </p>
                    <p className={`text-xs ${isCurrentRound ? 'text-amber-100' : 'text-gray-500'}`}>
                      {gid}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  {isCompleted && (
                    <span className="text-green-700 font-black text-lg">
                      ✓ {scores[i]} נ׳
                    </span>
                  )}
                  {isPending && <span className="text-gray-400 text-xl">⏳</span>}
                  {isCurrentRound && (
                    <span className="text-white font-bold text-sm">עכשיו!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {currentGameId && (
          <Link
            href={`/games/${currentGameId}`}
            className="block w-full py-5 rounded-2xl bg-linear-to-l from-purple-500 to-indigo-600 text-white font-black text-xl text-center hover:opacity-90 active:scale-95 transition-[transform,opacity] shadow-lg"
          >
            ▶ שחק סיבוב {round}
          </Link>
        )}

        <button
          onClick={() => {
            if (window.confirm('לבטל את האליפות?')) {
              resetChampionship();
              router.push('/');
            }
          }}
          className="mt-4 w-full py-3 rounded-xl text-gray-400 text-sm hover:text-red-400 transition-colors"
        >
          ביטול אליפות
        </button>
      </div>
    </div>
  );
}
