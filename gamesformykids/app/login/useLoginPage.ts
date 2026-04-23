import { useState, useEffect } from 'react';
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
  const [error,         setError]         = useState('');
  const [isSubmitting,  setIsSubmitting]  = useState(false);

  useEffect(() => {
    if (user && !loading) router.push(ROUTES.HOME);
  }, [user, loading, router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const result = isRegistering
        ? await signUpWithEmail(email, password, name)
        : await signInWithEmail(email, password);
      if (result.error) setError(result.error);
    } catch {
      setError(LOGIN_LABELS.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    setError('');
  };

  const vm: LoginPageViewModel = {
    isRegistering,
    email,
    password,
    name,
    error,
    isSubmitting,
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
