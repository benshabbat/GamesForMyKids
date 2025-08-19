import type { ComponentTypes } from "@/lib/types";

/**
 * SimpleGameInstructions - הוראות משחק פשוטות ללא קונטקסט
 */
export default function SimpleGameInstructions({ 
  title,
  instructions,
  showSteps = true,
  variant = "simple"
}: ComponentTypes.SimpleGameInstructionsProps) {
  if (!instructions || instructions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
      <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        {title}
      </h3>
      
      {variant === "detailed" ? (
        <ol className="space-y-4">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex items-start gap-4">
              {showSteps && (
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
              )}
              <span className="text-gray-700 leading-relaxed">{instruction}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="space-y-3">
          {instructions.map((instruction, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {instruction}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
