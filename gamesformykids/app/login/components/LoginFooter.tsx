import { LOGIN_LABELS } from '../loginConstants';

export default function LoginFooter() {
  return (
    <div className="text-center text-xs text-gray-500">
      <p>{LOGIN_LABELS.footerLine1}</p>
      <p>{LOGIN_LABELS.footerLine2}</p>
    </div>
  );
}
