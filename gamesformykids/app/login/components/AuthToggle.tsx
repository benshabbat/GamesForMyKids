import { LOGIN_LABELS } from '../loginConstants';

interface AuthToggleProps {
  isRegistering: boolean;
  onToggle: () => void;
}

export default function AuthToggle({ isRegistering, onToggle }: AuthToggleProps) {
  return (
    <div className="text-center">
      <button
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        {isRegistering ? LOGIN_LABELS.alreadyHaveAccount : LOGIN_LABELS.noAccount}
      </button>
    </div>
  );
}
