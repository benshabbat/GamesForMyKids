"use client";

import { useCallback } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useUIStore } from "@/lib/stores/uiStore";

export function useUserProfile() {
  const user     = useAuthStore((s) => s.user);
  const loading  = useAuthStore((s) => s.loading);
  const isGuest  = useAuthStore((s) => s.isGuest);
  const signOut  = useAuthStore((s) => s.signOut);

  const isMenuOpen  = useUIStore((s) => s.isUserMenuOpen);
  const closeMenu   = useUIStore((s) => s.closeUserMenu);
  const toggleMenu  = useUIStore((s) => s.toggleUserMenu);

  const handleSignOut = useCallback(async () => {
    await signOut();
    closeMenu();
  }, [signOut, closeMenu]);

  return { user, loading, isGuest, isMenuOpen, closeMenu, toggleMenu, handleSignOut };
}
