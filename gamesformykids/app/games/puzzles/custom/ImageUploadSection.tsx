'use client';

import DifficultySelector from '../shared/DifficultySelector';
import PreMadeImagesPicker from './PreMadeImagesPicker';
import FileUploadButton from './FileUploadButton';

export default function ImageUploadSection() {
  return (
    <div className="text-center mb-8">
      <div className="rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 max-w-5xl mx-auto backdrop-blur-sm bg-white/95">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">🎨 בחר תמונה לפאזל</h3>
        <PreMadeImagesPicker />
        <DifficultySelector variant="select" />
        <FileUploadButton />
      </div>
    </div>
  );
}
