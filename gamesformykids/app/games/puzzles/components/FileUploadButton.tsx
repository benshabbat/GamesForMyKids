'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

export default function FileUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload } = usePuzzleContext();

  return (
    <div className="border-t border-gray-200 pt-8">
      <h4 className="text-xl font-semibold text-gray-700 mb-6">📁 או העלה תמונה משלך</h4>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Upload className="w-6 h-6 mr-3" />
        העלה תמונה מהמחשב
      </button>
      <p className="text-sm sm:text-base text-gray-600 mt-4 font-medium">
        📸 בחר תמונה מהמחשב שלך כדי ליצור פאזל מותאם אישית
      </p>
    </div>
  );
}
