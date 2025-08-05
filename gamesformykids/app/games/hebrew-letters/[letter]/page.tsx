import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HebrewLetterPractice from '@/components/game/hebrew-letters/HebrewLetterPractice';
import { hebrewLetters } from '@/lib/constants/gameData/hebrewLetters';

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
    description: `דף תרגול לכתיבת האות ${letterData.letter} בעברית`,
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

  return <HebrewLetterPractice letterData={letterData} />;
}
