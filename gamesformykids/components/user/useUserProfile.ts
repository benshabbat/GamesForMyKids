"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@supabase/supabase-js";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  const handleSignOut = useCallback(() => {
    signOut();
    setIsMenuOpen(false);
  }, [signOut]);

  return { user, loading, isGuest, isMenuOpen, openMenu, closeMenu, toggleMenu, handleSignOut };
}
