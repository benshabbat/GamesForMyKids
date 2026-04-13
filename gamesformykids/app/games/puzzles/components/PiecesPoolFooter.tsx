interface PiecesPoolFooterProps {
  availableCount: number;
  placedOnGrid: number;
  total: number;
}

export default function PiecesPoolFooter({ availableCount, placedOnGrid, total }: PiecesPoolFooterProps) {
  return (
    <div className="mt-4 text-center text-sm text-gray-600">
      <p>נותרו {availableCount} חלקים להנחה</p>
      <p className="text-xs text-gray-400 mt-1">
        ({placedOnGrid} על הלוח, {availableCount} כאן, מתוך {total} סה&quot;כ)
      </p>
      <p className="text-xs text-gray-500 mt-1">
        💡 חלקים שלא במקום הנכון נשארים על הלוח וניתנים לגרירה
      </p>
      <p className="text-xs text-blue-500 mt-1">
        📱 על מכשירים ניידים: לחץ והחזק לגרירה
      </p>
    </div>
  );
}
