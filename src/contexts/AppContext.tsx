"use client";

import React, { ReactNode } from "react";

// Re-export types
export type { UserRole, UserProfile } from "@/types/auth";
export type { CartItem } from "@/types/cart";
export type { CurrencyCode, LanguageCode, Currency, Language } from "@/types/localization";

// Re-export constants
export { currencies } from "@/constants/currencies";
export { languages } from "@/constants/languages";
export { countries, countryStates } from "@/constants/countries";
export { ROLE_PROFILES } from "@/constants/auth";
export { translations } from "@/constants/translations";

// Sub-providers and hooks
import { AuthProvider, useAuth, AuthContextType } from "./AuthContext";
import { CartProvider, useCart, CartContextType } from "./CartContext";
import { WishlistProvider, useWishlist, WishlistContextType } from "./WishlistContext";
import { LocalizationProvider, useLocalization, LocalizationContextType } from "./LocalizationContext";
import { ModalProvider, useModal, ModalContextType } from "./ModalContext";

export { useAuth, AuthProvider } from "./AuthContext";
export { useCart, CartProvider } from "./CartContext";
export { useWishlist, WishlistProvider } from "./WishlistContext";
export { useLocalization, LocalizationProvider } from "./LocalizationContext";
export { useModal, ModalProvider } from "./ModalContext";

export type AppContextType = AuthContextType &
  CartContextType &
  WishlistContextType &
  LocalizationContextType &
  ModalContextType;

/**
 * AppProvider composes the isolated domain contexts together.
 * Modifying cart logic now only touches CartContext,
 * modifying auth only touches AuthContext, etc.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <CartProvider>
          <WishlistProvider>
            <ModalProvider>{children}</ModalProvider>
          </WishlistProvider>
        </CartProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

/**
 * useAppContext combines all modular context hooks for complete backward compatibility.
 * Existing components continue to work without modification, while new components
 * can import isolated hooks (e.g. useCart(), useAuth()) for optimal rendering isolation.
 */
export function useAppContext(): AppContextType {
  const auth = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const localization = useLocalization();
  const modal = useModal();

  return {
    ...auth,
    ...cart,
    ...wishlist,
    ...localization,
    ...modal,
  };
}
