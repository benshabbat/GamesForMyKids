import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'משחקים חינוכיים - למידה בכיף',
  description: 'משחקים חינוכיים מגוונים לילדים',
};

export default function EducationalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        משחקים חינוכיים 📚
      </h1>
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-8">
          בקרוב יהיו כאן משחקים חינוכיים מדהימים!
        </p>
      </div>
    </div>
  );
}
