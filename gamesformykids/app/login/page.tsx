'use client'

import { useLoginPage } from './useLoginPage'
import LoginHeader        from './components/LoginHeader'
import GuestButton        from './components/GuestButton'
import EmailAuthForm      from './components/EmailAuthForm'
import AuthToggle         from './components/AuthToggle'
import GoogleSignInButton from './components/GoogleSignInButton'
import LoginFooter        from './components/LoginFooter'

export default function LoginPage() {
  const { vm, isLoading, isAuthenticated } = useLoginPage()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">טוען...</div>
      </div>
    )
  }

  if (isAuthenticated) return null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <LoginHeader isRegistering={vm.isRegistering} />

        <div className="space-y-6">
          <GuestButton onContinueAsGuest={vm.continueAsGuest} />

          <EmailAuthForm
            isRegistering={vm.isRegistering}
            email={vm.email}
            password={vm.password}
            name={vm.name}
            error={vm.error}
            isSubmitting={vm.isSubmitting}
            setEmail={vm.setEmail}
            setPassword={vm.setPassword}
            setName={vm.setName}
            onSubmit={vm.handleEmailAuth}
          />

          <AuthToggle isRegistering={vm.isRegistering} onToggle={vm.toggleMode} />

          <GoogleSignInButton onSignIn={vm.signInWithGoogle} />
        </div>

        <LoginFooter />
      </div>
    </div>
  )
}
