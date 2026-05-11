import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HebrewLetterPractice from '../components/practice/HebrewLetterPractice';
import { hebrewLetters } from '../constants/hebrewLetters';

interface Props {
  params: Promise<{ letter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const letterData = hebrewLetters.find(l => l.name === letter);
  
  if (!letterData) {
    return {
      title: 'אות לא נמצאה',
    };
  }

  return {
    title: `תרגול האות ${letterData.letter} - ${letterData.name}`,
    description: `דף תרגול אינטראקטיבי לכתיבת האות ${letterData.letter} בעברית. למדו וכתבו את האות ${letterData.name} עם הדרכה שלב אחר שלב.`,
    keywords: `אות ${letterData.letter}, ${letterData.name}, אותיות עבריות, כתיבה עברית, תרגול כתיבה, לימוד עברית לילדים`,
    openGraph: {
      title: `תרגול האות ${letterData.letter} - ${letterData.name}`,
      description: `דף תרגול אינטראקטיבי לכתיבת האות ${letterData.letter} בעברית`,
      type: 'article',
      url: `https://gamesformykids.vercel.app/games/hebrew-letters/${letter}`,
    },
    twitter: {
      card: 'summary',
      title: `תרגול האות ${letterData.letter} - ${letterData.name}`,
      description: `דף תרגול אינטראקטיבי לכתיבת האות ${letterData.letter} בעברית`,
    },
    alternates: {
      canonical: `/games/hebrew-letters/${letter}`,
    },
  };
}

export async function generateStaticParams() {
  return hebrewLetters.map((letter) => ({
    letter: letter.name,
  }));
}

export default async function LetterPracticePage({ params }: Props) {
  const { letter } = await params;
  const letterData = hebrewLetters.find(l => l.name === letter);
  
  if (!letterData) {
    notFound();
  }

  return (
    <HebrewLetterPractice letterData={letterData} />
  );
}
