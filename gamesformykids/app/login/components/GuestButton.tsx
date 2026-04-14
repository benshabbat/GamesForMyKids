import { LOGIN_LABELS } from '../loginConstants';

interface GuestButtonProps {
  onContinueAsGuest: () => void;
}

export default function GuestButton({ onContinueAsGuest }: GuestButtonProps) {
  return (
    <>
      <button
        onClick={onContinueAsGuest}
        className="w-full flex items-center justify-center px-4 py-4 rounded-lg shadow-sm bg-green-600 text-white hover:bg-green-700 transition-colors text-lg font-semibold"
      >
        <span className="text-2xl mr-3">{LOGIN_LABELS.guestEmoji}</span>
        {LOGIN_LABELS.guestPlay}
      </button>

      <div className="text-center text-sm text-gray-500 my-4">
        {LOGIN_LABELS.orSaveProgress}
      </div>
    </>
  );
}
