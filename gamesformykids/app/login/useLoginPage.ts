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

  // useActionState + <Form action={loginAction}> replaces manual isSubmitting + error useState.
  // FormData values are read from the named inputs; isRegistering read from closure.
  const [error, loginAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData): Promise<string | null> => {
      const emailVal    = formData.get('email')    as string;
      const passwordVal = formData.get('password') as string;
      const nameVal     = (formData.get('name') as string) ?? '';
      try {
        const result = isRegistering
          ? await signUpWithEmail(emailVal, passwordVal, nameVal)
          : await signInWithEmail(emailVal, passwordVal);
        return result.error ?? null;
      } catch {
        return LOGIN_LABELS.genericError;
      }
    },
    null
  );

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
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
    loginAction,
    toggleMode,
    continueAsGuest,
    signInWithGoogle,
  };

  return { vm, isLoading: loading, isAuthenticated: !!user };
}
