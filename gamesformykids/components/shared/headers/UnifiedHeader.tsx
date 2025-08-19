import type { ComponentTypes } from "@/lib/types";

/**
 * UnifiedHeader - קומפוננט Header אחוד
 */
export default function UnifiedHeader({
  title,
  showBackButton = false,
  showScore = false,
  score,
  level,
  onBack,
  customActions
}: ComponentTypes.UnifiedHeaderProps) {
  return (
    <div className="mb-8">
      {title && (
        <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4">
          {title}
        </h1>
      )}
      {showScore && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold">
            נקודות: {score || 0}
          </div>
          {level && (
            <div className="text-lg font-semibold text-purple-600">
              שלב: {level}
            </div>
          )}
        </div>
      )}
      {showBackButton && onBack && (
        <button 
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          ← חזור
        </button>
      )}
      {customActions}
    </div>
  );
}
