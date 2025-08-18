import GenericBox from "./GenericBox";

interface TipsBoxProps {
  tip?: string;
  description?: string;
}

/**
 * 🎯 TipsBox עם props אופציונליים
 */
export default function TipsBox({ 
  tip = "💡 טיפ: הקשב בקפידה!",
  description = "לחץ על הסמל למעלה כדי לשמוע שוב"
}: TipsBoxProps = {}) {
  
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