import { GameStep } from "@/lib/types";

interface SimpleGameInstructionsProps {
  steps: GameStep[];
  bgClass?: string;
}

/**
 * SimpleGameInstructions - הוראות משחק פשוטות ללא קונטקסט
 */
export default function SimpleGameInstructions({ 
  steps, 
  bgClass = "bg-white" 
}: SimpleGameInstructionsProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className={`${bgClass} rounded-3xl p-8 mb-8 shadow-xl`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">איך משחקים?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
        {steps.map((step, idx) => (
          <div className="text-center" key={idx}>
            <div className="text-4xl mb-3">{step.icon}</div>
            <p>
              <strong>{step.stepNumber || (idx + 1)}. {step.stepText || step.description}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
