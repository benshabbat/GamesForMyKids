'use client';

import { RefObject } from 'react';
import { Upload } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadSectionProps {
  difficulty: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPreMadeImageSelect: (imageSrc: string) => void;
  onDifficultyChange: (difficulty: number) => void;
}

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

export default function ImageUploadSection({ 
  difficulty, 
  fileInputRef, 
  onImageUpload, 
  onPreMadeImageSelect, 
  onDifficultyChange 
}: ImageUploadSectionProps) {
  return (
    <div className="text-center mb-8">
      <div className="rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 max-w-5xl mx-auto backdrop-blur-sm bg-white/95">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">🎨 בחר תמונה לפאזל</h3>
        
        {/* Pre-made images section */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-700 mb-6">✨ תמונות מוכנות</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {previewImages.map((img) => (
              <div 
                key={img.src}
                onClick={() => onPreMadeImageSelect(img.src)}
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
                  {/* Difficulty indicator */}
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

        {/* Current difficulty display */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-blue-800 font-bold text-lg">🎯 רמת קושי נוכחית:</span>
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(Number(e.target.value))}
              className="px-4 py-3 border-2 border-blue-300 rounded-xl bg-white text-blue-800 font-semibold text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
            >
              <option value={4}>🟢 קל (2x2) - 4 חלקים</option>
              <option value={9}>🟡 בינוני (3x3) - 9 חלקים</option>
              <option value={16}>🟠 קשה (4x4) - 16 חלקים</option>
              <option value={25}>🔴 מומחה (5x5) - 25 חלקים</option>
            </select>
          </div>
          <p className="text-center text-sm sm:text-base text-blue-600 mt-3 font-medium">
            🧩 הפאזל ייווצר עם {difficulty} חלקים ({Math.sqrt(difficulty)}×{Math.sqrt(difficulty)})
          </p>
        </div>

        {/* Upload custom image section */}
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-xl font-semibold text-gray-700 mb-6">📁 או העלה תמונה משלך</h4>
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Upload className="w-6 h-6 mr-3" />
            העלה תמונה מהמחשב
          </button>
          <p className="text-sm sm:text-base text-gray-600 mt-4 font-medium">
            📸 בחר תמונה מהמחשב שלך כדי ליצור פאזל מותאם אישית
          </p>
        </div>
      </div>
    </div>
  );
}
