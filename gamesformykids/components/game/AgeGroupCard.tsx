"use client";

import Link from 'next/link';
import { Users, Award } from 'lucide-react';
import { ComponentTypes } from "@/lib/types";

export default function AgeGroupCard({ ageGroup }: ComponentTypes.AgeGroupCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="text-center mb-3 md:mb-4">
        <div className="text-3xl md:text-4xl mb-1 md:mb-2">{ageGroup.icon}</div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{ageGroup.title}</h3>
        <p className="text-xs md:text-sm text-gray-600 hidden sm:block">{ageGroup.description}</p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {ageGroup.recommendedGames.length > 0 ? (
          ageGroup.recommendedGames.map((game) => (
            <Link key={game.id} href={game.href}>
              <div className="flex items-center p-2 md:p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md border border-gray-100">
                <div className="flex-shrink-0 ml-2 md:ml-3">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-1 md:p-1.5 rounded-lg">
                    <game.icon className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-xs md:text-sm truncate">{game.title}</h4>
                  <p className="text-xs text-gray-600 truncate hidden sm:block">{game.description}</p>
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
            <Users className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            <span>מותאם לגיל</span>
          </div>
          <div className="flex items-center">
            <Award className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            <span>מומלץ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
