interface InstructionStep {
  icon: string;
  title: string;
  description: string;
}

interface GameInstructionsProps {
  steps: InstructionStep[];
  bgClass?: string;
}

export default function GameInstructions({
  steps,
  bgClass,
}: GameInstructionsProps) {
  return (
    <div className={`${bgClass ?? "bg-white"} rounded-3xl p-8 mb-8 shadow-xl`}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">איך משחקים?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
        {steps.map((step, idx) => (
          <div className="text-center" key={idx}>
            <div className="text-4xl mb-3">{step.icon}</div>
            <p>
              <strong>{step.title}</strong>
              <br />
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
