"use client";

import Link from 'next/link';
import { Users, Award } from 'lucide-react';
import { useFeaturedGameStore } from '@/lib/stores/featuredGameStore';

export default function AgeGroupCard({ ageKey }: { ageKey: string }) {
  const ageGroup = useFeaturedGameStore((s) => s.ageGroups[ageKey]);

  if (!ageGroup) return null;
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header — horizontal on mobile, centered on desktop */}
      <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center mb-3 md:mb-4">
        <div className="text-4xl sm:mb-1">{ageGroup.icon}</div>
        <div>
          <h3 className="text-base md:text-xl font-bold text-gray-800 mb-0.5">{ageGroup.title}</h3>
          <p className="text-xs text-gray-600 sm:hidden md:block">{ageGroup.description}</p>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3">
        {ageGroup.recommendedGames.length > 0 ? (
          ageGroup.recommendedGames.map((game) => (
            <Link key={game.id} href={game.href} prefetch={false}>
              <div className="flex items-center p-2.5 md:p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-100">
                <div className="flex-shrink-0 ml-3">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-1.5 rounded-lg">
                    <game.icon className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm truncate">{game.title}</h4>
                  <p className="text-xs text-gray-500 truncate sm:hidden md:block">{game.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <div className="text-2xl mb-2">🔄</div>
            <p className="text-sm">משחקים בהכנה...</p>
          </div>
        )}
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 ml-1" />
            <span>מותאם לגיל</span>
          </div>
          <div className="flex items-center">
            <Award className="w-3.5 h-3.5 ml-1" />
            <span>מומלץ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
