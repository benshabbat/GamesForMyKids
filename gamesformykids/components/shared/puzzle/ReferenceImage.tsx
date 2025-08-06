'use client';

import Image from 'next/image';
import { usePuzzleContext } from '@/contexts';

interface ReferenceImageProps {
  image?: HTMLImageElement; // Optional - defaults to context image
}

export default function ReferenceImage({ image }: ReferenceImageProps = {}) {
  const { state } = usePuzzleContext();
  
  // Use prop if provided, otherwise use context
  const displayImage = image || state.image;
  
  if (!displayImage) {
    return null;
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-4 lg:p-6">
      <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 lg:mb-4 text-center">🖼️ תמונת עזר</h3>
      <div className="aspect-square relative rounded-xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-blue-400 max-w-48 mx-auto lg:max-w-none shadow-lg">
        <Image
          src={displayImage.src}
          alt="תמונת עזר לפאזל"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 1024px) 192px, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <p className="text-xs lg:text-sm text-gray-600 text-center mt-2 lg:mt-3 font-medium">
        💡 התמונה המלאה לעזרה בבניית הפאזל
      </p>
    </div>
  );
}
