'use client';

import Image from 'next/image';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

const previewImages = [
  { src: '/images/Fox with Yo-Yo.png', name: 'שועל עם יו-יו' },
  { src: '/images/Cool Fox Character.png', name: 'שועל מגניב' },
  { src: '/images/Cute Animals with Rainbow.png', name: 'חיות עם קשת' },
  { src: '/images/Happy Forest Friends.png', name: 'חברי היער' },
  { src: '/images/Playing Outdoors.png', name: 'משחק בחוץ' },
  { src: '/images/Princess with Deer.png', name: 'נסיכה וצבי' },
  { src: '/images/Forest Party.png', name: 'מסיבת יער' },
  { src: '/images/Magical Mushroom Land.png', name: 'ארץ הפטריות' },
  { src: '/images/Princess in Magical Forest.png', name: 'נסיכה ביער קסום' },
  { src: '/images/Anna and Elsa with a Unicorn.png', name: 'אנה ואלזה עם חד קרן' },
];

export default function PreMadeImagesPicker() {
  const { difficulty, handlePreMadeImageSelect } = usePuzzleStore();

  return (
    <div className="mb-8">
      <h4 className="text-xl font-semibold text-gray-700 mb-6">✨ תמונות מוכנות</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {previewImages.map((img, index) => (
          <div
            key={index}
            onClick={() => handlePreMadeImageSelect(img.src)}
            className="group cursor-pointer border-3 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
          >
            <div className="aspect-square relative">
              <Image
                src={img.src}
                alt={img.name}
                fill
                className="object-cover group-hover:brightness-110 transition-all duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm px-3 py-2 rounded-full font-bold shadow-lg">
                {difficulty} חלקים
              </div>
            </div>
            <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-white to-gray-50">
              <p className="text-sm sm:text-base text-gray-700 font-semibold mb-1">{img.name}</p>
              <p className="text-xs sm:text-sm text-blue-600 font-medium">
                פאזל {Math.sqrt(difficulty)}×{Math.sqrt(difficulty)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
