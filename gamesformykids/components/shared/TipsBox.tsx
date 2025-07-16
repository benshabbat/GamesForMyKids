interface TipsBoxProps {
  tip: string;
  description: string;
}

export default function TipsBox({ tip, description }: TipsBoxProps) {
  return (
    <div className="text-center mt-8">
      <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          {tip}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}