'use client';

interface Props {
  text: string;
  url?: string;
  className?: string;
}

export default function WhatsAppShareButton({ text, url, className }: Props) {
  function handleClick() {
    const shareUrl = url ?? (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?utm_source=whatsapp&utm_medium=share&utm_campaign=game_result`
      : '');
    const fullText = `${text}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <button
      onClick={handleClick}
      className={className ?? 'mt-3 w-full py-2.5 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] active:scale-95 transition-[transform,background-color] flex items-center justify-center gap-2'}
    >
      <span>📲</span>
      <span>שתף בוואצאפ</span>
    </button>
  );
}
