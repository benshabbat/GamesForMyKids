import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HebrewLettersProvider } from '@/contexts';
import HebrewLetterPractice from '../components/HebrewLetterPractice';
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
      images: [
        {
          url: `/images/letters/${letterData.name}-og.png`,
          width: 1200,
          height: 630,
          alt: `תרגול האות ${letterData.letter}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `תרגול האות ${letterData.letter} - ${letterData.name}`,
      description: `דף תרגול אינטראקטיבי לכתיבת האות ${letterData.letter} בעברית`,
      images: [`/images/letters/${letterData.name}-twitter.png`],
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
    <HebrewLettersProvider>
      <HebrewLetterPractice letterData={letterData} />
    </HebrewLettersProvider>
  );
}
