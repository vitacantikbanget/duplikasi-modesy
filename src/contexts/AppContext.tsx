/**
 * ============================================================================
 * AppContext: Komposisi & Penggabung Context Global (Context Orchestrator)
 * ============================================================================
 * Menggunakan pola "Context Composition Pattern" (Pola Komposisi Context):
 * Alih-alih membuat satu Context monolitik raksasa yang menyebabkan re-render
 * yang tidak perlu di seluruh aplikasi, kita memecahnya menjadi modul-modul domain terisolasi:
 * 1. `AuthProvider`: Autentikasi dan peran (roles).
 * 2. `LocalizationProvider`: Bahasa, mata uang, dan konversi kurs.
 * 3. `CartProvider`: Keranjang belanja dan item transaksi.
 * 4. `WishlistProvider`: Produk favorit.
 * 5. `ModalProvider`: Dialog interaktif Quick View.
 *
 * Komponen `AppProvider` menggabungkan semuanya secara hierarkis di root layout.
 * Hook `useAppContext()` menggabungkan seluruh hook di atas untuk kompatibilitas
 * penuh ke belakang (backward compatibility). Komponen baru dapat mengimpor hook
 * spesifik (seperti `useCart()` atau `useAuth()`) untuk optimasi performa rendering.
 */

"use client";

import React, { ReactNode } from "react";

// Ekspor kembali tipe data penting
export type { UserRole, UserProfile } from "@/types/auth";
export type { CartItem } from "@/types/cart";
export type { CurrencyCode, LanguageCode, Currency, Language } from "@/types/localization";

// Ekspor kembali konstanta penting
export { currencies } from "@/constants/currencies";
export { languages } from "@/constants/languages";
export { countries, countryStates } from "@/constants/countries";
export { ROLE_PROFILES } from "@/constants/auth";
export { translations } from "@/constants/translations";

// Impor sub-provider dan custom hook domain
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

/**
 * Tipe gabungan yang mencakup semua nilai context
 */
export type AppContextType = AuthContextType &
  CartContextType &
  WishlistContextType &
  LocalizationContextType &
  ModalContextType;

/**
 * Provider Induk yang membungkus aplikasi dengan seluruh sub-provider
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
 * Hook universal gabungan untuk kemudahan akses cepat seluruh state aplikasi
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
