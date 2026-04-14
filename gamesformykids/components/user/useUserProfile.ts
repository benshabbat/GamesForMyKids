"use client";

'use client';

import { useCallback } from "react";
import { useAuth } from "@/hooks/shared/auth/useAuth";
import type { User } from "@supabase/supabase-js";
import { useUIStore } from "@/lib/stores/uiStore";

export interface UseUserProfileReturn {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  handleSignOut: () => void;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user, signOut, loading, isGuest } = useAuth();
  const isMenuOpen = useUIStore((s) => s.isUserMenuOpen);
  const openMenu = useUIStore((s) => s.openUserMenu);
  const closeMenu = useUIStore((s) => s.closeUserMenu);
  const toggleMenu = useUIStore((s) => s.toggleUserMenu);

  const handleSignOut = useCallback(() => {
    signOut();
    closeMenu();
  }, [signOut, closeMenu]);

  return { user, loading, isGuest, isMenuOpen, openMenu, closeMenu, toggleMenu, handleSignOut };
}
