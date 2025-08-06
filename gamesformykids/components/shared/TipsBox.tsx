import GenericBox from "./GenericBox";

interface TipsBoxProps {
  tip: string;
  description: string;
}

export default function TipsBox({ tip, description }: TipsBoxProps) {
  return (
    <div className="text-center mt-8">
      <GenericBox
        title={tip}
        variant="tips"
        size="medium"
      >
        <p className="text-gray-600">
          {description}
        </p>
      </GenericBox>
    </div>
  );
}