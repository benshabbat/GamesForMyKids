import Form from 'next/form';
import { LOGIN_LABELS } from '../loginConstants';

interface EmailAuthFormProps {
  isRegistering: boolean;
  email:        string;
  password:     string;
  name:         string;
  error:        string;
  isSubmitting: boolean;
  setEmail:    (v: string) => void;
  setPassword: (v: string) => void;
  setName:     (v: string) => void;
  action:      (formData: FormData) => void;
}

export default function EmailAuthForm({
  isRegistering,
  email, password, name, error, isSubmitting,
  setEmail, setPassword, setName,
  action,
}: EmailAuthFormProps) {
  return (
    <Form action={action} className="space-y-4">
      {isRegistering && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {LOGIN_LABELS.fieldName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={LOGIN_LABELS.fieldNamePlaceholder}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          {LOGIN_LABELS.fieldEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={LOGIN_LABELS.fieldEmailPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          {LOGIN_LABELS.fieldPassword}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={LOGIN_LABELS.fieldPasswordPlaceholder}
          minLength={6}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting
          ? LOGIN_LABELS.loadingBtn
          : isRegistering
            ? LOGIN_LABELS.createAccount
            : LOGIN_LABELS.signInBtn}
      </button>
    </Form>
  );
}
