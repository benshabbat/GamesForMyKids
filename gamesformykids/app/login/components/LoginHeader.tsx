import { LOGIN_LABELS } from '../loginConstants';

interface LoginHeaderProps {
  isRegistering: boolean;
}

export default function LoginHeader({ isRegistering }: LoginHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900">{LOGIN_LABELS.welcome}</h1>
      <p className="mt-2 text-gray-600">
        {isRegistering ? LOGIN_LABELS.registerSubtitle : LOGIN_LABELS.signInSubtitle}
      </p>
    </div>
  );
}
