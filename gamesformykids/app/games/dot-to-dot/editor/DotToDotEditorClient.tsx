'use client';
import { Upload } from 'lucide-react';
import { buildPictureCode } from './buildPictureCode';
import EditorControls from './components/EditorControls';
import ExportPanel from './components/ExportPanel';
import MetadataForm from './components/MetadataForm';
import PointCanvas from './components/PointCanvas';
import { useDotToDotEditor } from './useDotToDotEditor';

export default function DotToDotEditorClient() {
  const {
    inputRef,
    imageDataUrl,
    points,
    setPoints,
    closed,
    setClosed,
    id,
    setId,
    title,
    setTitle,
    emoji,
    setEmoji,
    theme,
    setTheme,
    copied,
    dotCount,
    isDetecting,
    handleFileChange,
    handleImageClick,
    handleAutoDetect,
    handleDotCountChange,
    handleCopy,
  } = useDotToDotEditor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 flex flex-col items-center gap-6" dir="rtl">
      <h1 className="text-3xl font-black text-white">עורך נקודות — נקודה לנקודה</h1>
      <p className="text-indigo-200 text-sm max-w-md text-center">
        העלו תמונה, לחצו עליה בסדר כדי לסמן נקודות ממוספרות, ואז העתיקו את הקוד המיוצא לתוך <code>pictures.ts</code>.
      </p>

      <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 shadow-lg transition-transform active:scale-95"
      >
        <Upload className="w-5 h-5" />
        העלה תמונה
      </button>

      {imageDataUrl && (
        <>
          <PointCanvas imageDataUrl={imageDataUrl} points={points} closed={closed} onImageClick={handleImageClick} />

          <EditorControls
            dotCount={dotCount}
            isDetecting={isDetecting}
            pointCount={points.length}
            closed={closed}
            imageDataUrl={imageDataUrl}
            id={id}
            onAutoDetect={handleAutoDetect}
            onDotCountChange={handleDotCountChange}
            onUndo={() => setPoints((prev) => prev.slice(0, -1))}
            onClear={() => setPoints([])}
            onClosedChange={setClosed}
          />

          <MetadataForm
            id={id}
            title={title}
            emoji={emoji}
            theme={theme}
            onIdChange={setId}
            onTitleChange={setTitle}
            onEmojiChange={setEmoji}
            onThemeChange={setTheme}
          />

          <ExportPanel
            code={buildPictureCode({ id, title, emoji, theme, closed, points })}
            copied={copied}
            disabled={points.length === 0}
            onCopy={handleCopy}
          />
        </>
      )}
    </div>
  );
}
