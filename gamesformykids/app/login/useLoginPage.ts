import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/shared/auth/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { LOGIN_LABELS, type LoginPageViewModel } from './loginConstants';

export function useLoginPage(): { vm: LoginPageViewModel; isLoading: boolean; isAuthenticated: boolean } {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, continueAsGuest } = useAuth();
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [name,          setName]          = useState('');

  useEffect(() => {
    if (user && !loading) router.push(ROUTES.HOME);
  }, [user, loading, router]);

  // useActionState replaces manual isSubmitting + error useState.
  // The action reads from closure (controlled inputs) — no FormData needed.
  // Payload 'reset' clears the error when toggling between login/register.
  const [error, loginAction, isPending] = useActionState(
    async (_prev: string | null, payload: 'reset' | undefined): Promise<string | null> => {
      if (payload === 'reset') return null;
      try {
        const result = isRegistering
          ? await signUpWithEmail(email, password, name)
          : await signInWithEmail(email, password);
        return result.error ?? null;
      } catch {
        return LOGIN_LABELS.genericError;
      }
    },
    null
  );

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    loginAction(undefined);
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    loginAction('reset');
  };

  const vm: LoginPageViewModel = {
    isRegistering,
    email,
    password,
    name,
    error: error ?? '',
    isSubmitting: isPending,
    setEmail,
    setPassword,
    setName,
    handleEmailAuth,
    toggleMode,
    continueAsGuest,
    signInWithGoogle,
  };

  return { vm, isLoading: loading, isAuthenticated: !!user };
}
