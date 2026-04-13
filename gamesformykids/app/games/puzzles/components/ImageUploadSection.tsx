'use client';

import { RefObject } from 'react';
import PreMadeImagesPicker from './PreMadeImagesPicker';
import UploadDifficultySelector from './UploadDifficultySelector';
import FileUploadButton from './FileUploadButton';

interface ImageUploadSectionProps {
  fileInputRef?: RefObject<HTMLInputElement | null>;
}

export default function ImageUploadSection({ fileInputRef }: ImageUploadSectionProps) {
  return (
    <div className="text-center mb-8">
      <div className="rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 max-w-5xl mx-auto backdrop-blur-sm bg-white/95">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">🎨 בחר תמונה לפאזל</h3>
        <PreMadeImagesPicker />
        <UploadDifficultySelector />
        <FileUploadButton fileInputRef={fileInputRef} />
      </div>
    </div>
  );
}
