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
    <header className="mb-8" dir="rtl">
      {title && (
        <h1 className="text-5xl md:text-7xl font-bold text-purple-800 mb-4 text-center">
          {title}
        </h1>
      )}

      {(showScore || showBackButton || customActions) && (
        <div className="flex items-center justify-between mb-4 gap-4">
          {showBackButton && onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="חזור לעמוד הקודם"
              className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 active:scale-95 transition-all duration-200 font-bold text-sm md:text-base shadow-md"
            >
              → חזור
            </button>
          )}

          {showScore && (
            <div className="flex items-center gap-6 text-lg font-bold" role="status" aria-live="polite">
              <span>נקודות: <span className="text-purple-700">{score ?? 0}</span></span>
              {level !== undefined && (
                <span className="text-purple-600">שלב: <span className="text-purple-800">{level}</span></span>
              )}
            </div>
          )}

          {customActions && (
            <div className="flex items-center gap-2">{customActions}</div>
          )}
        </div>
      )}
    </header>
  );
}

